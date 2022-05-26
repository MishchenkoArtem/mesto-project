import Popup from "./Popup";

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this.imageSettings = this._popupSelector.querySelector('.popup__image');
        this.imageCaption =  this._popupSelector.querySelector('.popup__title-image');
    }

    open(){
        super.open();
        this.imageSettings.src = '';
        this.imageSettings.all = '';
        this.imageCaption.textContent = '';
    }


}