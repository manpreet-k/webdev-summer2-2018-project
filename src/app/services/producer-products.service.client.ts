import {Injectable} from '@angular/core';
import { NODE } from './const-url';

@Injectable()
export class ProducerProductsServiceClient {

  URL = NODE + '/';

  findAllListedProducts = (user) =>
    fetch(this.URL + 'api/inventory/' + user._id, {
      method: 'get',
      credentials: 'include',
      headers: {
        'content-type': 'application/json'
      },
    })
      .then(response => response.json());

  createProduct = (product) =>
    fetch(this.URL + 'api/product/', {
      method: 'post',
      credentials: 'include',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(product)
    })
      .then(response => response.json());

  findProductById = (productId) =>
    fetch(this.URL + 'api/product/' + productId, {
      method: 'get',
      credentials: 'include',
      headers: {
        'content-type': 'application/json'
      },
    })
      .then(response => response.json());

  findInventoryByOwner = (user) =>
    fetch(this.URL + 'api/inventory/' + user._id, {
      method: 'get',
      credentials: 'include',
      headers: {
        'content-type': 'application/json'
      },
    })
      .then(response => response.json());

  findProductByOCPC = (ocpc) =>
    fetch(this.URL + 'api/product/ocpc/' + ocpc, {
      method: 'get',
      credentials: 'include',
      headers: {
        'content-type': 'application/json'
      },
    })
      .then(response => response.json());

  addProductToInventory = (inventoryId, product) =>
    fetch(this.URL + 'api/inventory/' + inventoryId + '/product/' + product._id,  {
      method: 'put',
      credentials: 'include',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(product)
    })
      .then(response => response.json())

  createInventory = (inventory) =>
    fetch(this.URL + 'api/inventory', {
      method: 'post',
      credentials: 'include',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(inventory)
    })
      .then(response => response.json())

  deleteProductFromInventory = (inventoryId, id) =>
    fetch(this.URL + 'api/inventory/' + inventoryId + '/product/' + id, {
      method: 'delete',
      credentials: 'include',
      headers: {
        'content-type': 'application/json'
      }
    })
      .then(response => response.json())

  updateProduct = (product) =>
    fetch(this.URL + 'api/product/' + product._id, {
      method: 'put',
      credentials: 'include',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(product)
    })
      .then(response => response.json());

  findAllProducts = () =>
    fetch(this.URL + 'api/product/', {
      method: 'get',
      credentials: 'include',
      headers: {
        'content-type': 'application/json'
      },
    })
      .then(response => response.json());


  findProductInInventory = (id) =>
    fetch(this.URL + 'api/inventory/item/' + id, {
      method: 'get',
      credentials: 'include',
      headers: {
        'content-type': 'application/json'
      },
    })
      .then(response => response.json());

  updateInventoryProduct = (inventoryId, itemId, item) =>
    fetch(this.URL + 'api/inventory/' + inventoryId + '/item/' + itemId , {
      method: 'put',
      credentials: 'include',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(item)
    })
      .then(response => response.json());


}
