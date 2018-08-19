import { User } from './user.model.client';
import { Product } from './product.model.client';

export class Order {
    _id: String;
    requester: User;
    receiver: User;
    items: [{
        product: Product,
        count: Number,
        pricePerUnit: Number
    }];
    status: {
        type: String,
        enum: [
            'OPEN',
            'FULFILLED',
            'CANCELLED'
        ]
    };
}
