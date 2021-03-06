import {
  deleteCard,
  newPostCard,
  removeLike,
  sendLike,
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
  userId
} from "./constants.js";

import {
  closePopup,
  openPopup
} from "./utils.js";

// ---------------------------------------------------------------------------- Форма создания карточки
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

// ---------------------------------------------------------------------------- Функция создания карточки
export const createCard = ({ name, link, likes, owner: ownerId, _id: idCard }, userId) => {
  
  const cardElement = cardTemplate
    .querySelector(".card__background")
    .cloneNode(true);

  cardElement.querySelector(".card__heading").textContent = name;
  const cardImage = cardElement.querySelector(".card__image");
  const cardLike = cardElement.querySelector(".card__heart");
  const cardCounter = cardElement.querySelector(".card__likes-counter");
  const cardDelete = cardElement.querySelector(".card__delete");

  cardImage.src = link;
  cardImage.alt = name;

  cardImage.addEventListener("click", function (e) {
    e.preventDefault();
    popupPicture.src = link;
    popupPicture.alt = name;
    popupPictureCaption.textContent = name;
    openPopup(popupImage);
  });

  // Счетчик лайков карточки
  cardCounter.textContent = likes.length.toString();
  const isLiked = Boolean(likes.find((user) => user._id === userId));
  if (isLiked) {
    cardLike.classList.add("card__heart_type_active");
  } else {
    cardLike.classList.remove("card__heart_type_active");
  }

  // Лайк для карточки
  const cardId = idCard;
  cardLike.addEventListener("click", () => {
    handleCardLikeClick(cardLike, cardId, cardCounter);
  });

  // Добавление корзины для карточки
  const isOwner = ownerId._id;
  if (userId !== isOwner) {
    cardDelete.classList.add("card__delete_visible");
  }
  // Удаление карточки
  cardDelete.addEventListener("click", () => {
    handleCardRemoveClick(cardElement, cardId);
  });

  return cardElement;
};

// ---------------------------------------------------------------------------------Функция отображения карточки
function renderCard(cardData, cardList, userId) {
  console.log(userId);
  const cardElement = createCard(cardData, userId);
  cardList.prepend(cardElement);
}

// ------------------------------------------------------------------------------ Функция добавления и счета лайков 
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

// --------------------------------------------------------------------------------- Функция удаления карточки
export const handleCardRemoveClick = (cardElement, cardId) => {
  deleteCard(cardId)
    .then(() => {
      cardElement.remove();
    })
    .catch((err) => console.log(err));
};