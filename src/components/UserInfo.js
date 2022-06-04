// Отвечает за управление информацией о пользователе на странице

export default class UserInfo{
    constructor(userInfoSelectorsList, nameInput, jobInput, getUserCallback, setUserCallback) {
        this._profileName = document.querySelector(userInfoSelectorsList.profileNameSelector);
        this._profileInfo = document.querySelector(userInfoSelectorsList.profileInfoSelector);
        this._nameInput = nameInput;
        this._jobInput = jobInput;
        this.getUserCallback = getUserCallback;
        this.setUserCallback = setUserCallback;
    }
    // Возвращает объект с данными пользователя
    getUserInfo() {
        this.getUserCallback()
            .then(res => {
                this._nameInput.value = res.name;
                this._jobInput.value = res.about;
            })
            .catch((err) => console.log(err))
}

    // Принимает новые данные пользователя, отправляет их на сервер и добавляет их на страницу
    setUserInfo(newUserInfo) {
        this.setUserCallback(newUserInfo)
            .then(res => {
                this._profileName.textContent = res.name;
                this._profileInfo.textContent = res.about;
            })
            .catch((err) => console.log(err))
    }
}