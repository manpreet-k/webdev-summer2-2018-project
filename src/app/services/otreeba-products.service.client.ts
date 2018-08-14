import {Injectable} from '@angular/core';

@Injectable()
export class OtreebaProductsServiceClient {
  URL = 'https://api.otreeba.com/v1/products?count=50';
  findAllProducts() {
    return fetch(this.URL)
      .then(response => response.json());
  }

}
