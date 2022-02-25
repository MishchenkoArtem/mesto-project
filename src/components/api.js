const config = {
    baseUrl: 'https://nomoreparties.co/v1/plus-cohort-6',
    headers: {
      Authorization: '6d1f8b51-2184-4b24-a74b-b837295f6bd4',
      'Content-Type': 'application/json'
    }
};
  
function getResponseData (res) {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
};

function getUser () {
	return fetch(`${config.baseUrl}/users/me`, {
        headers: config.headers
    })
    .then(res => getResponseData(res))
}

function getCards () {
    return fetch(`${config.baseUrl}/cards`, {
        headers: config.headers
    })
    .then(res => getResponseData(res))
}

export function getAppInfo () {
    return Promise.all([getUser(), getCards()])
}

export function profileUpdate (profileName, profileInfo) {
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            name: profileName,
            about: profileInfo
        })
    })
    .then(res => getResponseData(res))
}

export function newPostCard (name, link, ownerId) {
    return fetch(`${config.baseUrl}/cards`, {
        method: 'POST',
        headers:config.headers,
        body: JSON.stringify ({
            name: name,
            link: link,
            owner: ownerId
        })
    })
    .then(res => getResponseData(res))
}

export const sendLike = (like) => {
    return fetch (`${config.baseUrl}/cards/likes/${like}`, {
      method: 'PUT',
      headers: config.headers,
    })
    .then(res => getResponseData(res))
}
  
export const removeLike = (like) => {
    return fetch (`${config.baseUrl}/cards/likes/${like}`, {
        method: 'DELETE',
        headers: config.headers,
    })
    .then(res => getResponseData(res))
}

export const deleteCard = (cardId) => {
    return fetch (`${config.baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: config.headers,
    })
    .then(res => getResponseData(res))
  }