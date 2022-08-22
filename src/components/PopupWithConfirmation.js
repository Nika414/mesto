import { Popup } from './Popup.js'

class PopupWithConfirmation extends Popup {
    constructor(popup, handleDeleteButtonClick) {
        super(popup);
        this._deleteButton = this._popup.querySelector('.popup__delete-button');
        this._handleDeleteButtonClick = handleDeleteButtonClick;

    }

    openPopup() {
        super.openPopup();
    }

    setEventListeners(card, data) {
        super.setEventListeners()
        this._deleteButton.addEventListener('click', (evt) => {
            evt.preventDefault();
            debugger;
            this._handleDeleteButtonClick(card, data)
        })
    };
}

export { PopupWithConfirmation }