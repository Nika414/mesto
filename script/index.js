const buttonEditProfile = document.querySelector('.profile__edit-button');
const popupEditProfile = document.querySelector('.popup_purpose_edit-profile');
const formEditProfile = document.querySelector('.popup__edit-profile-form');
const name = document.querySelector('.profile__name');
const about = document.querySelector('.profile__about');
const nameInput = formEditProfile.querySelector('.popup__form-item_value_name');
const aboutInput = formEditProfile.querySelector('.popup__form-item_value_about');
const closeButtons = document.querySelectorAll('.popup__close-button');
const closeButton = document.querySelector('.popup__close-button');
const buttonAddPlace = document.querySelector('.profile__add-button');
const popupAddPlace = document.querySelector('.popup_purpose_add-place');
const formAddPlace = document.querySelector('.popup-add-place-form')
const placeName = document.querySelector('.popup__form-item_value_placename');
const placeLink = document.querySelector('.popup__form-item_value_placelink');
const photoCards = document.querySelector('.photo-cards');
const fullPhotoPopup = document.querySelector('.popup_purpose_full-photo');
const fullPhoto = fullPhotoPopup.querySelector('.popup__full-photo');
const fullPhotoDescription = fullPhotoPopup.querySelector('.popup__full-photo-description');



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
  resetForms(popupEditProfile);
  nameInput.value = name.textContent;
  aboutInput.value = about.textContent;
}

// Открыть попап по добавлению места

function openPopupAddPlace() {
  openPopup(popupAddPlace);
  resetButtonState(popupAddPlace);
  resetSpans(popupAddPlace);
  resetForms(popupAddPlace);
}

// Закрыть попап

function closePopup(popup) {
  popup.classList.remove('popup_opened');

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

//Сбросить форму
const resetForms = (popup) => {
  const form = popup.querySelector('.popup__form');
  form.reset();
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
  )}
)

//закрыть попап по ESC
function closePopupByEsc(evt) {
  if (evt.key === "Escape") {
    const popup = document.querySelector('.popup_opened');
    closePopup(popup);
    document.removeEventListener('keyup', closePopupByEsc);
  };
}

// Засабмитить попап изменения профиля

function editeProfileFormSubmitHandler(evt) {
  evt.preventDefault();
  name.textContent = nameInput.value;
  about.textContent = aboutInput.value;
  closePopup(popupEditProfile);
  resetSpans(popupEditProfile);
  resetForms(popupEditProfile);
}

// Создать карточку

function createItem(name, link) {

  //создаем карточку
  const cardTemplate = document.querySelector('#card').content;
  const cardElement = cardTemplate.querySelector('.photo-cards__item').cloneNode(true);
  const photoCardsPic = cardElement.querySelector('.photo-cards__pic');
  photoCardsPic.src = link;
  cardElement.querySelector('.photo-cards__photo-title').textContent = name;

  //Навешиваем листенер на картинку, для открытия полного фото

  photoCardsPic.addEventListener('click', () => { openFullPhotoPopup(name, link); });

  //Навешиваем листенер на лайк

  const likeButton = cardElement.querySelector('.photo-cards__like-button');
  likeButton.addEventListener('click', () => { handleToggleLike(event); });

  //Навешиваем листенер на корзину

  const deleteButtons = cardElement.querySelector('.photo-cards__bin');
  deleteButtons.addEventListener('click', () => { handleDeletePlace(event) });
  return cardElement;

};

//добавить карточку в разметку

function renderItem(name, link) {
  const item = createItem(name, link);
  photoCards.prepend(item);
}


//Подключить первичные карточки

initialCards.forEach(function (item) {
  renderItem(item.name, item.link);
}
);

// Открыть попап с фото во всю ширину


function openFullPhotoPopup(name, link) {

  fullPhoto.src = link;
  fullPhoto.alt = name;
  fullPhotoDescription.textContent = name
  openPopup(fullPhotoPopup);
}

//Переключить состояние лайка

function handleToggleLike(event) {
  event.target.classList.toggle('photo-cards__like-button_active');
}

//Удалить картинку

function handleDeletePlace(event) {
  const a = event.target.closest('.photo-cards__item');
  a.remove();
}

//Засабмитить новое место

function formAddPlaceSubmitHandler(evt) {
  evt.preventDefault();
  closePopup(popupAddPlace);
  renderItem(placeName.value, placeLink.value);
  resetSpans(popupAddPlace);
  resetForms(popupAddPlace);
}

// Навесить листенер на кнопку открыть попап изменения профиля

buttonEditProfile.addEventListener('click', openPopupEditProfile);

// Навесить листенер на кнопку открыть попап добавления места

buttonAddPlace.addEventListener('click', openPopupAddPlace);

// Навесить листенер на кнопку сабмита изменения профиля

formEditProfile.addEventListener('submit', editeProfileFormSubmitHandler);

// Навесить листенер на кнопку сабмита создания нового места

formAddPlace.addEventListener('submit', formAddPlaceSubmitHandler);