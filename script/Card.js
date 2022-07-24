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
    constructor(name, link, cardSelector, handleCardClick) {
        this._name = name;
        this._link = link;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;
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
        
        this._cardImage  = this._element.querySelector('.photo-cards__pic');
        this._likeButton = this._element.querySelector('.photo-cards__like-button');
        this._deleteButton = this._element.querySelector('.photo-cards__bin');
        this._imageTitle = this._element.querySelector('.photo-cards__photo-title');
        this._setEventListeners();
        this._cardImage.src = this._link;
        this._cardImage.alt = this._name;
        this._imageTitle.textContent = this._name;
        return this._element;
    }

    _setEventListeners() {
        this._cardImage.addEventListener('click', () => { this._handleCardClick(this._name, this._link); });
        this._likeButton.addEventListener('click', (event) => { this._handleLikeClick(event); });
        this._deleteButton.addEventListener('click', () => { this._handleDeleteButton(); })
    }

    _handleLikeClick(event) {
        event.target.classList.toggle('photo-cards__like-button_active');
    }

    _handleDeleteButton() {
        this._element.remove();
    }
}

export { Card, initialCards}