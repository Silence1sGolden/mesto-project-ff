const config = {
  baseURL: "https://nomoreparties.co/v1/wff-cohort-20",
  headers: {
    authorization: "0d91823f-13f9-4f12-9bf1-32d1686a125a",
    "Content-Type": "application/json",
  },
};

const requestGetUserInformation = () => {
  return fetch(`${config.baseURL}/users/me`, {
    method: "GET",
    headers: config.headers,
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        Promise.reject(`Произошла ошибка: ${res.status}`);
      }
    }).catch((err) => {
      console.log(err);
    })
};

const requestGetCardsInformation = () => {
  return fetch(`${config.baseURL}/cards`, {
    method: "GET",
    headers: config.headers,
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        Promise.reject(`Произошла ошибка: ${res.status}`);
      }
    }).catch((err) => {
      console.log(err);
    })
};

const requestChangeProfile = (name, about) => {
  return fetch(`${config.baseURL}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      about: about,
    }),
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(`Произошла ошибка: ${res.status}`);
      }
    }).catch((err) => {
      console.log(err);
    })
};

const requestAddNewCard = (name, link) => {
  return fetch(`${config.baseURL}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      link: link,
    }),
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(`Произошла ошибка: ${res.status}`);
      }
    }).catch((err) => {
      console.log(err);
    })
};

const requestDeleteCard = (cardId) => {
  return fetch(`${config.baseURL}/cards/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  })
    .then((res) => {
      if (res.ok) {
        return res;
      } else {
        return Promise.reject(`Произошла ошибка: ${res.status}`);
      }
    }).catch((err) => {
      console.log(err);
    })
};

const requestLikeCard = (cardId) => {
  return fetch(`${config.baseURL}/cards/likes/${cardId}`, {
    method: "PUT",
    headers: config.headers,
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(`Произошла ошибка: ${res.status}`);
      }
    }).catch((err) => {
      console.log(err);
    })
};

const requestUnlikeCard = (cardId) => {
  return fetch(`${config.baseURL}/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(`Произошла ошибка: ${res.status}`);
      }
    }).catch((err) => {
      console.log(err);
    })
};

const requestChangePhoto = (link) => {
  return fetch(`${config.baseURL}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar: link,
    }),
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(`Произошла ошибка: ${res.status}`);
      }
    }).catch((err) => {
      console.log(err);
    })
};

export {
  requestGetUserInformation,
  requestGetCardsInformation,
  requestChangeProfile,
  requestAddNewCard,
  requestDeleteCard,
  requestLikeCard,
  requestUnlikeCard,
  requestChangePhoto,
};
