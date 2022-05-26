import Popup from "./Popup";

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this.imageSettings = this._popupSelector.querySelector('.popup__image');
        this.imageCaption =  this._popupSelector.querySelector('.popup__title-image');
    }

    open(evt){
        super.open();
        this.imageSettings.src = evt.target.src;
        this.imageSettings.all = evt.target.alt;
        this.imageCaption.textContent = evt.target.alt;
    }
}