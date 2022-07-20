import { Card } from './card.js';
import { config, FormValidator } from './formValidator.js'
export { fullPhotoPopup, fullPhoto, openPopup, closePopupByEsc }

const buttonEditProfile = document.querySelector('.profile__edit-button');
const popupEditProfile = document.querySelector('.popup_purpose_edit-profile');
const formEditProfile = document.querySelector('.popup__edit-profile-form');
const name = document.querySelector('.profile__name');
const about = document.querySelector('.profile__about');
const nameInput = formEditProfile.querySelector('.popup__form-item_value_name');
const aboutInput = formEditProfile.querySelector('.popup__form-item_value_about');
const buttonAddPlace = document.querySelector('.profile__add-button');
const popupAddPlace = document.querySelector('.popup_purpose_add-place');
const formAddPlace = document.querySelector('.popup-add-place-form')
const placeName = document.querySelector('.popup__form-item_value_placename');
const placeLink = document.querySelector('.popup__form-item_value_placelink');
const photoCards = document.querySelector('.photo-cards');
const fullPhotoPopup = document.querySelector('.popup_purpose_full-photo');
const fullPhoto = fullPhotoPopup.querySelector('.popup__full-photo');

// Открыть попап 

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keyup', closePopupByEsc);

}

// Открыть попап по изменению профиля

function openPopupEditProfile() {
  openPopup(popupEditProfile);
  resetButtonState(popupEditProfile);
  resetSpans(popupEditProfile);
  formEditProfile.reset();
  nameInput.value = name.textContent;
  aboutInput.value = about.textContent;
}

// Открыть попап по добавлению места

function openPopupAddPlace() {
  openPopup(popupAddPlace);
  resetButtonState(popupAddPlace);
  resetSpans(popupAddPlace);
  formAddPlace.reset();
}

// Закрыть попап

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keyup', closePopupByEsc);
}

// Убрать спаны и карсное подчеркивание
const resetSpans = (popup) => {
  const errorSpans = popup.querySelectorAll('.popup__form-item-error');
  const inputs = popup.querySelectorAll('.popup__form-item')
  errorSpans.forEach((errorElement) => {
    errorElement.textContent = " "
  })
  inputs.forEach((input) => {
    input.classList.remove('popup__form-item_type_error')
  }
  )
}


// Изменить состояние кнопки
const resetButtonState = (popup) => {
  const button = popup.querySelector('.popup__form-button');
  button.classList.add('popup__form-button_inactive');
  button.setAttribute('disabled', '');
}

//Навесить листенер на оверлей и кнопку закрытия
const popups = document.querySelectorAll('.popup');
popups.forEach((popup) => {

  popup.addEventListener('click', (evt) => {
    if ((evt.target === evt.currentTarget) || (evt.target.classList.contains('popup__close-button'))) {
      closePopup(popup);
    }
  }
  )
}
)

//закрыть попап по ESC
function closePopupByEsc(evt) {
  if (evt.key === "Escape") {
    const popup = document.querySelector('.popup_opened');
    closePopup(popup);
  };
}

// Засабмитить попап изменения профиля

function editeProfileFormSubmitHandler(evt) {
  evt.preventDefault();
  name.textContent = nameInput.value;
  about.textContent = aboutInput.value;
  closePopup(popupEditProfile);
  resetSpans(popupEditProfile);
  formEditProfile.reset();
}

//Засабмитить новое место

function formAddPlaceSubmitHandler(evt) {
  evt.preventDefault();
  closePopup(popupAddPlace);
  const card = new Card(placeName.value, placeLink.value, '#card');
  const cardElement = card.generateCard();
  photoCards.prepend(cardElement);
  resetSpans(popupAddPlace);
  formAddPlace.reset();
}

// Навесить листенер на кнопку открыть попап изменения профиля

buttonEditProfile.addEventListener('click', openPopupEditProfile);

// Навесить листенер на кнопку открыть попап добавления места

buttonAddPlace.addEventListener('click', openPopupAddPlace);

// Навесить листенер на кнопку сабмита изменения профиля

formEditProfile.addEventListener('submit', editeProfileFormSubmitHandler);

// Навесить листенер на кнопку сабмита создания нового места

formAddPlace.addEventListener('submit', formAddPlaceSubmitHandler);


const formList = document.querySelectorAll(config.formSelector);

formList.forEach((formElement) => {
  const formValidator = new FormValidator(config, formElement);
  formValidator.enableValidation();
})