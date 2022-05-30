console.log(1);

let editButton = document.querySelector('.profile__edit-button');

let popup = document.querySelector('.popup');

editButton.addEventListener('click', function () {
  popup.classList.add('popup__opened')
}
)

let closeButton = document.querySelector('.popup__close-button')

closeButton.addEventListener('click', function () {
  popup.classList.remove('popup__opened')
})

// Находим форму в DOM
let formElement = document.querySelector('.popup__form'); // Воспользуйтесь методом querySelector()

// Находим Имя и О себе в профиле
let name = document.querySelector('.profile__name');
let about = document.querySelector('.profile__about');

// Вытаскиваем такст контента
let nameInForm = name.textContent;
let aboutInForm = about.textContent;

// Находим поля формы
let nameForm = formElement.querySelector('.form__name');
let aboutForm = formElement.querySelector('.form__about');

// Записываем текстовые значения установленного Имени и О себе в значения полей формы
nameForm.value = nameInForm;
aboutForm.value = aboutInForm;