import './index.css'
import { Card } from '../components/Card.js'
import { FormValidator } from '../components/FormValidator.js'
import { config, newCardsOptions } from '../utils/constants.js'
import { Section } from '../components/Section.js'
import { PopupWithImage } from '../components/PopupWithImage.js'
import { PopupWithForm } from '../components/PopupWithForm.js'
import { UserInfo } from '../components/UserInfo.js'
import { Api } from '../components/Api.js'
import { options } from '../utils/constants.js'
import { PopupForDelete } from '../components/PopupForDelete'


const buttonEditProfile = document.querySelector('.profile__edit-button');
const formEditProfile = document.querySelector('.popup__edit-profile-form');
const nameInput = formEditProfile.querySelector('.popup__form-item_value_name');
const aboutInput = formEditProfile.querySelector('.popup__form-item_value_about');
const buttonAddPlace = document.querySelector('.profile__add-button');
const formAddPlace = document.querySelector('.popup-add-place-form')
const fullPhotoPopup = document.querySelector('.popup_purpose_full-photo');
const fullPhoto = fullPhotoPopup.querySelector('.popup__full-photo');
const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about');
const likeAmount = document.querySelector('.photo-cards__like-amount')


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
  const changeProfileApi = new Api(profileOptions);
  changeProfileApi.changeInfo(data)
    .then((res) => userInfo.setUserInfo(res))
  editProfilePopup.closePopup();
}
// Засабмитить попап добавления места 
function handleAddPlaceFormSubmit(data) {
  api.createCard(data)
    .then((res) => { cardsSection.addItem(createCard(res)) })
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
// Открытие попапа для удаления фото
function handleDeleteButtonClick(card, data) {
  deleteCardPopup.openPopup();
  document.querySelector('.popup__delete-button').addEventListener('click', (evt) => {
    evt.preventDefault();
    card.remove();
    api.deleteCardById(data._id);
    deleteCardPopup.closePopup();
  })

}


// Создание новой карточки
function createCard(data) {
  const card = new Card(data, '#card', handleCardClick, handleDeleteButtonClick);
  if (data.owner._id === 'e2db0a2449e7dbd1d490e55f') {
    const cardElement = card.generateCard(true);
    return cardElement;
  }
  else {
    const cardElement = card.generateCard(false);
    return cardElement;
  }
}


const formAddPlaceValidator = new FormValidator(config, formAddPlace);
formAddPlaceValidator.enableValidation();

const formEditProfileValidator = new FormValidator(config, formEditProfile);
formEditProfileValidator.enableValidation();


const popupFullPhoto = new PopupWithImage('.popup_purpose_full-photo');
popupFullPhoto.setEventListeners();


const editProfilePopup = new PopupWithForm('.popup_purpose_edit-profile', handleEditProfileFormSubmit);
editProfilePopup.setEventListeners();


const addPlacePopup = new PopupWithForm('.popup_purpose_add-place', handleAddPlaceFormSubmit);
addPlacePopup.setEventListeners();


const userInfo = new UserInfo('.popup_purpose_edit-profile', { name: '.profile__name', about: '.profile__about' })

const deleteCardPopup = new PopupForDelete('.popup_purpose_delete-card');
deleteCardPopup.setEventListeners();

const api = new Api(options);

api.getProfileInfo().then((data) => {
  profileName.textContent = data.name;
  profileAbout.textContent = data.about;
}).catch(err => console.log('Произошла ошибка: ', err));

const cardsSection = new Section('.photo-cards');


api.getCardsInfo().then((data) => {
  cardsSection.renderItem({
    items: data,
    renderer: (item) => {
      cardsSection.addItem(createCard(item));
    }
  })
}).catch(err => console.log('Произошла ошибка: ', err));




export { fullPhotoPopup, fullPhoto, handleCardClick, handleDeleteButtonClick }