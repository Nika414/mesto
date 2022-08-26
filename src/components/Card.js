class Card {
    constructor(data, cardSelector, handleCardClick, openDeleteCardPopup, handleLikeApi, userId) {
        this.data = data;
        this._name = data.name;
        this._userId = userId;
        this._link = data.link;
        this._likes = data.likes.length;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;
        this._openDeleteCardPopup = openDeleteCardPopup;
        this._handleLikeApi = handleLikeApi;
        this._activeLikeSelector = 'photo-cards__like-button_active';
    }

    _handlePrimaryLikeStatus() {
        const status = this.data.likes.some((el) => {
            return (el._id === this._userId);
        });
        if (status) {
            this._likeButton.classList.add(this._activeLikeSelector);
        }
        else {
            this._likeButton.classList.remove(this._activeLikeSelector);
        }
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
        this._handlePrimaryLikeStatus();
        this._imageTitle = this._element.querySelector('.photo-cards__photo-title');
        this.likeAmount = this._element.querySelector('.photo-cards__like-amount');
        this._deleteButton = this._element.querySelector('.photo-cards__bin');
        this._setEventListeners();
        this._cardImage.src = this._link;
        this._cardImage.alt = this._name;
        this._imageTitle.textContent = this._name;
        this.likeAmount.textContent = this._likes;
        if (idIsTrue === true) {
            return this._element;
        }
        else {
            this._deleteButton.classList.add('photo-cards__bin_inactive');
            return this._element;
        }
    }

    delete() {
        this._element.remove();
    }

    toggleLike(event) {
        event.target.classList.toggle(this._activeLikeSelector);
    }
    
    updateData(newData) {
        this.data = newData;
    }

    _setEventListeners() {
        this._cardImage.addEventListener('click', () => { this._handleCardClick(this.data); });
        this._likeButton.addEventListener('click', (event) => { this._handleLikeApi(this, event); });
        this._deleteButton.addEventListener('click', () => { this._openDeleteCardPopup(this); });
    }


}

export { Card };