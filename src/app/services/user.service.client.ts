import {Injectable} from '@angular/core';
import { NODE } from './const-url';

@Injectable()
export class UserServiceClient {
  URL = NODE + '/';

  login = (user) =>
    fetch(this.URL + 'api/login', {
      method: 'post',
      credentials: 'include',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(user)
    })
      .then(response => response.json())

  currentUser = () =>
    fetch(this.URL + 'api/profile', {
      credentials: 'include'
    }).then(response => response.text())
      .then(text => (text ? JSON.parse(text) : null))

  register = (user) =>
    fetch(this.URL + 'api/register', {
      method: 'post',
      credentials: 'include',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(user)
    })
      .then(response => response.json())

  findUserByUsername = (username) =>
    fetch(this.URL + 'api/username/' + username, {
      method: 'get',
      credentials: 'include',
      headers: {
        'content-type': 'application/json'
      }
    })
      .then(response => response.json())


  profile = () => {
    return fetch(this.URL + 'api/profile',
      {
        method: 'get',
        credentials: 'include',
        headers: {
          'content-type': 'application/json'
        }
      })
      .then(response => response.json());
  }

  update = (user) => {
    return fetch(this.URL + 'api/profile', {
      method: 'put',
      body: JSON.stringify(user),
      credentials: 'include',
      headers: {
        'content-type': 'application/json'
      },
    })
      .then(response => response.json());
  }

  logout = () => {
    return fetch(this.URL + 'api/logout', {
      method: 'post',
      credentials: 'include',
      headers: {
        'content-type': 'application/json'
      },
    });
  }
}
