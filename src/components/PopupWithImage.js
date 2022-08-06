import { Popup } from './Popup.js'

class PopupWithImage extends Popup {
    constructor(popup) {
        super(popup);
        
    }

    openPopup(data) {

        this._popup.querySelector('.popup__full-photo').src = data.link;
        this._popup.querySelector('.popup__full-photo').alt = data.placename;
        this._popup.querySelector('.popup__full-photo-description').textContent = data.placename;
        super.openPopup();
    }
}

export { PopupWithImage }