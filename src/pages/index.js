import "../pages/index.css";
import { changeAvatar, editForm } from "./modal.js";
import { createCard } from "./card.js";
import { validationConfig, enableValidation } from "./Validate.js";
import { openPopup, closePopup } from "./utils.js";
import { getAppInfo } from "./api.js";
import {
  formAvatarElement,
  formProfileElement,
  jobInput,
  nameInput,
  popupAvatar,
  popupCard,
  popupImage,
  popupProfile,
  profileInfo,
  profileName,
  profileAvatar,
  cardList,
} from "./constants";

document
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

getAppInfo()
  .then(([user, cards]) => {
    profileName.textContent = user.name;
    profileInfo.textContent = user.about;
    profileAvatar.src = user.avatar;
    const userData = user._id;
    const initialCards = cards;
    initialCards.forEach((cardData) => {
      cardList.prepend(createCard(cardData, userData));
    });
  })
  .catch((err) => console.log(err));

/* getAppInfo()
  .then(([user, cards]) => {
    profileName.textContent = user.name;
    profileInfo.textContent = user.about;
    profileAvatar.src = user.avatar;
    const userData = user._id;
    const arrayCards = cards;
    const initialCards = new Section(
      {
        data: arrayCards,
        renderer: (cardItem) => {
          const card = new Card(cardItem, ".template__card");
          const cardElement = card.generate();

          cardsList.setItem(cardElement);
        },
      },
      arrayCards
    );
  })
  .catch((err) => console.log(err)); */

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

enableValidation(validationConfig);

/*-----------------------------------------------------Блок работы с popups*/
/*Импорты*/
import PopupWithImage from "../components/PopupWithImage";
import PopupWithForm from "../components/PopupWithForm";

/*Попап открытия картинки*/
export const openCardImagePopup = new PopupWithImage('.popup__open-img');
openCardImagePopup.setEventListeners();

/*Попап с формой создания карточки*/
export const createCardPopup = new PopupWithForm('.popup__card', () => {
    /*КОД АПИ ДОБАВИТЬ!!!!!!!!!!!!!!!!!!!!!!!!!*/
});
createCardPopup.setEventListeners();

document.querySelector(".profile__add-button").addEventListener("click", () => {
    createCardPopup.open();
});

/*Попап редактирования аватара*/
export const modifyAvatarPopup = new PopupWithImage('.popup__avatar', () => {
    /*КОД АПИ ДОБАВИТЬ!!!!!!!!!!!!!!!!!!!!!!!!!*/
});
modifyAvatarPopup.setEventListeners();

document.querySelector(".profile__edit-avatar").addEventListener("click", () => {
    modifyProfilePopup.open();
});

/*Попап с формой редактирования профиля*/
export const modifyProfilePopup = new PopupWithForm('.popup__profile', () => {
    /*КОД АПИ ДОБАВИТЬ!!!!!!!!!!!!!!!!!!!!!!!!!*/
});
modifyProfilePopup.setEventListeners();

document.querySelector(".profile__edit-button").addEventListener("click", () => {
    modifyProfilePopup.open();
});