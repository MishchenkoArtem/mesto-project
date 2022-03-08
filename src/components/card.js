import {
  deleteCard,
  newPostCard,
  removeLike,
  sendLike,
  getAppInfo,
} from "./api.js";

import {
  btnAddCard,
  cardImage,
  cardList,
  cardName,
  cardTemplate,
  formCardElement,
  popupCard,
  popupImage,
  popupPicture,
  popupPictureCaption,
  profileAvatar,
  profileInfo,
  profileName,
} from "./constants.js";

import { closePopup, openPopup } from "./utils.js";

let userId = null;

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
    userId = user._id;
  })
  .catch((err) => console.log(err));

formCardElement.addEventListener("submit", function (e) {
  e.preventDefault();
  btnAddCard.textContent = "Сохранение...";
  newPostCard(cardName.value, cardImage.value)
    .then((cardData) => {
      renderCard(cardData, cardList, userId);
      formCard.reset();
      btnAddCard.classList.add("popup__button_inactive");
      btnAddCard.setAttribute("disabled", true);
      closePopup(popupCard);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      btnAddCard.textContent = "Создать";
    });
});

function renderCard(cardData, cardList, userId) {
  const cardElement = createCard(cardData, userId);
  cardList.prepend(cardElement);
}

export const handleCardLikeClick = (cardLike, cardId, cardCounter) => {
  if (!cardLike.classList.contains("card__heart_type_active")) {
    sendLike(cardId)
      .then((cardData) => {
        cardLike.classList.toggle("card__heart_type_active");
        cardCounter.textContent = cardData.likes.length.toString();
      })
      .catch((err) => console.log(err));
  } else {
    removeLike(cardId)
      .then((cardData) => {
        cardLike.classList.toggle("card__heart_type_active");
        cardCounter.textContent = cardData.likes.length.toString();
      })
      .catch((err) => console.log(err));
  }
};

export const handleCardRemoveClick = (cardElement, cardId) => {
  deleteCard(cardId)
    .then(() => {
      cardElement.remove();
    })
    .catch((err) => console.log(err));
};

export const createCard = (cardData, userId) => {
  const cardElement = cardTemplate
    .querySelector(".card__background")
    .cloneNode(true);
  cardElement.querySelector(".card__heading").textContent = cardData.name;
  const cardImage = cardElement.querySelector(".card__image");
  const cardLike = cardElement.querySelector(".card__heart");
  const cardCounter = cardElement.querySelector(".card__likes-counter");
  const cardDelete = cardElement.querySelector(".card__delete");
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardImage.addEventListener("click", function (e) {
    e.preventDefault();
    popupPicture.src = cardData.link;
    popupPicture.alt = cardData.name;
    popupPictureCaption.textContent = cardData.name;
    openPopup(popupImage);
  });
  cardCounter.textContent = cardData.likes.length.toString();
  const isLiked = Boolean(cardData.likes.find((user) => user._id === userId));
  if (isLiked) {
    cardLike.classList.add("card__heart_type_active");
  } else {
    cardLike.classList.remove("card__heart_type_active");
  }
  const cardId = cardData._id;
  cardLike.addEventListener("click", () => {
    handleCardLikeClick(cardLike, cardId, cardCounter);
  });
  const isOwner = cardData.owner._id;
  if (userId !== isOwner) {
    cardDelete.classList.add("card__delete_visible");
  }
  cardDelete.addEventListener("click", () => {
    handleCardRemoveClick(cardElement, cardId);
  });
  return cardElement;
};
