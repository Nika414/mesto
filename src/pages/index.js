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
const avatarChanging = document.querySelector('.profile__avatar-edit');

let userId;

const api = new Api(options);

const profileInfo = api.getProfileInfo()
const cardsInfo = api.getCardsInfo()

Promise.all([profileInfo, cardsInfo])
  .then(([userData, cards]) => {
    console.log(userData)
    userId = userData._id;
    
    userInfo.setUserInfo(userData)
    cardsSection.renderItem({
      items: cards,
      renderer: (item) => {
        cardsSection.addItem(createCard(item));
      }
    })
  })
  .catch(err => console.log('Произошла ошибка: ', err));

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

// Открыть попап по изменению аватара
function openPopupEditAvtar() {
  editAvatarPopup.openPopup();
  formEditAvatar.reset();
  formEditAvatarValidator.resetValidation();
}

// Открытие попапа с фото по клику на карточку

function handleCardClick(data) {
  popupFullPhoto.openPopup(data);
}

// Открытие попапа подтверждения удаления фото
function openDeleteCardPopup(card) {
  deleteCardPopup.openPopup();

  deleteCardPopup.setEventListeners(card);
}

// Засабмитить попап изменения профиля
function handleEditProfileFormSubmit(data) {
  api.changeInfo(data)
    .then((res) => {userInfo.setUserInfo(res); editProfilePopup.closePopup();})
    .catch((err) => {console.log(err)})
    .finally(() => {
      editProfilePopup.renderLoading(false, 'Сохранить');
    })
}

// Засабмитить новый аватар
function handleEditAvatarFormSubmit(data){
  api.changeAvatar(data)
    .then((res) => {userInfo.setUserInfo(res); editAvatarPopup.closePopup();})
    .catch((err) => {console.log(err)})
    .finally(() => {
      editAvatarPopup.renderLoading(false, 'Сохранить');
    })
  
}

// Засабмитить попап добавления места 
function handleAddPlaceFormSubmit(data) {

  api.createCard(data)
    .then((res) => {cardsSection.addItem(createCard(res)); addPlacePopup.closePopup() })
    .catch((err) => {console.log(err)})
    .finally(() => {
      addPlacePopup.renderLoading(false, 'Сохранить');
      });
  ;
}


// Навесить листенер на кнопку открыть попап изменения профиля

buttonEditProfile.addEventListener('click', openPopupEditProfile);

// Навесить листенер на кнопку открыть попап добавления места

buttonAddPlace.addEventListener('click', openPopupAddPlace);

// Навесить листенер на кнопку изменения аватара

avatarChanging.addEventListener('click', openPopupEditAvtar);

// Хэндлеры

function handleDeleteButtonClick(card) {
    api.deleteCardById(card._id).then((res) => {card._element.remove(); deleteCardPopup.closePopup();})
    .catch((err) => {console.log(err)});
  }

function handleLikeApi(data) {

  const status = data._data.likes.some(function (el) {
    return (el._id === userId);
  });

  if (status) {
    api.deleteLike(data._data._id).then((result) => {
      data._likeAmount.textContent = result.likes.length;
    }).catch((err) => {console.log(err)});
  }
  else {
    api.putLike(data._data._id).then((result) => {
      data._likeAmount.textContent = result.likes.length;
    }).catch((err) => {console.log(err)})
  }
}




// Создание новой карточки
function createCard(data) {
  const card = new Card(data, '#card', handleCardClick, openDeleteCardPopup, handleLikeApi, userId);

  if (data.owner._id === userId) {
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

const userInfo = new UserInfo('.popup_purpose_edit-profile', { name: '.profile__name', about: '.profile__about', avatar:'.profile__avatar'})

const deleteCardPopup = new PopupWithConfirmation('.popup_purpose_delete-card', handleDeleteButtonClick);

const cardsSection = new Section('.photo-cards');



export { fullPhotoPopup, fullPhoto, handleCardClick, handleDeleteButtonClick, openDeleteCardPopup }