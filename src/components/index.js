import '../pages/index.css';
import { changeAvatar, editForm } from './modal.js';
import { createCard } from './card.js';
import { validationConfig, enableValidation } from './validate.js';
import { openPopup, closePopup } from './utils.js';
import { cardList, formAvatarElement, formProfileElement, jobInput, nameInput, popupAvatar, popupCard, popupImage, popupProfile, profileInfo, profileName } from './constants';
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

document.querySelector('.profile__edit-avatar').addEventListener('click', () => {
	openPopup(popupAvatar);
});

popupAvatar.querySelector('.popup__close').addEventListener('click', () => {
	closePopup(popupAvatar);
});

formProfileElement.addEventListener('submit', editForm);

formAvatarElement.addEventListener('submit', changeAvatar);

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

enableValidation(validationConfig);