import '../pages/index.css';
import { editForm } from './modal.js';
import { createCard, createAddCard } from './card.js';
import { validationConfig, enableValidation } from './validate.js';
import { openPopup, closePopup } from './utils.js';
import { cardList, formProfileElement, jobInput, nameInput, popupCard, popupImage, popupProfile, profileInfo, profileName } from './constants';
import { getAppInfo } from './api.js';

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

getAppInfo()
	.then(([user, cards]) => {
    	profileName.textContent = user.name;
    	profileInfo.textContent = user.about;
		const userData = user._id
    	cards.forEach((cardData) => {
      	cardList.prepend(createCard(cardData, userData));
    })
})
  	.catch(err => console.log(err));

popupCard.querySelector('.popup__form').addEventListener('submit', createAddCard)

enableValidation(validationConfig);