import {openCardImagePopup} from "../pages/index.js";

export default class Card {
  constructor(data, selector, likeCardCallBack, dislikeCardCallback, deleteCardCallback) {
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._owner = data.owner;
    this._selector = selector;
    this._cardId = data._id;
    this._likeCardCallback = likeCardCallBack;
    this._dislikeCardCallback = dislikeCardCallback;
    this._deleteCardCallback = deleteCardCallback;
  }

  _getElement() {
    const cardElement = document
    .querySelector(this._selector)
    .content
    .querySelector('.card__background')
    .cloneNode(true);

    return cardElement;
  }

  generate() {
    this._element = this._getElement();

    this._cardHeading = this._element.querySelector('.card__heading');
    this._cardImage = this._element.querySelector('.card__image');
    this._cardLike = this._element.querySelector('.card__heart');
    this._cardCounter = this._element.querySelector('.card__likes-counter');
    this._cardDelete = this._element.querySelector('.card__delete');
    this._cardImage.src = this._link;
    this._cardHeading.textContent = this._name;

    this._isLiked(this._likes);
    this._setEventListener();
    return this._element;
  }

  _setEventListener() {
    this._cardLike.addEventListener('click', () => {
      this._handleLikeClick();
    });

    this._cardDelete.addEventListener('click', () => {
      this._handleDeleteCard();
    });

    this._cardImage.addEventListener('click', (evt) => {
      openCardImagePopup.open(evt);
    });
  }

  _handleLikeClick() {
    if (this._cardLike.classList.contains('card__heart_type_active')){
      this._cardLike.classList.remove('card__heart_type_active');
      this._dislikeCardCallback(this._cardId)
          .then(res => this._cardCounter.textContent = res.likes.length)
    }else {
      this._cardLike.classList.add('card__heart_type_active');
      console.log(this._cardId);
      this._likeCardCallback(this._cardId)
          .then(res => this._cardCounter.textContent = res.likes.length)
    }
  }

  _isLiked = (likesArr) => {
    this._cardCounter.textContent = this._likes.length.toString();
    if (likesArr.length < 1) return false
    likesArr.forEach((like) => {
        if (like._id === this._owner._id) this._cardLike.classList.add('card__heart_type_active')
      return false
    });
  }

  _isDeleteAllowed() {
    if (this._owner._id !== this._cardId) this._cardDelete.classList.add('')
  }

  _handleDeleteCard(){

  }
}

// ---------------------------------------------------------------------------- Форма создания карточки
// formCardElement.addEventListener("submit", function (e) {
//   e.preventDefault();

//   btnAddCard.textContent = "Сохранение...";
  
//   newPostCard(cardName.value, cardImage.value)
//     .then((cardData) => {
//       renderCard(cardData, cardList, userId);
//       formCard.reset();
//       btnAddCard.classList.add("popup__button_inactive");
//       btnAddCard.setAttribute("disabled", true);
//       closePopup(popupCard);
//     })
//     .catch((err) => {
//       console.log(err);
//     })
//     .finally(() => {
//       btnAddCard.textContent = "Создать";
//     });
// });

// ---------------------------------------------------------------------------- Функция создания карточки
/* export const createCard = ({ name, link, likes, owner: ownerId, _id: idCard }, userId) => {
  
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
  const isOwner = ownerId._id
  if (isOwner === userId) {
    cardDelete.classList.add("card__delete_visible");
  }
  
  // Удаление карточки
  cardDelete.addEventListener("click", () => {
    handleCardRemoveClick(cardElement, cardId);
  });

  return cardElement;
}; */

// ---------------------------------------------------------------------------------Функция отображения карточки
/* function renderCard(cardData, cardList, userId) {
  const cardElement = createCard(cardData, userId);
  cardList.prepend(cardElement);
} */

// ------------------------------------------------------------------------------ Функция добавления и счета лайков
// export const handleCardLikeClick = (cardLike, cardId, cardCounter) => {
//   if (!cardLike.classList.contains("card__heart_type_active")) {
    
//     sendLike(cardId)
//       .then((cardData) => {
//         cardLike.classList.toggle("card__heart_type_active");
//         cardCounter.textContent = cardData.likes.length.toString();
//       })
//       .catch((err) => console.log(err));
//   } else {
//     removeLike(cardId)
//       .then((cardData) => {
//         cardLike.classList.toggle("card__heart_type_active");
//         cardCounter.textContent = cardData.likes.length.toString();
//       })
//       .catch((err) => console.log(err));
//   }
// };

// --------------------------------------------------------------------------------- Функция удаления карточки
// export const handleCardRemoveClick = (cardElement, cardId) => {
//   deleteCard(cardId)
//     .then(() => {
//       cardElement.remove();
//     })
//     .catch((err) => console.log(err));
// };