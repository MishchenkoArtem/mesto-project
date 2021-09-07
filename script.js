const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');
const popupOpened = document.querySelector('.popup_opened');
const popupAddOpened = document.querySelector('.popup__add-opened'); 
const popupClose = document.querySelector('.popup__close');
const popupAddClose = document.querySelector('.popup__add-close');

profileEditButton.addEventListener('click', function (){
    popupOpened.classList.remove('popup_opened');
})

popupClose.addEventListener('click', function () {
    popupOpened.classList.add('popup_opened');
})

profileAddButton.addEventListener('click', function () {
    popupAddOpened.classList.remove('popup__add-opened');
})

popupAddClose.addEventListener('click', function () {
    popupAddOpened.classList.add('popup__add-opened');
})