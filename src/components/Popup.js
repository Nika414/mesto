export class Popup {
    constructor(popup) {
        this._popup = document.querySelector(popup);
    }
    openPopup() {
        this._popup.classList.add('popup_opened');
        document.addEventListener('keyup', (evt) => {
            this._handleEscClose(evt);
        })
    }

    closePopup() {
        this._popup.classList.remove('popup_opened');
        document.removeEventListener('keyup', (evt) => {
            this._handleEscClose(evt);
        })
    }
    _handleEscClose(evt) {
        if (evt.key === "Escape") {
            this.closePopup();
        };
    }
    setEventListeners() {
        this._popup.addEventListener('click', (evt) => {
            if ((evt.target === evt.currentTarget) || (evt.target.classList.contains('popup__close-button'))) {
                this.closePopup();
            }
        })

        this._popup.addEventListener('click', (evt) => {
            this._handleEscClose(evt);
        }
        )
    }

}
