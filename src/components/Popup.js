export default class Popup {
    constructor(popupSelector) {
        this._popupSelector = document.querySelector(popupSelector);
    }

    open() {
        this
            ._popupSelector
            .classList.add("popup_opened");

        document.addEventListener("keydown", this._handleEscClose);
    }

    close() {
        this
            ._popupSelector
            .classList.remove("popup_opened");

        document.removeEventListener("keydown", this._handleEscClose);
    }

    setEventListeners() {
        const closePopupButton = this._popupSelector.querySelector('.popup__close');
        closePopupButton.addEventListener('click', () => this.close());
        
        this._popupSelector.addEventListener('click', (e) => {
            if (e.currentTarget === e.target) this.close();
        });
    }

    _handleEscClose = (evt) => {
        if (evt.key === "Escape") {
            this.close();
        }
    }
}
