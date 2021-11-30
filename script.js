const popupProfile = document.querySelector('.popup__profile');
const profileName = document.querySelector('.profile__name');
const profileInfo = document.querySelector('.profile__info');
const popupCard = document.querySelector('.popup__card');
const popupImage = document.querySelector('.popup__open-img');
const cardTemplate = document.querySelector('.template__card').content;
const cardList = document.querySelector('.grid__list');

function openPopup (popup) {
	popup.classList.add('popup_opened');
};

function closePopup (popup) {
	popup.classList.remove('popup_opened');
};

document.querySelector('.profile__edit-button').addEventListener('click', () => {
	nameInput.value =  profileName.textContent;
  jobInput.value = profileInfo.textContent;
	openPopup(popupProfile);
});

popupProfile.querySelector('.popup__close').addEventListener('click', () => {
	closePopup(popupProfile);
});

document.querySelector('.profile__add-button').addEventListener('click', () => {
	openPopup(popupCard);
});

popupCard.querySelector('.popup__close').addEventListener('click', () => {
	closePopup(popupCard);
});

popupImage.querySelector('.popup__close').addEventListener('click', () => {
	closePopup(popupImage);
});

// Написать function для popup

const formProfileElement = popupProfile.querySelector('.popup__form');
const nameInput = formProfileElement.querySelector('#profile_name');
const jobInput = formProfileElement.querySelector('#profile_about-me');

function editForm(evt) {
	evt.preventDefault();

	profileName.textContent = nameInput.value;
	profileInfo.textContent = jobInput.value;

	closePopup(popupProfile);
}

formProfileElement.addEventListener('submit', editForm);

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
	cardList.prepend(createCard(item.name, item.link));
});

function createCard(title, link) {
	const cardElement = cardTemplate.querySelector('.grid__list-background').cloneNode(true);

	cardElement.querySelector('.grid__list-heading').textContent = title;
	const cardImage = cardElement.querySelector('.grid__list-image');
	

	cardImage.src = link;
	cardImage.alt = title;
	cardImage.addEventListener('click', function(event) {
		popupImage.querySelector('.popup__image').src = event.target.src;
		popupImage.querySelector('.popup__image').alt = event.target.alt;
		popupImage.querySelector('.popup__title-image').textContent = event.target.closest('.grid__list-background').querySelector('.grid__list-heading').textContent;
		openPopup(popupImage);
	});
	cardElement.querySelector('.grid__list-heart').addEventListener('click', handleCardLikeClick);
	cardElement.querySelector('.grid__delete-card').addEventListener('click', handleCardRemoveClick);

	return cardElement;
}

const renderCard = (cardList, cardElement) => {
	cardList.prepend(cardElement);
};

const cardForm = popupCard.querySelector('.popup__form').addEventListener('submit', function(evt) {
	evt.preventDefault();

	const title = popupCard.querySelector('#card_name').value;
	const link = popupCard.querySelector('#address_image').value;

	renderCard(cardList, createCard(title, link));
	
	popupCard.querySelector('#card_name').value = '';
	popupCard.querySelector('#address_image').value = '';

	closePopup(popupCard);
});