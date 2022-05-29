// Отвечает за управление информацией о пользователе на странице

export default class UserInfo{
    constructor(userInfoSelectorsList){
        this._profileName = document.querySelector(userInfoSelectorsList.profileNameSelector);
        this._profileInfo = document.querySelector(userInfoSelectorsList.profileInfoSelector);
    }
    // Возвращает объект с данными пользователя
    getUserInfo(){
        return {name: this._profileName.textContent, about: this._profileInfo.textContent}
    }

    // Принимает новые данные пользователя, отправляет их на сервер и добавляет их на страницу
    setUserInfo(newUserInfo) {
        this._profileName.textContent = newUserInfo.name;
        this._profileInfo.textContent = newUserInfo.about;
    }
}