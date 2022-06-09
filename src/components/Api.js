export default class Api {
  constructor({ baseUrl, headers }) {
    this.baseUrl = baseUrl;
    this.headers = headers;
  }

  // Проверка ответа сервера
  getResponseData(res) {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
  }

  // Данные пользователя
  getUser() {
    return fetch(`${this.baseUrl}/users/me`, {
      headers: this.headers,
    }).then((res) => this.getResponseData(res));
  }

  // Данные карочек
  getCards() {
    return fetch(`${this.baseUrl}/cards`, {
      headers: this.headers,
    }).then((res) => this.getResponseData(res));
  }

  // Одновременная загрузка данных
  getAppInfo() {
    return Promise.all([this.getUser(), this.getCards()]);
  }

  // Обновление данных пользователя
  profileUpdate(newUserInfo) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        name: newUserInfo.nameProfile,
        about: newUserInfo.professionProfile
      }),
    }).then((res) => this.getResponseData(res));
  }

  // Добавление новой карточки
  newPostCard(cardInfo) {
    return fetch(`${this.baseUrl}/cards`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({
        name: cardInfo.cardName,
        link: cardInfo.cardImage
      }),
    }).then((res) => this.getResponseData(res));
  }

  // Добаление лайка карточки
  sendLike(likes) {
    return fetch(`${this.baseUrl}/cards/likes/${likes}`, {
      method: "PUT",
      headers: this.headers,
    }).then((res) => this.getResponseData(res));
  }

  // Удаление лайка карточки
  removeLike(like) {
    return fetch(`${this.baseUrl}/cards/likes/${like}`, {
      method: "DELETE",
      headers: this.headers,
    }).then((res) => this.getResponseData(res));
  }

  // Удаление карточки
  deleteCard(cardId) {
    return fetch(`${this.baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this.headers,
    }).then((res) => this.getResponseData(res));
  }

  // Добавление новой иконки пользователя
  avatarUpdate(avatar) {
    return fetch(`${this.baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify(avatar),
    }).then((res) => this.getResponseData(res));
  }
}
