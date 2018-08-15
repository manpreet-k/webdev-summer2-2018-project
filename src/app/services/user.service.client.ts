import {Injectable} from '@angular/core';

@Injectable()
export class UserServiceClient {
  URL = 'http://localhost:3000/';

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
    }).then(response => response.json())

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
