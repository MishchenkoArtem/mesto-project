import "../pages/index.css";
import Api from "../components/Api.js";
import Section from '../components/Section.js';
import { fetchParams, cardListSection, profileName, profileInfo, profileAvatar } from "../components/constants.js";

const api = new Api(fetchParams);

api
  .getAppInfo()
  .then(res => {
    const [{name, about, avatar}, cardData] = res;

    profileName.textContent = name;
    profileInfo.textContent = about;
    profileAvatar.src = avatar;

    const cardList = new Section({
      data: cardData
    }, cardListSection);
    cardList.renderItem();
  })
  .catch(err => console.log(err));



























/*
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

document.querySelector(".profile__add-button").addEventListener("click", () => {
  openPopup(popupCard);
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
*/