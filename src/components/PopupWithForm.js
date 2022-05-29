import Popup from "./Popup";

export default class PopupWithForm extends Popup {
    constructor(popupSelector, submitApiMethod) {
        super(popupSelector);
        this._submitApiMethod = submitApiMethod;
        this._button = this._popupSelector.querySelector('.popup__button');
    }

    setEventListeners() {
        super.setEventListeners();

        this._popupSelector.addEventListener('submit', (evt) => {
            this._button.textContent = 'Сохранить...'
            evt.preventDefault();
            
            this._submitApiMethod(this._getInputsValues());
            this.close();
        })
    }

    close() {
        this._popupSelector.querySelector('.popup__form').reset();
        super.close();
        
    }

    open(){
        this._button.classList.add('popup__button_inactive');
        this._button.disabled = true;
        super.open();
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