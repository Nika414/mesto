import { Popup } from './Popup.js'

class PopupWithImage extends Popup {
    constructor(popup) {
        super(popup);
        this._popupPhoto = this._popup.querySelector('.popup__full-photo');
        this._popupDescription = this._popup.querySelector('.popup__full-photo-description');

    }

    openPopup(data) {

        this._popupPhoto.src = data.link;
        this._popupPhoto.alt = data.placename;
        this._popupDescription.textContent = data.placename;
        super.openPopup();
    }
}

export { PopupWithImage }