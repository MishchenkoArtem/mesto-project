export default class FormValidator {
    constructor(data, form) {
        this._form = form;
        this._popupInputs = Array.from(this._form.querySelectorAll(data.popupInputSelector));
        this._popupInputError = this._form.querySelector(data.popupInputErrorSelector);
        this._popupButton = this._form.querySelector(data.popupButtonSelector);
    }

    enableValidation(){
        this._setEventListeners();
    }

    _setEventListeners(){
        this._popupInputs.forEach(input => {
            input.addEventListener('input', (evt) => {
                this._checkInputValidity(evt.target);
                if(this._checkAllInputsValidity(this._popupInputs)){
                    this._disableSubmitButton(this._popupButton);
                }else {
                    this._enableSubmitButton(this._popupButton);
                }
            });
        });
    }

    _checkInputValidity = (checkingInput) => {
        const errorMessageSpan = this._form.querySelector(`#error-${checkingInput.id}`);
        const errorMessage = checkingInput.validationMessage;

        if (checkingInput.validity.valid){
            this._hideValidationError(errorMessageSpan);
        }else{
            this._showValidationError(errorMessageSpan, errorMessage);
        }
    }

    _showValidationError = (errorMessageSpan, errorMessage) => {
        errorMessageSpan.textContent = errorMessage;
        errorMessageSpan.classList.add('popup__input-error_active');
    }

    _hideValidationError = (errorMessageSpan) => {
        errorMessageSpan.textContent = '';
        errorMessageSpan.classList.remove('popup__input-error_active');
    }

    _checkAllInputsValidity = (inputsList) => {
        return inputsList.some((input) => {
            return !input.validity.valid;
        });
    }

    _disableSubmitButton = (button) => {
        button.classList.add('popup__button_inactive');
        button.disabled = true;
    }

    _enableSubmitButton = (button) => {
        button.classList.remove('popup__button_inactive');
        button.disabled = false;
    }
}