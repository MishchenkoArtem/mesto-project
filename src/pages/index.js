//-------------------------------------------------------------------------------
//-----Импорты
//-------------------------------------------------------------------------------
//Общие модули
import { assertBoolean } from '@babel/core/lib/config/validation/option-assertions'
import '../pages/index.css'

//Классы
import PopupWithImage from '../components/PopupWithImage'
import PopupWithForm from '../components/PopupWithForm'
import FormValidator from '../components/FormValidator'
import Api from '../components/Api'
import Section from '../components/Section'
import Card from '../components/Card.js'
import UserInfo from '../components/UserInfo.js'

//Переменные
import {
    cardListSection,
    fetchParams,
    profileAvatar,
    profileInfo,
    profileName,
    btnSaveAvatar,
    userInfoSelectorsList,
    nameInput,
    jobInput,
    popupCard,
    popupProfile,
    popupAvatar,
    formsElementsSelectors,
    cardsElementsSelectors,
} from '../components/constants'

//-------------------------------------------------------------------------------
//-----Создаём экземпляры классов
//-------------------------------------------------------------------------------

//Класс обращений к серверу
const api = new Api(fetchParams)

//Класс получения информации о пользователе
const userInfo = new UserInfo(
    userInfoSelectorsList,
    nameInput,
    jobInput,
    () => api.getUser(),
    (newUserInfo) => api.profileUpdate(newUserInfo)
)

//Универсальный Класс для отрисовки объектов
const addCards = new Section(
    (item, userId) => {
        const cards = new Card(
            item,
            '.template__card',
            (cardId) => api.sendLike(cardId),
            (cardId) => api.removeLike(cardId),
            (cardId) => api.deleteCard(cardId),
            userId,
            cardsElementsSelectors,
            openCardImagePopup
        )
        const cardElement = cards.generate()
        addCards.setItem(cardElement)
    },
    cardListSection,
    () => api.getUser()
)

//-------------------------------------------------------------------------------
//-----Отрисовываем стартовую страницу
//-------------------------------------------------------------------------------
api.getAppInfo()
    .then((res) => {
        const [{ name, about, avatar }, cardData] = res
        profileName.textContent = name
        profileInfo.textContent = about
        profileAvatar.src = avatar
        addCards.renderItem(cardData)
    })
    .catch((err) => console.log(err))

//-------------------------------------------------------------------------------
//-----Настраиваем попапы
//-------------------------------------------------------------------------------

//  Попап открытия картинки
export const openCardImagePopup = new PopupWithImage('.popup__open-img')
openCardImagePopup.setEventListeners()

//  Попап с формой создания карточки
//  Cоздаём класс попапа
export const createCardPopup = new PopupWithForm(
    '.popup__card',
    (inputsValues) => {
        api.newPostCard(inputsValues)
            .then((res) => {
                addCards.renderItem(res)
            })
            .catch((err) => console.log(err))
            .finally(() => {
                btnSaveAvatar.textContent = 'Сохранить'
                createCardPopup.close()
            })
    }
)

//  Лайки карточки (Можно лучше).
function handleLike(card) {
    api.sendLike(card.getId())
        .then((res) => {
            card.updateLikes(res)
        })
        .catch((err) => console.log(err))
}

//  Вешаем лиссенеры на инпуты формы
createCardPopup.setEventListeners()

//  Вешаем лиссенер на кнопку открытия попапа
document.querySelector('.profile__add-button').addEventListener('click', () => {
    createCardPopup.open()
})

//  Создаём валидатор для попапа
const createCardPopupValidation = new FormValidator(
    formsElementsSelectors,
    popupCard
)

//  Включаем валидацию
createCardPopupValidation.enableValidation()

//  Попап редактирования аватара
export const modifyAvatarPopup = new PopupWithForm(
    '.popup__avatar',
    (inputsValues) => {
        api.avatarUpdate(inputsValues)
            .then((res) => {
                profileAvatar.src = res.avatar
            })
            .catch((err) => console.log(err))
            .finally(() => {
                btnSaveAvatar.textContent = 'Сохранить'
                modifyAvatarPopup.close()
            })
    }
)
modifyAvatarPopup.setEventListeners()

document
    .querySelector('.profile__edit-avatar')
    .addEventListener('click', () => {
        modifyAvatarPopup.open()
    })

const modifyAvatarPopupValidation = new FormValidator(
    formsElementsSelectors,
    popupAvatar
)
modifyAvatarPopupValidation.enableValidation()

//  Попап с формой редактирования профиля
export const modifyProfilePopup = new PopupWithForm(
    '.popup__profile',
    (inputsValues) => {
        userInfo.setUserInfo(inputsValues)
        btnSaveAvatar.textContent = 'Сохранить'
        modifyProfilePopup.close()
    }
)
modifyProfilePopup.setEventListeners()

document
    .querySelector('.profile__edit-button')
    .addEventListener('click', () => {
        userInfo.getUserInfo()
        modifyProfilePopup.open()
    })

const modifyProfilePopupValidation = new FormValidator(
    formsElementsSelectors,
    popupProfile
)
modifyProfilePopupValidation.enableValidation()
