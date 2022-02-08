const popupList = Array.from(document.querySelectorAll('.popup'));

import { profileName, 
		profileInfo,
		nameInput,
		jobInput,
		popupProfile,
		formProfileElement } 
		from './index.js';

export function openPopup (popup) {
	popup.classList.add('popup_opened');
	document.addEventListener('keydown', handlClosePopupClick);
};

export function closePopup (popup) {
	popup.classList.remove('popup_opened');
	document.removeEventListener('keydown', handlClosePopupClick);
};

function handlClosePopupClick (event) {
	const activePopup = document.querySelector('.popup_opened');
  	if (activePopup && event.key === 'Escape') { 
    	closePopup(activePopup);
  	}
}

popupList.forEach((popup) => {
	popup.addEventListener('click', (evt) => {
		if (evt.target.classList.contains('popup')) {
			closePopup(popup);
		}
	});
});

export function editForm (event) {
	event.preventDefault();

	profileName.textContent = nameInput.value;
	profileInfo.textContent = jobInput.value;

	closePopup(popupProfile);
}