const popupProfile = document.querySelector('.popup__profile');
const profileName = document.querySelector('.profile__name');
const profileInfo = document.querySelector('.profile__info');
const popupCard = document.querySelector('.popup__card');
const popupImage = document.querySelector('.popup__open-img');
const cardTemplate = document.querySelector('.template__card').content;
const cardList = document.querySelector('.card__list');
const formProfileElement = document.forms.formProfile;
const nameInput = document.forms.formProfile.nameProfile;
const jobInput = document.forms.formProfile.professionProfile;

function openPopup (popup) {
	popup.classList.add('popup_opened');
};

function closePopup (popup) {
	popup.classList.remove('popup_opened');
};

document.querySelector('.profile__edit-button').addEventListener('click', () => {
	nameInput.value =  '';
  	jobInput.value = '';
	openPopup(popupProfile);
});

popupProfile.querySelector('.popup__close').addEventListener('click', (event) => {
	closePopup(popupProfile);
});

document.querySelector('.profile__add-button').addEventListener('click', () => {
	openPopup(popupCard);
});

popupCard.querySelector('.popup__close').addEventListener('click', () => {
	closePopup(popupCard);
});

popupImage.querySelector('.popup__close').addEventListener('click', () => {
	closePopup(popupImage);
});

const popupList = Array.from(document.querySelectorAll('.popup'));

popupList.forEach((popup) => {
	popup.addEventListener('click', (evt) => {
		if (evt.target.classList.contains('popup')) {
			closePopup(popup);
		}
	});
	document.body.addEventListener('keydown', (evt) => {
		if (evt.key === 'Escape') {
			closePopup(popup);
		}
	});
});

function editForm(evt) {
	evt.preventDefault();

	profileName.textContent = nameInput.value;
	profileInfo.textContent = jobInput.value;

	closePopup(popupProfile);
}

formProfileElement.addEventListener('submit', editForm);

const handleCardLikeClick = (event) => {
	event.target.classList.toggle('card__heart_type_active');
};

const handleCardRemoveClick = (event) => {
	event.target.closest('.card__background').remove();
};

// Карточки
const initialCards = [{
	name: 'Архыз',
	link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
}, {
	name: 'Челябинская область',
	link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
}, {
	name: 'Иваново',
	link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
}, {
	name: 'Камчатка',
	link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
}, {
	name: 'Холмогорский район',
	link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
}, {
	name: 'Байкал',
	link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
}];

initialCards.forEach((item) => {
	cardList.prepend(createCard(item.name, item.link));
});

function createCard(title, link) {
	const cardElement = cardTemplate.querySelector('.card__background').cloneNode(true);

	cardElement.querySelector('.card__heading').textContent = title;
	const cardImage = cardElement.querySelector('.card__image');
	

	cardImage.src = link;
	cardImage.alt = title;
	cardImage.addEventListener('click', function(event) {
		popupImage.querySelector('.popup__image').src = event.target.src;
		popupImage.querySelector('.popup__image').alt = event.target.alt;
		popupImage.querySelector('.popup__title-image').textContent = event.target.closest('.card__background').querySelector('.card__heading').textContent;
		openPopup(popupImage);
	});
	cardElement.querySelector('.card__heart').addEventListener('click', handleCardLikeClick);
	cardElement.querySelector('.card__delete').addEventListener('click', handleCardRemoveClick);

	return cardElement;
}

const renderCard = (cardList, cardElement) => {
	cardList.prepend(cardElement);
};

const cardForm = popupCard.querySelector('.popup__form').addEventListener('submit', function(evt) {
	evt.preventDefault();

	const title = popupCard.querySelector('#card_name').value;
	const link = popupCard.querySelector('#card_image').value;

	renderCard(cardList, createCard(title, link));
	
	popupCard.querySelector('#card_name').value = '';
	popupCard.querySelector('#card_image').value = '';

	closePopup(popupCard);
});

// Валидация формы

const validationConfig = {
	formSelector: '.popup__form',
	inputSelector: '.popup__input',
	inputInvalidClass: 'popup__input_type_error',
	errorClass: 'popup__input-error_active',
	buttonSelector: '.popup__button',
	buttonDisabledClass: 'popup__button_inactive',
};

const showInputError = (inputElement, inputInvalidClass, errorElement, errorClass, errorMessage) => {
	inputElement.classList.add(inputInvalidClass);
	errorElement.classList.add(errorClass);
	errorElement.textContent = errorMessage;
};

const hideInputError = (inputElement, inputInvalidClass, errorElement, errorClass) => {
	inputElement.classList.remove(inputInvalidClass);
	errorElement.classList.remove(errorClass);
	errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement, inputInvalidClass, errorClass) => {
	const errorElement = formElement.querySelector(`#error-${inputElement.id}`);

	if (inputElement.validity.valid) {
		hideInputError(inputElement, inputInvalidClass, errorElement, errorClass);
	} else {
		showInputError(inputElement, inputInvalidClass, errorElement, errorClass, inputElement.validationMessage);
	};
};

const hasInvalidInput = (inputList) => {
	return inputList.some(inputElement => {
		return !inputElement.validity.valid;
	});
};

const disableButton = (buttonElement, buttonDisabledClass) => {
	buttonElement.classList.add(buttonDisabledClass);
	buttonElement.disabled = true;
};

const enableButton = (buttonElement, buttonDisabledClass) => {
	buttonElement.classList.remove(buttonDisabledClass);
	buttonElement.disabled = false;
};

const toggleButtonState = (formElement, inputList, buttonSelector, buttonDisabledClass) => {
	const buttonElement = formElement.querySelector(buttonSelector);

	if (hasInvalidInput(inputList)) {
		disableButton(buttonElement, buttonDisabledClass);
	} else {
		enableButton(buttonElement, buttonDisabledClass);
	};
};

const setEventListeners = (formElement, { inputSelector, inputInvalidClass, errorClass, buttonSelector, buttonDisabledClass }) => {
	const inputList = Array.from(formElement.querySelectorAll(inputSelector));
	
	inputList.forEach(inputElement => {
		inputElement.addEventListener('input', () => {
			checkInputValidity(formElement, inputElement, inputInvalidClass, errorClass);
			toggleButtonState(formElement, inputList, buttonSelector, buttonDisabledClass);
		});
	});

	toggleButtonState(formElement, inputList, buttonSelector, buttonDisabledClass);
};

const enableValidation = ({formSelector, ...rest}) => {
	const formList = Array.from(document.querySelectorAll(formSelector));
	
	formList.forEach(formElement => {
		formElement.addEventListener('submit', (event) => {
			event.preventDefault();
		});

		setEventListeners(formElement, rest);
	});
};

enableValidation(validationConfig);