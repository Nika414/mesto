import './index.css'
import { Card, initialCards } from '../components/Card.js'
import { config, FormValidator } from '../components/FormValidator.js'
import { Section } from '../components/Section.js'
import { PopupWithImage } from '../components/PopupWithImage.js'
import { PopupWithForm } from '../components/PopupWithForm.js'
import { UserInfo } from '../components/UserInfo.js'

const buttonEditProfile = document.querySelector('.profile__edit-button');
const formEditProfile = document.querySelector('.popup__edit-profile-form');
const nameInput = formEditProfile.querySelector('.popup__form-item_value_name');
const aboutInput = formEditProfile.querySelector('.popup__form-item_value_about');
const buttonAddPlace = document.querySelector('.profile__add-button');
const formAddPlace = document.querySelector('.popup-add-place-form')
const fullPhotoPopup = document.querySelector('.popup_purpose_full-photo');
const fullPhoto = fullPhotoPopup.querySelector('.popup__full-photo');

// Открыть попап по изменению профиля
function openPopupEditProfile() {
  editProfilePopup.openPopup();
  formEditProfileValidator.resetValidation();
  nameInput.value = userInfo.getUserInfo().name;
  aboutInput.value = userInfo.getUserInfo().about;
}

// Открыть попап по добавлению места
function openPopupAddPlace() {
  addPlacePopup.openPopup();
  formAddPlace.reset();
  formAddPlaceValidator.resetValidation();
}


// Засабмитить попап изменения профиля
function handleEditProfileFormSubmit(data) {
  userInfo.setUserInfo(data);
  editProfilePopup.closePopup();
}
// Засабмитить попап добавления места
function handleAddPlaceFormSubmit(data) {
  const newCard = createCard(data);
  cardsSection.addItem(newCard);
  addPlacePopup.closePopup();
}

// Навесить листенер на кнопку открыть попап изменения профиля

buttonEditProfile.addEventListener('click', openPopupEditProfile);

// Навесить листенер на кнопку открыть попап добавления места

buttonAddPlace.addEventListener('click', openPopupAddPlace);

// Откртие попапа с фото по клику на карточку

function handleCardClick(data) {
  popupFullPhoto.openPopup(data);
}
// Создание новой карточки
function createCard(data) {
  const card = new Card(data, '#card', handleCardClick);
  const cardElement = card.generateCard();
  return cardElement;
}

// Создание секции с начальными карточками
const cardsSection = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = new Card(item, '#card', () => handleCardClick(item));
    const cardElement = card.generateCard();
    cardsSection.addItem(cardElement);
  }
}, '.photo-cards');

const formAddPlaceValidator = new FormValidator(config, formAddPlace);
formAddPlaceValidator.enableValidation();

const formEditProfileValidator = new FormValidator(config, formEditProfile);
formEditProfileValidator.enableValidation();
cardsSection.renderItem()

const popupFullPhoto = new PopupWithImage('.popup_purpose_full-photo');
popupFullPhoto.setEventListeners();


const editProfilePopup = new PopupWithForm('.popup_purpose_edit-profile', handleEditProfileFormSubmit);
editProfilePopup.setEventListeners();


const addPlacePopup = new PopupWithForm('.popup_purpose_add-place', handleAddPlaceFormSubmit);
addPlacePopup.setEventListeners();


const userInfo = new UserInfo('.popup_purpose_edit-profile', { name: '.profile__name', about: '.profile__about' })

export { fullPhotoPopup, fullPhoto, handleCardClick }