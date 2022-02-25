import { profileUpdate } from './api.js';
import { jobInput, nameInput, popupProfile, profileInfo, profileName } from './constants.js';
import { closePopup } from './utils.js';

export function editForm (e) {
	e.preventDefault();

	profileName.textContent = nameInput.value;
	profileInfo.textContent = jobInput.value;

	profileUpdate(nameInput.value, jobInput.value);

	closePopup(popupProfile);
}