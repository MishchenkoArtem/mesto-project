import Popup from './Popup'

export default class PopupWithImage extends Popup {
    constructor(popupElement) {
        super(popupElement)
        this.imageSettings = this._popupElement.querySelector('.popup__image')
        this.imageCaption = this._popupElement.querySelector(
            '.popup__title-image'
        )
    }

    open(evt) {
        super.open()
        this.imageSettings.src = evt.target.src
        this.imageSettings.alt = evt.target.alt
        this.imageCaption.textContent = evt.target
            .closest('.card__background')
            .querySelector('.card__heading').textContent
    }
}
