export const BASE_URL = 'https://auth.nomoreparties.co';

const parseResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(new Error(`Ошибка ${res.status}: ${res.statusText}`))
};


export const register = ({password, email}) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      "password": password,
      "email": email
    })
  })
   .then((res) => parseResponse(res));
 }

export const authorize = ({password, email}) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify ({
      "password": password,
      "email": email
    })
  })
    .then((res) => parseResponse(res));
}

export const getContent = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      "Authorization" : `Bearer ${token}`
    },
  })
    .then((res) => parseResponse(res));
}
