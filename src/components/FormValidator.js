export default class FormValidator {
    constructor(
        {
            popupInputSelector,
            popupButtonSelector,
            popupInputErrorActive,
            popupButtonInactive,
            popupInputErrorSelector,
        },
        form
    ) {
        this._form = form
        this._popupInputs = Array.from(
            this._form.querySelectorAll(popupInputSelector)
        )
        this._popupButton = this._form.querySelector(popupButtonSelector)
        this._popupErrorActive = popupInputErrorActive
        this._popupBtnInactive = popupButtonInactive
        this._popupInputErrorsList = this._form.querySelectorAll(popupInputErrorSelector)
    }

    enableValidation() {
        this._setEventListeners()
    }

    _setEventListeners() {
        this._popupInputs.forEach((input) => {
            input.addEventListener('input', (evt) => {
                this._checkInputValidity(evt.target)
                if (this._checkAllInputsValidity(this._popupInputs)) {
                    this.disableSubmitButton()
                } else {
                    this._enableSubmitButton()
                }
            })
        })
    }

    _checkInputValidity = (checkingInput) => {
        const errorMessageSpan = this._form.querySelector(
            `#error-${checkingInput.id}`
        )
        const errorMessage = checkingInput.validationMessage

        if (checkingInput.validity.valid) {
            this._hideValidationError(errorMessageSpan)
        } else {
            this._showValidationError(errorMessageSpan, errorMessage)
        }
    }

    _showValidationError = (errorMessageSpan, errorMessage) => {
        errorMessageSpan.textContent = errorMessage
        errorMessageSpan.classList.add(this._popupErrorActive)
    }

    _hideValidationError = (errorMessageSpan) => {
        errorMessageSpan.textContent = ''
        errorMessageSpan.classList.remove(this._popupErrorActive)
    }

    hideAllValidationErrors() {
        this._popupInputErrorsList.forEach((item) => {
            this._hideValidationError(item)
        })
    }

    _checkAllInputsValidity = (inputsList) => {
        return inputsList.some((input) => {
            return !input.validity.valid
        })
    }

    disableSubmitButton = () => {
        this._popupButton.classList.add(this._popupBtnInactive)
        this._popupButton.disabled = true
    }

    _enableSubmitButton = () => {
        this._popupButton.classList.remove(this._popupBtnInactive)
        this._popupButton.disabled = false
    }
}
