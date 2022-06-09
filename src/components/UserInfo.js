// Отвечает за управление информацией о пользователе на странице

export default class UserInfo{
    constructor(userInfoSelectorsList, userId) {
        this._profileName = document.querySelector(userInfoSelectorsList.profileNameSelector);
        this._profileInfo = document.querySelector(userInfoSelectorsList.profileInfoSelector);
        this._profileAvatar = document.querySelector(userInfoSelectorsList.profileAvatarSelector);
    }
    // Возвращает объект с данными пользователя
    getUserInfo() {
        return {
            name: this._profileName.textContent,
            about: this._profileInfo.textContent,
            avatar: this._profileAvatar.src
        }
}

    // Принимает новые данные пользователя, отправляет их на сервер и добавляет их на страницу
    setUserInfo({ name, about, avatar, _id}) {
        this._profileName.textContent = name
        this._profileInfo.textContent = about
        this._profileAvatar.src = avatar
    }
}