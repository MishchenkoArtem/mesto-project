import { cardTemplate,
        popupCard,
        cardList,
        popupImage } 
        from './index.js';

import { closePopup,
        openPopup } 
        from './modal.js';

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
		popupImage.querySelector('.popup__image').src = event.target.src;
		popupImage.querySelector('.popup__image').alt = event.target.alt;
		popupImage.querySelector('.popup__title-image').textContent = event.target.closest('.card__background').querySelector('.card__heading').textContent;
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

    const title = popupCard.querySelector('#card_name').value;
    const link = popupCard.querySelector('#card_image').value;

    renderCard(cardList, createCard(title, link));
    
    popupCard.querySelector('#card_name').value = '';
    popupCard.querySelector('#card_image').value = '';

    closePopup(popupCard);
};