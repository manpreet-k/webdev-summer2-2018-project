import {Injectable} from '@angular/core';

import { NODE } from './const-url';

@Injectable()
export class OrderServiceClient {

  findAllOrdersForBuyer = (user) =>
    fetch(NODE + '/api/order/from/' + user._id, {
      method: 'get',
      credentials: 'include',
      headers: {
        'content-type': 'application/json'
      },
    })
      .then(response => response.json())

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
}
