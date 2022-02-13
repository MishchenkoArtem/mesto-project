const config = {
    baseUrl: 'https://nomoreparties.co/v1/plus-cohort-6',
    headers: {
      Authorization: '6d1f8b51-2184-4b24-a74b-b837295f6bd4',
      'Content-Type': 'application/json'
    }
};
  
const getResponseData = (res) => {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
};

const getUser = () => {
	return fetch('`${config.baseUrl}`/users/me', {
        headers: config.headers
    })
    .then(res => console.log(res))
    .then(res => getResponseData(res))
}

const getCards = () => {
    return fetch('`${config.baseUrl}`/cards', {
        headers: config.headers
    })
    .then(res => console.log(res))
    .then(res => getResponseData(res))
}

export const getAppInfo = () => {
    return Promise.all([getUser(), getCards()])
}