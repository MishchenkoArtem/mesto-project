const config = {
  baseUrl: "https://nomoreparties.co/v1/plus-cohort-9",
  headers: {
    Authorization: "0ce4a23a-1bec-4586-80d1-c87f648e62fc",
    "Content-Type": "application/json",
  },
};

function getResponseData(res) {
  return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
}

function getUser() {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  }).then((res) => getResponseData(res));
}

function getCards() {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  }).then((res) => getResponseData(res));
}

export function getAppInfo() {
  return Promise.all([getUser(), getCards()]);
}

export function profileUpdate(profileName, profileInfo) {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: profileName,
      about: profileInfo,
    }),
  }).then((res) => getResponseData(res));
}

export function newPostCard(cardName, cardImage, ownerId) {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name: cardName,
      link: cardImage,
      owner: ownerId,
    }),
  }).then((res) => getResponseData(res));
}

export function sendLike(like) {
  return fetch(`${config.baseUrl}/cards/likes/${like}`, {
    method: "PUT",
    headers: config.headers,
  }).then((res) => getResponseData(res));
}

export function removeLike(like) {
  return fetch(`${config.baseUrl}/cards/likes/${like}`, {
    method: "DELETE",
    headers: config.headers,
  }).then((res) => getResponseData(res));
}

export function deleteCard(cardId) {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  }).then((res) => getResponseData(res));
}

export function avatarUpdate(avatar) {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar: avatar,
    }),
  }).then((res) => getResponseData(res));
}

/* class Api {
  constructor(baseUrl, headers) {
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
  profileUpdate(name, info) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        name: name,
        about: info,
      }),
    }).then((res) => this.getResponseData(res));
  }

  // Добавление новой карточки
  newPostCard(cardName, cardImage, ownerId) {
    return fetch(`${this.baseUrl}/cards`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({
        name: cardName,
        link: cardImage,
        owner: ownerId,
      }),
    }).then((res) => this.getResponseData(res));
  }

  // Добаление лайка карточки
  sendLike(like) {
    return fetch(`${this.baseUrl}/cards/likes/${like}`, {
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
      body: JSON.stringify({
        avatar: avatar,
      }),
    }).then((res) => this.getResponseData(res));
  }
} */