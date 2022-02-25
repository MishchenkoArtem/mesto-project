import { deleteCard, newPostCard, removeLike, sendLike } from './api.js';
import { btnAddCard, cardCounter, cardDelete, cardImage, cardLike, cardList, cardName, cardTemplate, formCardElement, popupCard, popupImage, popupPicture, popupPictureCaption } from './constants.js';
import { closePopup, openPopup } from './utils.js';

export const handleCardLikeClick = (cardLike, cardId, cardCounter) => {
	if (!cardLike.classList.contains('card__heart_type_active')) {
        sendLike(cardId)
		.then((cardData) => {
        cardLike.classList.toggle('card__heart_type_active');
        cardCounter.textContent = cardData.likes.length.toString()
        })
        	.catch((err) => {
        	console.log(err)
        });
    } else {
        removeLike(cardId)
		.then((cardData) => {
        cardLike.classList.toggle('card__heart_type_active');
        cardCounter.textContent = cardData.likes.length.toString()
        })
        	.catch((err) => {
        	console.log(err)
        });
    }
};

export const handleCardRemoveClick = (cardElement, cardId) => {
	deleteCard(cardId)
		.then(() => {
			cardElement.remove();
		})
		.catch(err)
};

// export function renderCard (cardList, cardElement) {
//     cardList.prepend(cardElement);
// };

export function createAddCard (cardData, cardList, userId) {
	renderCard(cardData, cardList, userId)
	newPostCard(cardName.value, cardImage.value)
    
    formCardElement.reset()
    btnAddCard.classList.add('popup__button_inactive')
    btnAddCard.setAttribute('disabled', true)
    closePopup(popupCard)
}

function renderCard (cardData, cardList, userId) {
	const cardElement = createCard(cardData, userId)
    cardList.prepend(cardElement)
}

export const createCard = (cardData, UserId) => {
	const cardElement = cardTemplate.querySelector('.card__background').cloneNode(true);

	cardElement.querySelector('.card__heading').textContent = cardData.name;
	const cardImage = cardElement.querySelector('.card__image');

	cardImage.src = cardData.link;
	cardImage.alt = cardData.name;
	cardImage.addEventListener('click', function(e) {
		e.preventDefault()

        popupPicture.src = cardData.link;
        popupPicture.alt = cardData.name;
        popupPictureCaption.textContent = cardData.name;
		openPopup(popupImage);
	});

	cardCounter.textContent = cardData.likes.length.toString();
	const isLiked = Boolean(cardData.likes.find(user => user._id === UserId));
	if (isLiked) {
		cardLike.classList.add('card__heart_type_active');
	} else {
        cardLike.classList.remove('card__heart_type_active');
    }

	const cardId = cardData._id
	cardLike.addEventListener('click', () => {
		console.log('click')
		handleCardLikeClick(cardLike, cardId, cardCounter)
	});

	const isOwner = cardData.owner._id;
    if (cardId === isOwner) {
        cardDelete.classList.add('card__delete_hidden');
    }

  	cardDelete.addEventListener('click', () => {
		console.log('click')
		handleCardRemoveClick(cardElement, cardId)
	});

	return cardElement;
};