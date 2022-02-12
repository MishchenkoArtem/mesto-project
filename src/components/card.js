import { cardTemplate, popupCard, cardList, popupImage, cardName, cardImage, formCardElement, popupPicture, popupPictureCaption, btnAddCard } from './index.js';

import { closePopup, openPopup } from './utils.js';

export const initialCards = [{
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

export const handleCardLikeClick = (event) => {
	event.target.classList.toggle('card__heart_type_active');
};

export const handleCardRemoveClick = (event) => {
	event.target.closest('.card__background').remove();
};

export function createCard (title, link) {
	const cardElement = cardTemplate.querySelector('.card__background').cloneNode(true);

	cardElement.querySelector('.card__heading').textContent = title;
	const cardImage = cardElement.querySelector('.card__image');


	cardImage.src = link;
	cardImage.alt = title;
	cardImage.addEventListener('click', function(event) {
		// popupPicture.src = event.target.src;
		// popupPicture.alt = event.target.alt;
        popupPicture.src = link
        popupPicture.alt = title
        popupPictureCaption.textContent = title
		//popupPictureCaption.textContent = event.target.closest('.card__background').querySelector('.card__heading').textContent;
		openPopup(popupImage);
	});
	cardElement.querySelector('.card__heart').addEventListener('click', handleCardLikeClick);
	cardElement.querySelector('.card__delete').addEventListener('click', handleCardRemoveClick);

	return cardElement;
}

export const renderCard = (cardList, cardElement) => {
    cardList.prepend(cardElement);
};

export function createAddCard (evt) {
    evt.preventDefault();

    const title = cardName.value;
    const link = cardImage.value;

    renderCard(cardList, createCard(title, link));
    
    formCardElement.reset()
    btnAddCard.classList.add('popup__button_inactive')
    closePopup(popupCard);
};