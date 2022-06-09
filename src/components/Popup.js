export default class Popup {
    constructor(popupElement) {
        this._popupElement = document.querySelector(popupElement)
    }

    open() {
        this._popupElement.classList.add('popup_opened')

        document.addEventListener('keydown', this._handleEscClose)
    }

    close() {
        this._popupElement.classList.remove('popup_opened')

        document.removeEventListener('keydown', this._handleEscClose)
    }

    setEventListeners() {
        const closePopupButton =
            this._popupElement.querySelector('.popup__close')
        closePopupButton.addEventListener('click', () => this.close())

        this._popupElement.addEventListener('click', (e) => {
            if (e.currentTarget === e.target) this.close()
        })
    }

    _handleEscClose = (evt) => {
        if (evt.key === 'Escape') {
            this.close()
        }
    }
}
