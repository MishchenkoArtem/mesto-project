import '../pages/index.css';
export const popupProfile = document.querySelector('.popup__profile');
export const profileName = document.querySelector('.profile__name');
export const profileInfo = document.querySelector('.profile__info');
export const popupCard = document.querySelector('.popup__card');
export const popupImage = document.querySelector('.popup__open-img');
export const cardTemplate = document.querySelector('.template__card').content;
export const cardList = document.querySelector('.card__list');
export const formProfileElement = document.forms.formProfile;
export const nameInput = document.forms.formProfile.nameProfile;
export const jobInput = document.forms.formProfile.professionProfile;

import { openPopup,
		closePopup } 
		from '../components/modal.js';

import { initialCards,
		handleCardLikeClick,
		handleCardRemoveClick,
		renderCard,
		createCard,
		artem }
		from '../components/card.js';

import { editForm } 
		from '../components/modal.js';

import { validationConfig, 
		showInputError, 
		hideInputError, 
		checkInputValidity, 
		hasInvalidInput,
		disableButton,
		enableButton,
		toggleButtonState,
		setEventListeners,
		enableValidation } 
		from '../components/validate.js';

document.querySelector('.profile__edit-button').addEventListener('click', () => {
	nameInput.value =  '';
  	jobInput.value = '';
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

formProfileElement.addEventListener('submit', editForm);

initialCards.forEach((item) => {
	cardList.prepend(createCard(item.name, item.link));
});

popupCard.querySelector('.popup__form').addEventListener('submit', artem)

enableValidation(validationConfig);