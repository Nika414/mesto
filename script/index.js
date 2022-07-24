import { Card, initialCards } from './Card.js';
import { config, FormValidator } from './FormValidator.js'

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
const fullPhotoDescription = document.querySelector('.popup__full-photo-description');

// Открыть попап 

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keyup', closePopupByEsc);
}

// Открыть попап по изменению профиля

function openPopupEditProfile() {
  openPopup(popupEditProfile);
  formEditProfileValidator.resetValidation();
  nameInput.value = name.textContent;
  aboutInput.value = about.textContent;
}

// Открыть попап по добавлению места

function openPopupAddPlace() {
  openPopup(popupAddPlace);
  formAddPlace.reset();
  formAddPlaceValidator.resetValidation();
}

// Закрыть попап

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keyup', closePopupByEsc);

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

function handleFormEditProfileSubmit(evt) {
  evt.preventDefault();
  name.textContent = nameInput.value;
  about.textContent = aboutInput.value;
  closePopup(popupEditProfile);
}

function renderNewCards() {
  const cardElement = createCard(placeName.value, placeLink.value);
  photoCards.prepend(cardElement);
}
//Засабмитить новое место

function handleFormAddPlaceSubmit(evt) {
  evt.preventDefault();
  closePopup(popupAddPlace);
  renderNewCards();
  formAddPlace.reset();
}

// Навесить листенер на кнопку открыть попап изменения профиля

buttonEditProfile.addEventListener('click', openPopupEditProfile);

// Навесить листенер на кнопку открыть попап добавления места

buttonAddPlace.addEventListener('click', openPopupAddPlace);

// Навесить листенер на кнопку сабмита изменения профиля

formEditProfile.addEventListener('submit', handleFormEditProfileSubmit);

// Навесить листенер на кнопку сабмита создания нового места

formAddPlace.addEventListener('submit', handleFormAddPlaceSubmit);


const formList = document.querySelectorAll(config.formSelector);



function handleCardClick(name, link) {
  fullPhoto.src = link;
  fullPhoto.alt = name;
  fullPhotoDescription.textContent = name
  openPopup(fullPhotoPopup);
}

function createCard(name, link) {
  const card = new Card(name, link, '#card', handleCardClick);
  const cardElement = card.generateCard();;
  return cardElement;
}

function renderCards() {
  initialCards.forEach((item) => {
    const cardElement = createCard(item.name, item.link);
    photoCards.prepend(cardElement);
  })
}

renderCards();

const formAddPlaceValidator = new FormValidator(config, formAddPlace);
formAddPlaceValidator.enableValidation();

const formEditProfileValidator = new FormValidator(config, formEditProfile);
formEditProfileValidator.enableValidation();


export { fullPhotoPopup, fullPhoto, openPopup, handleCardClick }