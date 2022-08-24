import { Popup } from './Popup.js'

class PopupWithConfirmation extends Popup {
    constructor(popup, handleDeleteButtonClick) {
        super(popup);
        this._handleDeleteButtonClick = handleDeleteButtonClick;
    }

    openPopup(card) {
        this._card = card;
        super.openPopup();
    }

    setEventListeners() {
        super.setEventListeners();
        this._deleteButton = this._popup.querySelector('.popup__delete-button');
        this._deleteButton.addEventListener('click', (evt) => {
            evt.preventDefault();
            this._handleDeleteButtonClick(this._card)
        })
    };
}

export { PopupWithConfirmation }