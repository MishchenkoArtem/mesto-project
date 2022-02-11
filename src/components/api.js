const config = {
    baseUrl: 'https://nomoreparties.co/plus-cohort-6',
    headers: {
      Authorization: '6d1f8b51-2184-4b24-a74b-b837295f6bd4',
      'Content-Type': 'application/json'
    }
};
  
const getResponseData = (res) => {
    if (res.ok) {
        res.json();
    } else {
        Promise.reject(`Ошибка: ${res.status}`);
    }
    return res;
};