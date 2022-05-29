import "../pages/index.css";
import Api from "../components/Api";
import Section from "../components/Section";
import Card from '../components/Card.js'
import { cardListSection, fetchParams, profileAvatar, profileInfo, profileName, btnSaveAvatar} from "../components/constants";

const api = new Api(fetchParams);

const addCards = new Section(
  item => {
    const cards = new Card(item, '.template__card');
    const cardElement = cards.generate()
    addCards.setItem(cardElement);
  }, cardListSection);

api
  .getAppInfo()
  .then(res => {
    const [{ name, about, avatar }, cardData] = res;

    profileName.textContent = name;
    profileInfo.textContent = about;
    profileAvatar.src = avatar;
    
    addCards.renderItem(cardData);
  });

// -----------------------------------------------------Блок работы с popups
// Импорты

import PopupWithImage from "../components/PopupWithImage";
import PopupWithForm from "../components/PopupWithForm";
import FormValidator from "../components/FormValidator";

import {popupCard, popupProfile, popupAvatar, formsElementsSelectors} from "../components/constants";

//  Попап открытия картинки
export const openCardImagePopup = new PopupWithImage('.popup__open-img');
openCardImagePopup.setEventListeners();

//  Попап с формой создания карточки
export const createCardPopup = new PopupWithForm('.popup__card', (inputsValues) => {
  api
    .newPostCard(inputsValues)
    .then(res => {
      addCards.renderItem(res);
    })
    .catch((err) => console.log(err))
    .finally(() => {
      btnSaveAvatar.textContent = "Сохранить";
    });
});
createCardPopup.setEventListeners();

document.querySelector(".profile__add-button").addEventListener("click", () => {
    createCardPopup.open();
});

const createCardPopupValidation = new FormValidator(formsElementsSelectors, popupCard);
createCardPopupValidation.enableValidation();

// Попап редактирования аватара
export const modifyAvatarPopup = new PopupWithForm('.popup__avatar', (inputsValues) => {
  api
    .avatarUpdate(inputsValues)
    .then(res => {
      profileAvatar.src = res.avatar;
    })
    .catch((err) => console.log(err))
    .finally(() => {
      btnSaveAvatar.textContent = "Сохранить";
    });
});
modifyAvatarPopup.setEventListeners();

document.querySelector(".profile__edit-avatar").addEventListener("click", () => {
    modifyAvatarPopup.open();
});

const modifyAvatarPopupValidation = new FormValidator(formsElementsSelectors, popupAvatar);
modifyAvatarPopupValidation.enableValidation();

//  Попап с формой редактирования профиля
export const modifyProfilePopup = new PopupWithForm('.popup__profile', (inputsValues) => {
  api
    .profileUpdate(inputsValues)
    .then(res => {
      profileName.textContent = res.name;
      profileInfo.textContent = res.about;
    })
    .catch((err) => console.log(err))
    .finally(() => {
      btnSaveAvatar.textContent = "Сохранить";
    });
});
modifyProfilePopup.setEventListeners();

document.querySelector(".profile__edit-button").addEventListener("click", () => {
    modifyProfilePopup.open();
});

const modifyProfilePopupValidation = new FormValidator(formsElementsSelectors, popupProfile);
modifyProfilePopupValidation.enableValidation();