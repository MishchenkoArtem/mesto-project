import { profileName, profileInfo, nameInput, jobInput, popupProfile, } from './index.js';

import { closePopup } from './utils.js';

export function editForm (event) {
	event.preventDefault();

	profileName.textContent = nameInput.value;
	profileInfo.textContent = jobInput.value;

	closePopup(popupProfile);
}