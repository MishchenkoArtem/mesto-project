const popupProfile = document.querySelector('.popup_type_profile');
const popupCard = document.querySelector('.popup_type_card');
const cardTemplate = document.querySelector('.template__card').content;
const cardList = document.querySelector('.grid__list');

function openPopup(popup) {
	popup.classList.remove('popup_type_profile');
	popup.classList.remove('popup_type_card');
}

function closePopup(popup) {
	popup.classList.add('popup_type_profile');
	popup.classList.add('popup_type_card');
}

document.querySelector('.profile__edit-button').addEventListener('click', function() {
	openPopup(popupProfile);
});

popupProfile.querySelector('.popup__close').addEventListener('click', function() {
	closePopup(popupProfile);
});

document.querySelector('.profile__add-button').addEventListener('click', function() {
	openPopup(popupCard);
});

popupCard.querySelector('.popup__close').addEventListener('click', function() {
	closePopup(popupCard);
});

const formProfileElement = popupProfile.querySelector('.popup__form');
const nameInput = formProfileElement.querySelector('#profile_name');
const jobInput = formProfileElement.querySelector('#profile_about-me');

function formSubmitHandler(evt) {
	evt.preventDefault();

	jobInput.value;
	nameInput.value;

	const profileName = document.querySelector('.profile__name');
	const profileInfo = document.querySelector('.profile__info');

	profileName.textContent = nameInput.value;
	profileInfo.textContent = jobInput.value;

	closePopup(popupProfile);
	nameInput.value = '';
	jobInput.value = '';
}

formProfileElement.addEventListener('submit', formSubmitHandler);

const handleCardLikeClick = (event) => {
	event.target.classList.toggle('grid__list-heart_type_active');
};

const handleCardRemoveClick = (event) => {
	event.target.closest('.grid__list-background').remove();
};

const initialCards = [{
	name: 'Архыз',
	link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
}, {
	name: 'Челябинская область',
	link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
}, {
	name: 'Иваново',
	link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
}, {
	name: 'Камчатка',
	link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
}, {
	name: 'Холмогорский район',
	link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
}, {
	name: 'Байкал',
	link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
}];

initialCards.forEach((item) => {
	cardList.prepend(cardCreate(item.name, item.link));
});

const cardRender = (cardList, cardElement) => {
	cardList.prepend(cardElement);
};

const cardForm = popupCard.querySelector('.popup__form').addEventListener('submit', function(evt) {
	evt.preventDefault();

	cardRender(cardList, cardCreate);
	closePopup(popupCard);
});

console.log(cardForm);

function cardCreate(title, link) {
	const cardElement = cardTemplate.querySelector('.grid__list-background').cloneNode(true);

	cardElement.querySelector('.grid__list-heading').textContent = title;
	const cardImage = cardElement.querySelector('.grid__list-image');

	cardImage.src = link;
	cardImage.alt = title;

	cardElement.querySelector('.grid__list-heart').addEventListener('click', handleCardLikeClick);
	cardElement.querySelector('.grid__delete-card').addEventListener('click', handleCardRemoveClick);

	return cardElement;
}