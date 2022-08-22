import { Popup } from './Popup.js'

export class PopupWithForm extends Popup {
    constructor(popup, handleFormSubmit) {
        super(popup);
        this._handleFormSubmit = handleFormSubmit;
        this._form = this._popup.querySelector('.popup__form');
        this._inputList = Array.from(this._form.querySelectorAll('.popup__form-item'));
        this._submitButton = this._form.querySelector('.popup__form-button');
        
    }
    _getInputValues() {
        const inputValues = {};
        this._inputList.forEach(input => inputValues[input.name] = input.value);
        return inputValues;
    }
    renderLoading(isLoading, info) {
        if (isLoading) {
          this._submitButton.textContent = info;
        }
        else {this._submitButton.textContent = info;}
      }

    setEventListeners() {
        super.setEventListeners()
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this.renderLoading(true, 'Сохранение...');
            this._handleFormSubmit(this._getInputValues()); 
        })
    };

    

    closePopup() {
        this._form.reset();
        super.closePopup();
    }
    
}