export const popupProfile = document.querySelector(".popup__profile");
export const profileName = document.querySelector(".profile__name");
export const profileInfo = document.querySelector(".profile__info");
export const btnEditProfile = popupProfile.querySelector(".popup__button");
export const profileAvatar = document.querySelector(".profile__avatar");
export const popupCard = document.querySelector(".popup__card");
export const btnAddCard = popupCard.querySelector(".popup__button");
export const popupImage = document.querySelector(".popup__open-img");
export const popupPicture = popupImage.querySelector(".popup__image");
export const popupPictureCaption = popupImage.querySelector(".popup__title-image");
export const cardTemplate = document.querySelector(".template__card").content;
export const cardListSection = ".card__list";
export const popupAvatar = document.querySelector(".popup__avatar");
export const btnSaveAvatar = popupAvatar.querySelector(".popup__button");
export const formProfileElement = document.forms.formProfile;
export const nameInput = document.forms.formProfile.nameProfile;
export const jobInput = document.forms.formProfile.professionProfile;
export const formCardElement = document.forms.formCard;
export const cardName = document.forms.formCard.cardName;
export const cardImage = document.forms.formCard.cardImage;
export const formAvatarElement = document.forms.formAvatar;
export const avatarInput = document.forms.formAvatar.avatar;
export let userId = null;

export const formsElementsSelectors = {
  popupInputSelector: '.popup__input',
  popupInputErrorSelector: '.popup__input-error',
  popupButtonSelector: '.popup__button'
}


export const fetchParams = {
  baseUrl: "https://nomoreparties.co/v1/plus-cohort-9",
  headers: {
    Authorization: "0ce4a23a-1bec-4586-80d1-c87f648e62fc",
    "Content-Type": "application/json",
  },
};