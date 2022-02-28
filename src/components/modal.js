import { avatarUpdate, profileUpdate } from './api.js';
import { avatarInput, btnSaveAvatar, formAvatarElement, jobInput, nameInput, popupAvatar, popupProfile, profileInfo, profileName } from './constants.js';
import { closePopup } from './utils.js';

export function editForm (e) {
	e.preventDefault();

	profileName.textContent = nameInput.value;
	profileInfo.textContent = jobInput.value;

	profileUpdate(nameInput.value, jobInput.value);

	closePopup(popupProfile);
}

export function changeAvatar(e) {
	e.preventDefault();

	const avatar = document.querySelector('.profile__avatar');
	avatar.src = avatarInput.value;
	btnSaveAvatar.textContent = 'Сохранение...';
	avatarUpdate(avatarInput.value)
		.then(() => {
	  		formAvatarElement.reset();
	  		btnSaveAvatar.classList.add('popup__button_inactive')
	  		btnSaveAvatar.setAttribute('disabled', true);
	  		closePopup(popupAvatar);
	})
		.catch(err => console.log(err))
		.finally(() => {
			btnSaveAvatar.textContent = 'Сохранить';
		})
}