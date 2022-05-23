import "../pages/index.css";
import Api from "../components/Api.js";
import Section from '../components/Section.js';
import Card from "../components/Card.js";
import { fetchParams, cardList } from "../components/constants.js";

const api = new Api(fetchParams);

api
  .getAppInfo()
  .then(res => {
    const [userData, cardData] = res;
    const cards = new Section({
      data: cardData,
      renderer: item => {
        const card = new Card(item, '.template__card');
        const cardElement = card.generate();
        cards.setItems(cardElement);
      }
    }, cardList )
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

api()
  .then(([user, cards]) => {
    profileName.textContent = user.name;
    profileInfo.textContent = user.about;
    profileAvatar.src = user.avatar;
    
    const initialCards = new Section(
      {
        data: cards,
        renderer: (cardData) => {
          const card = new Card(cardData, ".template__card");
          const cardElement = card.generate();

          initialCards.setItem(cardElement);
        },
      },
      cardList,
    );
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