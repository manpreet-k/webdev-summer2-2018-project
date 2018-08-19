import { Injectable } from '@angular/core';

import { NODE } from './const-url';

@Injectable()
export class ProductServiceClient {
  URL = NODE + '/';

  findListedByRetailer() {
    return fetch(NODE + '/api/product/retailer')
      .then(response => response.json());
  }

  findListedByProducer() {
    return fetch(NODE + '/api/product/producer')
      .then(response => response.json());
  }

  createProduct = (product) =>
    fetch(this.URL + 'api/product/', {
      method: 'post',
      credentials: 'include',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(product)
    })
      .then(response => response.json())

  findProductById = (productId) =>
    fetch(this.URL + 'api/product/' + productId, {
      method: 'get',
      headers: {
        'content-type': 'application/json'
      },
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
      .then(response => response.json())

  findAllProducts = () =>
    fetch(this.URL + 'api/product/producer', {
      method: 'get',
      credentials: 'include',
      headers: {
        'content-type': 'application/json'
      },
    })
      .then(response => response.json())

  findProductByOCPC = (ocpc) =>
    fetch(this.URL + 'api/product/ocpc/' + ocpc, {
      method: 'get',
      credentials: 'include',
      headers: {
        'content-type': 'application/json'
      },
    })
      .then(response => response.json())
}
