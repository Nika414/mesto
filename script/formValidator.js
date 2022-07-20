export { config, FormValidator }

const config = {
    formSelector: '.popup__form',
    inputSelector: '.popup__form-item',
    submitButtonSelector: '.popup__form-button',
    inactiveButtonClass: 'popup__form-button_inactive',
    inputErrorClass: 'popup__form-item_type_error',
    errorClass: 'popup__form-item-error_active'
}

class FormValidator {
    constructor(config, formElement) {
        this._config = config;
        this._formElement = formElement;
    }

    //Показать span и красное подчеркивание
    _showInputError = (inputElement, errorMessage) => {
        const errorElement = this._formElement.querySelector(`.${inputElement.id}-input-error`);
        inputElement.classList.add(this._config.inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this._config.errorClass);
    };

    //Убрать span и красное подчеркивание
    _hideInputError = (inputElement) => {
        const errorElement = this._formElement.querySelector(`.${inputElement.id}-input-error`);
        inputElement.classList.remove(this._config.inputErrorClass);
        errorElement.classList.remove(this._config.errorClass);
        errorElement.textContent = ' ';
    };
    //Проверить валидность поля

    _isValid = (inputElement) => {
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement, inputElement.validationMessage);
        } else {
            this._hideInputError(inputElement);
        }
    }

    //Изменить состояние кнопки

    _toggleButtonState = (inputList, buttonElement) => {
        if (this._hasInvalidInput(inputList)) {
            buttonElement.classList.add(this._config.inactiveButtonClass);
            buttonElement.setAttribute('disabled', '');
        } else {
            buttonElement.classList.remove(this._config.inactiveButtonClass);
            buttonElement.removeAttribute('disabled', '');
        }
    }
    //Проверить, есть ли в форме хотя бы одно невалидное поле

    _hasInvalidInput = (inputList) => {
        return inputList.some((inputElement) => {
            return !inputElement.validity.valid
        })
    }

    //Поставить обработчики на все инпуты

    _setEventListeners = () => {
        const inputList = Array.from(this._formElement.querySelectorAll(this._config.inputSelector));
        const buttonElement = this._formElement.querySelector(this._config.submitButtonSelector);
        this._toggleButtonState(inputList, buttonElement);
        inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._isValid(inputElement);
                this._toggleButtonState(inputList, buttonElement);
            });
        })
    }
    //Поставить обработчики на все формы
    enableValidation = () => {
        const formList = Array.from(document.querySelectorAll(this._config.formSelector));
        formList.forEach(() => {
            this._setEventListeners();
        })
    }
}
