const editButton = document.querySelector('.profile__edit-button');
const editProfilePopup = document.querySelector('.popup_purpose_edit-profile');
const editProfileForm = document.querySelector('.popup__edit-profile-form');
const name = document.querySelector('.profile__name');
const about = document.querySelector('.profile__about');
const nameInput = editProfileForm.querySelector('.popup__form-item_value_name');
const aboutInput = editProfileForm.querySelector('.popup__form-item_value_about');
const closeButtons = document.querySelectorAll('.popup__close-button');
const addButton = document.querySelector('.profile__add-button');
const addPlacePopup = document.querySelector('.popup_purpose_add-place');
const addPlaceForm = document.querySelector('.popup-add-place-form')
const placeName = document.querySelector('.popup__form-item_value_placename');
const placeLink = document.querySelector('.popup__form-item_value_placelink');
const photoCards = document.querySelector('.photo-cards');
const fullPhotoPopup = document.querySelector('.popup_purpose_full-photo');



// Открыть попап 

function openPopup(popup) {
  popup.classList.add('popup_opened')
}

// Открыть попап по изменению профиля

function openEditProfilePopup() {
  openPopup(editProfilePopup);
  nameInput.value = name.textContent;
  aboutInput.value = about.textContent;
}

// Открыть попап по добавлению места

function openAddPlacePopup() {
  openPopup(addPlacePopup);
}

// Закрыть попап

function closePopup(evt) {
  const popup = evt.target.closest('.popup');
  popup.classList.remove('popup_opened');
}

// Засабмитить попап изменения профиля

function editeProfileFormSubmitHandler(evt) {
  evt.preventDefault();
  name.textContent = nameInput.value;
  about.textContent = aboutInput.value;
  closePopup(evt);
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
  createItem(item.name, item.link);
  renderItem(item.name, item.link);
}
);

// Открыть попап с фото во всю ширину

function openFullPhotoPopup(name, link) {

  fullPhotoPopup.querySelector('.popup__full-photo').src = link;
  fullPhotoPopup.querySelector('.popup__full-photo').alt = name;
  fullPhotoPopup.querySelector('.popup__full-photo-description').textContent = name
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

function addPlaceFormSubmitHandler(evt) {
  evt.preventDefault();
  closePopup(evt);
  createItem(placeName.value, placeLink.value);
  renderItem(placeName.value, placeLink.value);
  addPlaceForm.reset();

}

// Навесить листенер на кнопку открыть попап изменения профиля

editButton.addEventListener('click', openEditProfilePopup);

// Навесить листенер на кнопку открыть попап добавления места

addButton.addEventListener('click', openAddPlacePopup);

// Навесить листенер на кнопку закрытия попапов

closeButtons.forEach(button => {
  button.addEventListener('click', closePopup);
});

// Навесить листенер на кнопку сабмита изменения профиля

editProfileForm.addEventListener('submit', editeProfileFormSubmitHandler);

// Навесить листенер на кнопку сабмита создания нового места

addPlaceForm.addEventListener('submit', addPlaceFormSubmitHandler);