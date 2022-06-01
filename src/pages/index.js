//-------------------------------------------------------------------------------
//-----Импорты
//-------------------------------------------------------------------------------
    //Общие модули
import {assertBoolean} from "@babel/core/lib/config/validation/option-assertions";
import "../pages/index.css";
    //Классы
import PopupWithImage from "../components/PopupWithImage";
import PopupWithForm from "../components/PopupWithForm";
import FormValidator from "../components/FormValidator";
import Api from "../components/Api";
import Section from "../components/Section";
import Card from '../components/Card.js';
import UserInfo from '../components/UserInfo.js'
    //Переменные
import {cardListSection,
        fetchParams,
        profileAvatar,
        profileInfo,
        profileName,
        btnSaveAvatar,
        userInfoSelectorsList,
        nameInput,
        jobInput,
        userId,
        popupCard,
        popupProfile,
        popupAvatar,
  formsElementsSelectors,
  cardsElementsSelectors
} from "../components/constants";
//-------------------------------------------------------------------------------
//-----Создаём экземпляры классов
//-------------------------------------------------------------------------------
    //Класс обращений к серверу
const api = new Api(fetchParams);
    //Класс получения информации о пользователе
const userInfo = new UserInfo(userInfoSelectorsList, () => api.getUser())
    //Универсальный Класс для отрисовки объектов
const addCards = new Section(
    (item, userId) => {
    const cards = new Card(item, '.template__card', (cardId) => api.sendLike(cardId), (cardId) => api.removeLike(cardId), (cardId) => api.deleteCard(cardId), userId, cardsElementsSelectors, openCardImagePopup);
        const cardElement = cards.generate()
        addCards.setItem(cardElement);
  }, cardListSection, () => api.getUser());
//-------------------------------------------------------------------------------
//-----Отрисовываем стартовую страницу
//-------------------------------------------------------------------------------
api
  .getAppInfo()
  .then(res => {
    const [{ name, about, avatar}, cardData] = res;
    profileName.textContent = name;
    profileInfo.textContent = about;
    profileAvatar.src = avatar;
    addCards.renderItem(cardData);
  });
//-------------------------------------------------------------------------------
//-----Настраиваем попапы
//-------------------------------------------------------------------------------
    //Попап открытия картинки
export const openCardImagePopup = new PopupWithImage('.popup__open-img');
openCardImagePopup.setEventListeners();
    //Попап с формой создания карточки
        //создаём класс попапа
export const createCardPopup = new PopupWithForm('.popup__card', (inputsValues) => {
  api
    .newPostCard(inputsValues)
    .then(res => {
      addCards.renderItem(res);
    })
    .catch((err) => console.log(err))
    .finally(() => {
      btnSaveAvatar.textContent = "Сохранить";
      createCardPopup.close();
    });
})
        //вешаем лиссенеры на инпуты формы
createCardPopup.setEventListeners();
        //вешаем лиссенер на кнопку открытия попапа
document.querySelector(".profile__add-button").addEventListener("click", () => {
    createCardPopup.open();
});
        //создаём валидатор для попапа
const createCardPopupValidation = new FormValidator(formsElementsSelectors, popupCard);
        //включаем валидацию
createCardPopupValidation.enableValidation();

    //Попап редактирования аватара
export const modifyAvatarPopup = new PopupWithForm('.popup__avatar', (inputsValues) => {
  api
    .avatarUpdate(inputsValues)
    .then(res => {
      profileAvatar.src = res.avatar;
    })
    .catch((err) => console.log(err))
    .finally(() => {
      btnSaveAvatar.textContent = "Сохранить";
      modifyAvatarPopup.close();
    });
});
modifyAvatarPopup.setEventListeners();

document.querySelector(".profile__edit-avatar").addEventListener("click", () => {
    modifyAvatarPopup.open();
});

const modifyAvatarPopupValidation = new FormValidator(formsElementsSelectors, popupAvatar);
modifyAvatarPopupValidation.enableValidation();

    //Попап с формой редактирования профиля
export const modifyProfilePopup = new PopupWithForm('.popup__profile', (inputsValues) => {
  api
    .profileUpdate(inputsValues)
    .then(res => {
        userInfo.setUserInfo(res);
    })
    .catch((err) => console.log(err))
    .finally(() => {
      btnSaveAvatar.textContent = "Сохранить";
      modifyProfilePopup.close();
    });
});
modifyProfilePopup.setEventListeners();

document.querySelector(".profile__edit-button").addEventListener("click", () => {
    nameInput.value = userInfo.getUserInfo().name;
    jobInput.value = userInfo.getUserInfo().about;
    modifyProfilePopup.open();
});

const modifyProfilePopupValidation = new FormValidator(formsElementsSelectors, popupProfile);
modifyProfilePopupValidation.enableValidation();