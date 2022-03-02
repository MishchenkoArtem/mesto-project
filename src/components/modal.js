import { avatarUpdate, profileUpdate } from "./api.js";
import {
  avatarInput,
  btnEditProfile,
  btnSaveAvatar,
  formAvatarElement,
  jobInput,
  nameInput,
  popupAvatar,
  popupProfile,
  profileAvatar,
  profileInfo,
  profileName,
} from "./constants.js";
import { closePopup } from "./utils.js";

export function editForm(e) {
  e.preventDefault();
  btnEditProfile.textContent = "Сохранение...";
  profileUpdate(nameInput.value, jobInput.value)
    .then(() => {
      profileName.textContent = nameInput.value;
      profileInfo.textContent = jobInput.value;
      closePopup(popupProfile);
    })
    .catch((err) => console.log(err))
    .finally(() => {
      btnEditProfile.textContent = "Сохранить";
    });
}

export function changeAvatar(e) {
  e.preventDefault();

  btnSaveAvatar.textContent = "Сохранение...";
  avatarUpdate(avatarInput.value)
    .then(() => {
      profileAvatar.src = avatarInput.value;
      formAvatarElement.reset();
      btnSaveAvatar.classList.add("popup__button_inactive");
      btnSaveAvatar.setAttribute("disabled", true);
      closePopup(popupAvatar);
    })
    .catch((err) => console.log(err))
    .finally(() => {
      btnSaveAvatar.textContent = "Сохранить";
    });
}
