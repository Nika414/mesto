let editButton = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let formElement = document.querySelector('.popup__form');
let name = document.querySelector('.profile__name');
let about = document.querySelector('.profile__about');
let nameInput = formElement.querySelector('.popup__form-name');
let aboutInput = formElement.querySelector('.popup__form-about');
let closeButton = document.querySelector('.popup__close-button');

function openPopup() {
  popup.classList.add('popup_opened');
  nameInput.value = name.textContent;
  aboutInput.value = about.textContent;
}

editButton.addEventListener('click', openPopup);

function closePopup() {
  popup.classList.remove('popup_opened');
}


closeButton.addEventListener('click', closePopup);

function formSubmitHandler(evt) {
  evt.preventDefault();
  name.textContent = nameInput.value;
  about.textContent = aboutInput.value;
  closePopup();
}

formElement.addEventListener('submit', formSubmitHandler);
