import { Popup } from './Popup.js'

class PopupForDelete extends Popup {
    constructor(popup) {
        super(popup);
        this._deleteButton = this._popup.querySelector('.popup__delete-button');
        this._card = card;
    }

    openPopup() {
        super.openPopup();
    }

    setEventListeners() {
        super.setEventListeners()
        
    };
}

export { PopupForDelete }