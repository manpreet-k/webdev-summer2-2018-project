import {Injectable} from '@angular/core';

import { NODE } from './const-url';

@Injectable()
export class InventoryServiceClient {
    findAllInventoriesForProduct(ocpc) {
        return fetch(NODE + '/api/inventory/product/' + ocpc)
            .then(response => response.json());
    }
}
