import {personalDataForRequest} from './utils';

class Api {
  constructor(options) {
    this.url = options.url;
    this.headers = options.headers;
    this._parseResponse = (res) => {
      if(res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    };
  }

  getInitialCards() {
    return fetch(`${this.url}/cards`, {
      headers: this.headers,
    })
    .then(this._parseResponse);
  }

  getUserInfo() {
    return fetch(`${this.url}/users/me`, {
      headers: this.headers,
    })
    .then(this._parseResponse);
  }

  editProfileTask(data) {
    return fetch(`${this.url}/users/me`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      })
    })
    .then(this._parseResponse);
  }

  addPlaceTask(data) {
    return fetch(`${this.url}/cards`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      })
    })
    .then(this._parseResponse);
  }

  editAvatarTask(data) {
    return fetch(`${this.url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        avatar: data.avatar,
      })
    })
    .then(this._parseResponse);
  }

  deletePlaceTask(id) {
    return fetch(`${this.url}/cards/${id}`, {
      method: 'DELETE',
      headers: this.headers,
    })
    .then(this._parseResponse);
  }

  changeLikeCardStatus(id, isLiked) {
     return fetch(`${this.url}/cards/likes/${id}`, {
        method: isLiked ? 'DELETE' : 'PUT',
        headers: this.headers,
      })
      .then(this._parseResponse);
  }
}

const api = new Api(personalDataForRequest);
export default api;
