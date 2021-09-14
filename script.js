const profileEditButton = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');

function popupOpened () {
    popup.classList.remove('popup_opened');
}

function popupClose () {
    popup.classList.add('popup_opened');
}

profileEditButton.addEventListener('click', function () {
    popupOpened(popup);
});

popup.addEventListener('click', function (event) {
    if (event.target.classList.contains('popup__close') || (event.target.classList.contains('popup'))) {
        popupClose(popup);
    }
})