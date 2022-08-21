import './index.css'
import { Card } from '../components/Card.js'
import { FormValidator } from '../components/FormValidator.js'
import { config, newCardsOptions } from '../utils/constants.js'
import { Section } from '../components/Section.js'
import { PopupWithImage } from '../components/PopupWithImage.js'
import { PopupWithForm } from '../components/PopupWithForm.js'
import { UserInfo } from '../components/UserInfo.js'
import { Api } from '../components/Api.js'
import { options, myId } from '../utils/constants.js'
import { PopupWithConfirmation } from '../components/PopupWithConfirmation'


const buttonEditProfile = document.querySelector('.profile__edit-button');
const formEditProfile = document.querySelector('.popup__edit-profile-form');
const nameInput = formEditProfile.querySelector('.popup__form-item_value_name');
const aboutInput = formEditProfile.querySelector('.popup__form-item_value_about');
const buttonAddPlace = document.querySelector('.profile__add-button');
const formAddPlace = document.querySelector('.popup-add-place-form');
const formEditAvatar = document.querySelector('.popup-avatar-edit-form')
const fullPhotoPopup = document.querySelector('.popup_purpose_full-photo');
const fullPhoto = fullPhotoPopup.querySelector('.popup__full-photo');
const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about');
const avatarChanging = document.querySelector('.profile__avatar-edit');
const profileAvtar = document.querySelector('.profile__avatar');
console.log(profileAvtar)



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
  api.changeInfo(data)
    .then((res) => userInfo.setUserInfo(res))
  editProfilePopup.closePopup();
}

function handleEditAvatarFormSubmit(data){
  api.changeAvatar(data)
    .then((res) => userInfo.setUserInfo(res));
  editAvatarPopup.closePopup();
}


// Засабмитить попап добавления места 
function handleAddPlaceFormSubmit(data) {
  api.createCard(data)
    .then((res) => { cardsSection.addItem(createCard(res)) })
  addPlacePopup.closePopup();
}

function openPopupEditAvtar() {
  editAvatarPopup.openPopup();
}
// Навесить листенер на кнопку открыть попап изменения профиля

buttonEditProfile.addEventListener('click', openPopupEditProfile);

// Навесить листенер на кнопку открыть попап добавления места

buttonAddPlace.addEventListener('click', openPopupAddPlace);

avatarChanging.addEventListener('click', openPopupEditAvtar);

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

function handleLikeApi(data, like) {
  const status = data.likes.some(function (el) {
    return (el._id === myId);
  });

  if (status) {
    api.deleteLike(data._id).then((result) => {
      like.textContent = result.likes.length;
    })
  }
  else {
    api.putLike(data._id).then((result) => {
      like.textContent = result.likes.length;
    })
  }
}

function handleLikeStatus(data, like) {
  const status = data.likes.some(function (el) {
    return (el._id === myId);
  });
  if (status) {
    like.classList.add('photo-cards__like-button_active');
  }
  else {
    like.classList.remove('photo-cards__like-button_active')
  }
}

// Создание новой карточки
function createCard(data) {
  const card = new Card(data, '#card', handleCardClick, handleDeleteButtonClick, handleLikeApi, handleLikeStatus);
  if (data.owner._id === myId) {
    const cardElement = card.generateCard(true, handleLikeStatus);
    return cardElement;
  }
  else {
    const cardElement = card.generateCard(false, handleLikeStatus);
    return cardElement;
  }
}

const formAddPlaceValidator = new FormValidator(config, formAddPlace);
formAddPlaceValidator.enableValidation();

const formEditProfileValidator = new FormValidator(config, formEditProfile);
formEditProfileValidator.enableValidation();

const formEditAvatarValidator = new FormValidator(config, formEditAvatar);
formEditAvatarValidator.enableValidation();

const popupFullPhoto = new PopupWithImage('.popup_purpose_full-photo');
popupFullPhoto.setEventListeners();

const editProfilePopup = new PopupWithForm('.popup_purpose_edit-profile', handleEditProfileFormSubmit);
editProfilePopup.setEventListeners();

const editAvatarPopup = new PopupWithForm('.popup_purpose_avatar-edit', handleEditAvatarFormSubmit);
editAvatarPopup.setEventListeners();

const addPlacePopup = new PopupWithForm('.popup_purpose_add-place', handleAddPlaceFormSubmit);
addPlacePopup.setEventListeners();

const userInfo = new UserInfo('.popup_purpose_edit-profile', { name: '.profile__name', about: '.profile__about', avatar:'.profile__avatar' })

const deleteCardPopup = new PopupWithConfirmation('.popup_purpose_delete-card');
deleteCardPopup.setEventListeners();

const api = new Api(options);

api.getProfileInfo().then((data) => {
  userInfo.setUserInfo(data)
 }).catch(err => console.log('Произошла ошибка: ', err));

// api.getAvatar().then((data) => {
//   profileName.textContent = data.name;
//   profileAbout.textContent = data.about;
// }).catch(err => console.log('Произошла ошибка: ', err));

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