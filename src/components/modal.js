import { profileName, 
		profileInfo,
		nameInput,
		jobInput,
		popupProfile } 
		from './index.js';

export function openPopup (popup) {
	popup.classList.add('popup_opened');

	const popupList = Array.from(document.querySelectorAll('.popup'));

	popupList.forEach((popup) => {
		popup.addEventListener('click', (evt) => {
			if (evt.target.classList.contains('popup')) {
				closePopup(popup);
			}
		});
		document.body.addEventListener('keydown', (evt) => {
			if (evt.key === 'Escape') {
				closePopup(popup);
			}
		});
	});
};

export function closePopup (popup) {
	popup.classList.remove('popup_opened');
};

export function editForm (event) {
	event.preventDefault();

	profileName.textContent = nameInput.value;
	profileInfo.textContent = jobInput.value;

	closePopup(popupProfile);
}