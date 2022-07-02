const formElement = document.querySelector('.popup__form');
const inputElement = formElement.querySelector('.popup__form-item')
const formError = formElement.querySelector(`.${inputElement.id}-input-error`);


//Показать span и красное подчеркивание
const showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-input-error`);
    inputElement.classList.add('popup__form-item_type_error');
    errorElement.textContent = errorMessage;
    errorElement.classList.add('popup__form-item-error_active');
};

//Убрать span и красное подчеркивание
const hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-input-error`);
    inputElement.classList.remove('popup__form-item_type_error');
    errorElement.classList.remove('popup__form-item-error_active');
    errorElement.textContent = ' ';
};


//Проверить валидность поля

const isValid = (formElement, inputElement) => {
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
        hideInputError(formElement, inputElement);
    }

};




//Поставить обработчики на все элементы полей ввода


//Изменить состояние кнопки

const toggleButtonState = (inputList, buttonElement) => {
    if (hasInvalidInput(inputList) === true) {
        buttonElement.classList.add('popup__form-button_inactive');
    } else {
        buttonElement.classList.remove('popup__form-button_inactive');
    }
}



//Проверить, есть ли в форме хотя бы одно невалидное поле

const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid
    })
}


const setEventListeners = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll('.popup__form-item'));
    const buttonElement = formElement.querySelector('.popup__form-button');
    toggleButtonState(inputList, buttonElement);
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            isValid(formElement, inputElement);
            toggleButtonState(inputList, buttonElement);
        });
    })
}


// Поставить обработчики на все формы
const enableValidation = () => {
    const formList = Array.from(document.querySelectorAll('.popup__form'));
    formList.forEach((formElement) => {
        formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
        setEventListeners(formElement);

    })
}

enableValidation();