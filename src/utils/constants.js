
const config = {
    formSelector: '.popup__form',
    inputSelector: '.popup__form-item',
    submitButtonSelector: '.popup__form-button',
    inactiveButtonClass: 'popup__form-button_inactive',
    inputErrorClass: 'popup__form-item_type_error',
    errorClass: 'popup__form-item-error_active'
}


const options = {
    baseUrl: 'https://nomoreparties.co/v1/cohort-48/',
    headers: {
        authorization: '57ec7329-d2a0-4fe8-b5d3-514e52228cd0',
        "Content-Type": "application/json"
    },
    body: {
    }
}



export { config, options }