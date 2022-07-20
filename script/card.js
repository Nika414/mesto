
export { initialCards, Card, renderCards }
import { fullPhotoPopup, fullPhoto, openPopup, closePopupByEsc } from './index.js'

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


//класс карточки

class Card {
    constructor(name, link, cardSelector) {
        this._name = name;
        this._link = link;
        this._cardSelector = cardSelector;
    }

    //скопировать темплейт
    _getTemplate() {
        const cardElement = document
            .querySelector(this._cardSelector)
            .content
            .querySelector('.photo-cards__item')
            .cloneNode(true);
        return cardElement;
    }
    //создать карточку  
    generateCard() {
        this._element = this._getTemplate();
        this._setEventListeners();
        this._element.querySelector('.photo-cards__photo-title').textContent = this._name;
        this._element.querySelector('.photo-cards__pic').src = this._link;
        return this._element;
    }

    _setEventListeners() {
        this._element.querySelector('.photo-cards__pic').addEventListener('click', () => { this._handleOpenFullPhotoPopup(fullPhotoPopup); });
        this._element.querySelector('.photo-cards__like-button').addEventListener('click', () => { this._handleLikeClick(event); });
        this._element.querySelector('.photo-cards__bin').addEventListener('click', () => { this._handleDeleteButton(event); })
    }


    _handleOpenFullPhotoPopup(fullPhotoPopup) {
        fullPhoto.src = this._link;
        fullPhoto.alt = this._name;
        document.querySelector('.popup__full-photo-description').textContent = this._name
        openPopup(fullPhotoPopup);
        document.addEventListener('keyup', closePopupByEsc);

    }

    _handleLikeClick(event) {
        event.target.classList.toggle('photo-cards__like-button_active');
    }

    _handleDeleteButton(event) {
        const a = event.target.closest('.photo-cards__item');
        a.remove();
    }
}

//Создать, заполнить карточку данными и вывести на страницу
const renderCards = initialCards.forEach((item) => {
    const card = new Card(item.name, item.link, '#card');
    const cardElement = card.generateCard();
    document.querySelector('.photo-cards').prepend(cardElement);
})

