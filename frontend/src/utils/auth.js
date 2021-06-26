export const BASE_URL = 'https://api.hlopkov.students.nomoredomains.club';

const parseResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(new Error(`Ошибка ${res.status}: ${res.statusText}`))
};


export const register = ({password, email}) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    credentials: 'include',
    body: JSON.stringify({
      "email": email,
      "password": password,
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
    credentials: 'include',
    body: JSON.stringify ({
      "email": email,
      "password": password,
    })
  })
    .then((res) => parseResponse(res));
}

export const getContent = () => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
    },
    credentials: 'include',
  })
    .then((res) => parseResponse(res));
}
