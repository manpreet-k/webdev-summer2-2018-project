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

  findInventoryByOwner = (user) =>
    fetch(NODE + '/api/inventory/' + user._id, {
      method: 'get',
      credentials: 'include',
      headers: {
        'content-type': 'application/json'
      },
    })
      .then(response => response.json())

  addProductToInventory = (inventoryId, product) =>
    fetch(NODE + '/api/inventory/' + inventoryId + '/product/' + product._id,  {
      method: 'put',
      credentials: 'include',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(product)
    })
      .then(response => response.json())

  createInventory = (inventory) =>
    fetch(NODE + '/api/inventory', {
      method: 'post',
      credentials: 'include',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(inventory)
    })
      .then(response => response.json())

  deleteProductFromInventory = (inventoryId, id) =>
    fetch(NODE + '/api/inventory/' + inventoryId + '/product/' + id, {
      method: 'delete',
      credentials: 'include',
      headers: {
        'content-type': 'application/json'
      }
    })
      .then(response => response.json())

  findProductInInventory = (id) =>
    fetch(NODE + '/api/inventory/item/' + id, {
      method: 'get',
      credentials: 'include',
      headers: {
        'content-type': 'application/json'
      },
    })
      .then(response => response.json())

  updateInventoryProduct = (inventoryId, itemId, item) =>
    fetch(NODE + '/api/inventory/' + inventoryId + '/item/' + itemId , {
      method: 'put',
      credentials: 'include',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(item)
    })
      .then(response => response.json())

}
