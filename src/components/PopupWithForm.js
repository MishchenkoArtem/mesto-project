import Popup from "./Popup";

export default class PopupWithForm extends Popup {
    constructor(popupSelector, submitApiMethod) {
        super(popupSelector);
        this._submitApiMethod = submitApiMethod;
    }

    setEventListeners() {
        super.setEventListeners();

        this._popupSelector.addEventListener('submit', (evt) => {
            evt.preventDefault();
            
            this._submitApiMethod(this._getInputsValues());
            this.close();
        })
    }

    close() {
        this._popupSelector.querySelector('.popup__form').reset();
        super.close();
        
    }

    _getInputsValues() {
        this._formInputsList = this._popupSelector.querySelectorAll('.popup__input');
        this._formInputsValues = {};

        this._formInputsList.forEach(input => {
            this._formInputsValues[input.name] = input.value;
        });

        return this._formInputsValues;
    }
}