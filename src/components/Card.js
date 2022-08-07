class Card {
    constructor(data, cardSelector, handleCardClick) {
        this._data = data;
        this._name = data.placename;
        this._link = data.link;
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
        debugger;
        this._element = this._getTemplate();
        this._cardImage = this._element.querySelector('.photo-cards__pic');
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
        this._cardImage.addEventListener('click', () => { this._handleCardClick(this._data); });
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

export { Card }