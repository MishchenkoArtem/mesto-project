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

const formElement = popup.querySelector('#profile_form');
const nameInput = formElement.querySelector('#profile_name');
const jobInput = formElement.querySelector('#profile_about-me');

function formSubmitHandler (evt) {
    evt.preventDefault();

nameInput.value;
jobInput.value;

const profileName = document.querySelector('.profile__name');
const profileInfo = document.querySelector('.profile__info');

profileName.textContent = nameInput.value;
profileInfo.textContent = jobInput.value;

nameInput.value = '';
jobInput.value = '';

}

formElement.addEventListener('submit', formSubmitHandler);