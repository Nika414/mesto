let editButton = document.querySelector('.profile__edit-button');
let editProfilePopup = document.querySelector('.popup_purpose_edit-profile');
let editProfileForm = document.querySelector('.popup__edit-profile-form');
let name = document.querySelector('.profile__name');
let about = document.querySelector('.profile__about');
let nameInput = editProfileForm.querySelector('.popup__form-item_value_name');
let aboutInput = editProfileForm.querySelector('.popup__form-item_value_about');
let closeButtons = document.querySelectorAll('.popup__close-button');
let addButton = document.querySelector('.profile__add-button');
let addPlacePopup = document.querySelector('.popup_purpose_add-place');
let addPlaceForm = document.querySelector('.popup-add-place-form')
const placeName = document.querySelector('.popup__form-item_value_placename');
const placeLink = document.querySelector('.popup__form-item_value_placelink');
const photoCards = document.querySelector('.photo-cards');
const fullPhotoPopup = document.querySelector('.popup_purpose_full-photo');

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];


// Открыть попап по изменению профиля

function openEditProfilePopup() {
  editProfilePopup.classList.add('popup_opened');
  nameInput.value = name.textContent;
  aboutInput.value = about.textContent;
}

// Навесить листенер на кнопку открыть попап изменения профиля

editButton.addEventListener('click', openEditProfilePopup);

// Открыть попап по добавлению места

function openAddPlacePopup() {
  addPlacePopup.classList.add('popup_opened');
}
// Навесить листенер на кнопку открыть попап добавления места

addButton.addEventListener('click', openAddPlacePopup);


// Закрыть попап

function closePopup(evt) {
  const popup = evt.target.closest('.popup');
  popup.classList.remove('popup_opened');
}

// Навесить листенер на кнопку закрытия попапов

closeButtons.forEach(button => {
  button.addEventListener('click', closePopup);
});

// Засабмитить попап изменения профиля

function editeProfileFormSubmitHandler(evt) {
  evt.preventDefault();
  name.textContent = nameInput.value;
  about.textContent = aboutInput.value;
  editProfilePopup.classList.remove('popup_opened');
}

// Навесить листенер на кнопку сабмита изменения профиля

editProfileForm.addEventListener('submit', editeProfileFormSubmitHandler);

// Создать карточку

function renderItem(name, link) {

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
  likeButton.addEventListener('click', () => { toggleLike(event); });

  //Навешиваем листенер на корзину

  const deleteButtons = cardElement.querySelector('.photo-cards__bin');
  deleteButtons.addEventListener('click', () => { deletePlace(event) });
  //Прикрепляем новый элемент
  photoCards.prepend(cardElement);
};

//Подключить первичные карточки

initialCards.forEach(function (item) {
  renderItem(item.name, item.link);
}
);

// Открыть попап с фото во всю ширину

function openFullPhotoPopup(name, link) {

  fullPhotoPopup.querySelector('.popup__full-photo').src = link;
  fullPhotoPopup.querySelector('.popup__full-photo-description').textContent = name
  fullPhotoPopup.classList.add('popup_opened');
}

//Переключить состояние лайка

function toggleLike(event) {
  event.target.classList.toggle('photo-cards__like-button_active');
}

//Удалить картинку

function deletePlace(event) {
  const a = event.target.closest('.photo-cards__item');
  a.remove();
}



//Засабмитить новое место
function addPlaceFormSubmitHandler(evt) {
  evt.preventDefault();
  addPlacePopup.classList.remove('popup_opened');
  renderItem(placeName.value, placeLink.value);
  placeName.value = '';
  placeLink.value = '';
}

// Навесить листенер на кнопку сабмита создания нового места

addPlaceForm.addEventListener('submit', addPlaceFormSubmitHandler);