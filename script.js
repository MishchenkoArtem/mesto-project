const profileEditButton = document.querySelector('.profile__edit-button');
const popupOpened = document.querySelector('.popup_opened');
const popupClose = document.querySelector('.popup__close');

profileEditButton.addEventListener('click', function (){
    popupOpened.classList.remove('popup_opened');
})

popupClose.addEventListener('click', function () {
    popupOpened.classList.add('popup_opened');
})