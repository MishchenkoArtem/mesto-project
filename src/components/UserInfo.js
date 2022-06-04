// Отвечает за управление информацией о пользователе на странице

export default class UserInfo {
    constructor(userInfoSelectorsList, getUserCallback) {
        this._profileName = document.querySelector(
            userInfoSelectorsList.profileNameSelector
        )
        this._profileInfo = document.querySelector(
            userInfoSelectorsList.profileInfoSelector
        )
        this._getUserCallback = getUserCallback
    }
    // Возвращает объект с данными пользователя
    getUserInfo() {
        this._getUserCallback().then((res) => {
            return {
                name: res.name,
                about: res.about,
                avatar: res.avatar,
                userId: res._id,
            }
        })
    }

    // Принимает новые данные пользователя, отправляет их на сервер и добавляет их на страницу
    setUserInfo(newUserInfo) {
        this._profileName.textContent = newUserInfo.name
        this._profileInfo.textContent = newUserInfo.about
    }
}
