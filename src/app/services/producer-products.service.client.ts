import {Injectable} from '@angular/core';
import * as products from './producer-listing.json';

@Injectable()
export class ProducerProductsServiceClient {

  findAllListedProducts() {
    return products;
  }

  findProductById(productId) {
    return products;
  }

}
