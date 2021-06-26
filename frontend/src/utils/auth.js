export const BASE_URL = 'https://api.hlopkov.students.nomoredomains.club';

const parseResponse = (res) => {
  if(res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
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
    .then(parseResponse)
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
  .then((res) => {
    if(res.ok) {
      return res;
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  })
}

export const getContent = () => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
    },
    credentials: 'include',
  })
  .then(parseResponse)
}
