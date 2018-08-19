import { User } from './user.model.client';
import { Product } from './product.model.client';

export class Inventory {
    _id: String;
    owner: User;
    items: [{
        product: Product,
        count: Number,
        price: Number
    }];
}
