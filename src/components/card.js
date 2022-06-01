export default class Card {
  constructor(data, selector, likeCardCallBack, dislikeCardCallback, deleteCardCallback, userId, { cardLikeActiveSelector,
    cardDeleteVisibleSelector,
    cardContainerSelector
  }, openCardImagePopup) {
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._owner = data.owner;
    this._userId = userId;
    this._selector = selector;
    this._cardId = data._id;
    this._likeCardCallback = likeCardCallBack;
    this._dislikeCardCallback = dislikeCardCallback;
    this._deleteCardCallback = deleteCardCallback;
    this._cardLikeActiveSelector = cardLikeActiveSelector;
    this._cardDeleteVisibleSelector = cardDeleteVisibleSelector;
    this._cardContainerSelector = cardContainerSelector;
    this._openCardImagePopup = openCardImagePopup;
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
    this._isDeleteAllowed();
    this._setEventListener();
    return this._element;
  }

  _setEventListener() {
    this._cardLike.addEventListener('click', () => {
      this._handleLikeClick();
    });

    this._cardDelete.addEventListener('click', (evt) => {
      this._handleDeleteCard(evt);

    });

    this._cardImage.addEventListener('click', (evt) => {
      this._openCardImagePopup.open(evt);
    });
  }

  _handleLikeClick() {
    if (this._cardLike.classList.contains(this._cardLikeActiveSelector)) {
      this._cardLike.classList.remove(this._cardLikeActiveSelector);
      this._dislikeCardCallback(this._cardId)
        .then(res => this._cardCounter.textContent = res.likes.length)
    } else {
      this._cardLike.classList.add(this._cardLikeActiveSelector);
      this._likeCardCallback(this._cardId)
        .then(res => this._cardCounter.textContent = res.likes.length)
    }
  }

  _isLiked = (likesArr) => {
    this._cardCounter.textContent = this._likes.length.toString();
    if (likesArr.length < 1) return false
    likesArr.forEach((like) => {
      if (like._id === this._userId) this._cardLike.classList.add(this._cardLikeActiveSelector)
      return false
    });
  }

  _isDeleteAllowed() {
    if (this._owner._id !== this._userId) this._cardDelete.classList.add(this._cardDeleteVisibleSelector);
  }

  _handleDeleteCard(evt) {
    this._deleteCardCallback(this._cardId)
      .then(res => evt.target.closest(`.${this._cardContainerSelector}`).remove());
  }
}