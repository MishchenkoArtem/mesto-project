// Отвечает за управление информацией о пользователе на странице

export default class UserInfo{
    constructor(userInfoSelectorsList) {
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
    setUserInfo(newUserInfo) {
        this._profileName.textContent = newUserInfo.name;
        this._profileInfo.textContent = newUserInfo.about;
        this._profileAvatar.src = newUserInfo.avatar;
    }
}