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
    btnSaveAvatar,
    userInfoSelectorsList,
    nameInput,
    jobInput,
    popupCard,
    popupProfile,
    popupAvatar,
    formsElementsSelectors,
    cardsElementsSelectors,
    btnAddCard,
    btnEditProfile,
} from '../utils/constants.js'
import { data } from 'autoprefixer'

//-------------------------------------------------------------------------------
//-----Создаём экземпляры классов
//-------------------------------------------------------------------------------

//  Класс обращений к серверу
const api = new Api(fetchParams)

//  Класс получения информации о пользователе
const userInfo = new UserInfo(userInfoSelectorsList, userId)

//-------------------------------------------------------------------------------
//-----Отрисовываем стартовую страницу
//-------------------------------------------------------------------------------

let userId

const createCard = (data) => {
    const card = new Card(
        data,
        '.template__card',
        cardsElementsSelectors,
        userId,
        (item) => api.sendLike(item),
        (item) => api.removeLike(item),
        (item) => api.deleteCard(item),
        openCardImagePopup
    )
    const cardElement = card.generate(data)
    return cardElement
}

const section = new Section(
    {
        renderItems: (data) => {
            section.addItem(createCard(data))
        },
    },
    cardListSection
)

api.getAppInfo()
    .then(res => {
        const [{ name, about, avatar, _id }, cardData] = res

        userInfo.setUserInfo({ name, about, avatar, _id })
        userId = _id

        section.renderItems(cardData)
    })

export const createCardPopup = new PopupWithForm(
    '.popup__card',
    (inputsValues) => {
        api.newPostCard(inputsValues)
            .then((res) => {
                section.renderItems(res)
                createCardPopup.close()
            })
            .catch((err) => console.log(err))
            .finally(() => {
                btnAddCard.textContent = 'Сохранить'
            })
    }
)

//  Попап открытия картинки
export const openCardImagePopup = new PopupWithImage('.popup__open-img')
openCardImagePopup.setEventListeners()

//  Вешаем лиссенеры на инпуты формы
createCardPopup.setEventListeners()

//  Вешаем лиссенер на кнопку открытия попапа
document.querySelector('.profile__add-button').addEventListener('click', () => {
    createCardPopupValidation.disableSubmitButton()
    createCardPopupValidation.hideAllValidationErrors()
    createCardPopup.open()
})

//  Создаём валидатор для попапа
const createCardPopupValidation = new FormValidator(
    formsElementsSelectors,
    popupCard
)

//  Включаем валидацию
createCardPopupValidation.enableValidation()

//Попап редактирования аватара
export const modifyAvatarPopup = new PopupWithForm(
    '.popup__avatar',
    (inputsValues) => {
        api.avatarUpdate(inputsValues)
            .then((res) => {
                userInfo.setUserInfo(res)
                modifyAvatarPopup.close()
            })
            .catch((err) => console.log(err))
            .finally(() => {
                btnSaveAvatar.textContent = 'Сохранить'
            })
    }
)
modifyAvatarPopup.setEventListeners()

document
    .querySelector('.profile__edit-avatar')
    .addEventListener('click', () => {
        modifyAvatarPopupValidation.disableSubmitButton()
        modifyAvatarPopupValidation.hideAllValidationErrors()
        modifyAvatarPopup.open()
    })

const modifyAvatarPopupValidation = new FormValidator(
    formsElementsSelectors,
    popupAvatar
)
modifyAvatarPopupValidation.enableValidation()

//Попап с формой редактирования профиля
export const modifyProfilePopup = new PopupWithForm(
    '.popup__profile',
    (inputsValues) => {
        api.profileUpdate(inputsValues)
            .then((res) => {
                userInfo.setUserInfo(res)
                modifyProfilePopup.close()
            })
            .catch((err) => console.log(err))
            .finally(() => {
                btnEditProfile.textContent = 'Сохранить'
            })
    }
)
modifyProfilePopup.setEventListeners()

document
    .querySelector('.profile__edit-button')
    .addEventListener('click', () => {
        modifyProfilePopupValidation.disableSubmitButton()
        modifyProfilePopupValidation.hideAllValidationErrors()
        const userData = userInfo.getUserInfo()
        nameInput.value = userData.name
        jobInput.value = userData.about
        modifyProfilePopup.open()
    })

const modifyProfilePopupValidation = new FormValidator(
    formsElementsSelectors,
    popupProfile
)
modifyProfilePopupValidation.enableValidation()
