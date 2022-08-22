class Card {
    constructor(data, cardSelector, handleCardClick, openDeleteCardPopup, handleLikeApi, handleLikeStatus) {
        this._data = data;
        this._name = data.name;
        this._link = data.link;
        this._likes = data.likes.length;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;
        this._openDeleteCardPopup = openDeleteCardPopup;
        this._handleLikeApi = handleLikeApi;
        this._handleLikeStatus = handleLikeStatus;
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
    generateCard(idIsTrue) {
        this._element = this._getTemplate();
        this._cardImage = this._element.querySelector('.photo-cards__pic');
        this._likeButton = this._element.querySelector('.photo-cards__like-button');
        this._handleLikeStatus(this._data, this._likeButton);
        this._imageTitle = this._element.querySelector('.photo-cards__photo-title');
        this._likeAmount = this._element.querySelector('.photo-cards__like-amount');
        this._deleteButton = this._element.querySelector('.photo-cards__bin');
        this._setEventListeners();
        this._cardImage.src = this._link;
        this._cardImage.alt = this._name;
        this._imageTitle.textContent = this._name;
        this._likeAmount.textContent = this._likes;
        if (idIsTrue===true) {
            return this._element;
        }
        else {
            this._deleteButton.classList.add('photo-cards__bin_inactive');
            return this._element;
        }
    }

    _setEventListeners() {
        this._cardImage.addEventListener('click', () => { this._handleCardClick(this._data); });
        this._likeButton.addEventListener('click', (event) => { this._handleLikeClick(event); this._handleLikeApi(this._data, this._likeAmount);});

        this._deleteButton.addEventListener('click', () => { this._openDeleteCardPopup(this._element, this._data); })
    }

    _handleLikeClick(event) {
        event.target.classList.toggle('photo-cards__like-button_active');
    }

    _handleDeleteButton() {


    }
}

export { Card }