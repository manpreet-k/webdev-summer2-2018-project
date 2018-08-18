import {Injectable} from '@angular/core';

import { NODE } from './const-url';

@Injectable()
export class ProductServiceClient {
    findAllActiveProducts() {
        return fetch(NODE + '/api/product/active')
            .then(response => response.json());
    }
    findProductById(productId) {
        return fetch(NODE + '/api/product/' + productId)
            .then(response => response.json());
    }
}
