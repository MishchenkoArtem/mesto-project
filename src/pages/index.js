import "../pages/index.css";
import Api from "../components/Api";
import Section from "../components/Section";
import { cardListSection, fetchParams, profileAvatar, profileInfo, profileName } from "../components/constants";
import { changeAvatar, editForm } from "../components/modal.js";
import { validationConfig, enableValidation } from "../components/validate.js";
import { openPopup, closePopup } from "../components/utils.js";

const api = new Api(fetchParams);

api
  .getAppInfo()
  .then(res => {
    const [{ name, about, avatar }, cardData] = res;

    profileName.textContent = name;
    profileInfo.textContent = about;
    profileAvatar.src = avatar;

    const initialCards = new Section({
      data: cardData
    }, cardListSection)
    initialCards.renderItem();
  })

/* document
  .querySelector(".profile__edit-button")
  .addEventListener("click", () => {
    nameInput.value = profileName.textContent;
    jobInput.value = profileInfo.textContent;
    openPopup(popupProfile);
  });

popupProfile.querySelector(".popup__close").addEventListener("click", () => {
  closePopup(popupProfile);
});

popupCard.querySelector(".popup__close").addEventListener("click", () => {
  closePopup(popupCard);
});

popupImage.querySelector(".popup__close").addEventListener("click", () => {
  closePopup(popupImage);
});

document
  .querySelector(".profile__edit-avatar")
  .addEventListener("click", () => {
    openPopup(popupAvatar);
  });

popupAvatar.querySelector(".popup__close").addEventListener("click", () => {
  closePopup(popupAvatar);
});

formProfileElement.addEventListener("submit", editForm);

formAvatarElement.addEventListener("submit", changeAvatar);

enableValidation(validationConfig); */

// -----------------------------------------------------Блок работы с popups
// Импорты

import PopupWithImage from "../components/PopupWithImage";
import PopupWithForm from "../components/PopupWithForm";

//  Попап открытия картинки
export const openCardImagePopup = new PopupWithImage('.popup__open-img');
openCardImagePopup.setEventListeners();

//  Попап с формой создания карточки
/* export const createCardPopup = new PopupWithForm('.popup__card', (formInputsValues) => {
// КОД АПИ ДОБАВИТЬ!!!!!!!!!!!!!!!!!!!!!!!!!
});
createCardPopup.setEventListeners();

document.querySelector(".profile__add-button").addEventListener("click", () => {
    createCardPopup.open();
});

// Попап редактирования аватара
export const modifyAvatarPopup = new PopupWithImage('.popup__avatar', (formInputsValues) => {
// КОД АПИ ДОБАВИТЬ!!!!!!!!!!!!!!!!!!!!!!!!!
});
modifyAvatarPopup.setEventListeners();

document.querySelector(".profile__edit-avatar").addEventListener("click", () => {
    modifyProfilePopup.open();
});

// Попап с формой редактирования профиля
export const modifyProfilePopup = new PopupWithForm('.popup__profile', (formInputsValues) => {
// КОД АПИ ДОБАВИТЬ!!!!!!!!!!!!!!!!!!!!!!!!!
});
modifyProfilePopup.setEventListeners();

document.querySelector(".profile__edit-button").addEventListener("click", () => {
    modifyProfilePopup.open();
}); */