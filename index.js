console.log(1);

let editButton = document.querySelector('.profile__edit-button');

let popup = document.querySelector('.popup');
let formElement = document.querySelector('.popup__form');
let name = document.querySelector('.profile__name');
let about = document.querySelector('.profile__about');
let nameInput = formElement.querySelector('.form__name');
let aboutInput = formElement.querySelector('.form__about');

function openPopup() {
  popup.classList.add('popup__opened');
  nameInput.value = name.textContent;
  aboutInput.value = about.textContent;
}

editButton.addEventListener('click', openPopup);

let closeButton = document.querySelector('.popup__close-button');

closeButton.addEventListener('click', function () {
  popup.classList.remove('popup__opened')
});

function formSubmitHandler(evt) {
  evt.preventDefault();
  name.textContent = nameInput.value;
  about.textContent = aboutInput.value;
}

formElement.addEventListener('submit', formSubmitHandler);
formElement.addEventListener('submit', function () {
  popup.classList.remove('popup__opened')
});
