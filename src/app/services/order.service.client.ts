import {Injectable} from '@angular/core';
import {NODE} from './const-url';

@Injectable()
export class OrderServiceClient {
  URL = 'http://localhost:4000/';

  createOrder = (order) =>
    fetch(this.URL + 'api/order', {
      method: 'post',
      credentials: 'include',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(order)
    })
      .then(response => response.json());

  findOrderById = (orderId) =>
    fetch(this.URL + 'api/order/' + orderId, {
      method: 'get',
      credentials: 'include',
      headers: {
        'content-type': 'application/json'
      }
    })
      .then(response => response.json());

  findAllOrders = () =>
    fetch(this.URL + 'api/order', {
      method: 'get',
      credentials: 'include',
      headers: {
        'content-type': 'application/json'
      }
    })
      .then(response => response.json());

  findOrderByUser = (userId) =>
    fetch(this.URL + 'api/order/from/' + userId, {
      method: 'get',
      credentials: 'include',
      headers: {
        'content-type': 'application/json'
      }
    })
      .then(response => response.json());

  findOrderToUser = (userId) =>
    fetch(this.URL + 'api/order/To/' + userId, {
      method: 'get',
      credentials: 'include',
      headers: {
        'content-type': 'application/json'
      }
    })
      .then(response => response.json());

  updateOrder = (orderId, newOrderStatus) => {
    return fetch(this.URL + 'api/order/' + orderId, {
      method: 'put',
      body: JSON.stringify(newOrderStatus),
      credentials: 'include',
      headers: {
        'content-type': 'application/json'
      },
    })
      .then(response => response.json());
  }

  deleteOrder(orderId) {
    return fetch(this.URL + 'api/order/' + orderId, {
      method: 'delete',
      credentials: 'include'
    });
  }

  findOrdersOfStatusForBuyer = (user, status) =>
    fetch(NODE + '/api/order/from/' + user._id + '/status/' + status, {
      method: 'get',
      credentials: 'include',
      headers: {
        'content-type': 'application/json'
      },
    })
      .then(response => response.json())

  findOrdersOfStatusForRetailer = (user, status) =>
    fetch(NODE + '/api/order/to/' + user._id + '/status/' + status, {
      method: 'get',
      credentials: 'include',
      headers: {
        'content-type': 'application/json'
      },
    })
      .then(response => response.json())

  updateOrderStatus = (id, order) => {
    return fetch(NODE + '/api/order/' + id, {
      method: 'put',
      body: JSON.stringify(order),
      credentials: 'include',
      headers: {
        'content-type': 'application/json'
      },
    })
      .then(response => response.json());
  }

}
