import Popup from './Popup'

export default class PopupWithForm extends Popup {
    constructor(popupElement, submitApiMethod) {
        super(popupElement)

        this._submitApiMethod = submitApiMethod
        this._button = this._popupElement.querySelector('.popup__button')
        this._popupForm = this._popupElement.querySelector('.popup__form')
        this._formInputsList =
            this._popupElement.querySelectorAll('.popup__input')
    }

    setEventListeners() {
        super.setEventListeners()

        this._popupElement.addEventListener('submit', (evt) => {
            evt.preventDefault()

            this.renderLoading()

            this._submitApiMethod(this._getInputsValues())
        })
    }

    renderLoading() {
        this._button.textContent = 'Сохранить...'
    }

    close() {
        this._popupForm.reset()
        super.close()
    }

    // open() {
    //     this._button.classList.add('popup__button_inactive')
    //     this._button.disabled = true
    //     super.open()
    // }

    _getInputsValues() {
        this._formInputsValues = {}

        this._formInputsList.forEach((input) => {
            this._formInputsValues[input.name] = input.value
        })

        return this._formInputsValues
    }
}
