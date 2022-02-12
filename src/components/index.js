import '../pages/index.css';
export const popupProfile = document.querySelector('.popup__profile');
export const profileName = document.querySelector('.profile__name');
export const profileInfo = document.querySelector('.profile__info');
export const popupCard = document.querySelector('.popup__card');
export const btnAddCard = popupCard.querySelector('.popup__button');
export const popupImage = document.querySelector('.popup__open-img');
export const popupPicture = popupImage.querySelector('.popup__image');
export const popupPictureCaption = popupImage.querySelector('.popup__title-image');
export const cardTemplate = document.querySelector('.template__card').content;
export const cardList = document.querySelector('.card__list');
export const formProfileElement = document.forms.formProfile;
export const nameInput = document.forms.formProfile.nameProfile;
export const jobInput = document.forms.formProfile.professionProfile;
export const formCardElement = document.forms.formCard;
export const cardName = document.forms.formCard.cardName;
export const cardImage = document.forms.formCard.cardImage;

import { editForm } from './modal.js';

import { initialCards, createCard, createAddCard } from './card.js';

import { validationConfig, enableValidation } from './validate.js';

import { openPopup, closePopup } from './utils.js';

document.querySelector('.profile__edit-button').addEventListener('click', () => {
	nameInput.value = profileName.textContent
	jobInput.value = profileInfo.textContent
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

popupCard.querySelector('.popup__form').addEventListener('submit', createAddCard)

enableValidation(validationConfig);

const config = {
    baseUrl: 'https://nomoreparties.co/v1/plus-cohort-6',
    headers: {
      Authorization: '6d1f8b51-2184-4b24-a74b-b837295f6bd4',
      'Content-Type': 'application/json'
    }
};
  
const getResponseData = (res) => {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
};

