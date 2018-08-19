import { Product } from './product.model.client';

export class User {
    _id: String;
    email: String;
    password: String;
    firstName: String;
    lastName: String;
    phone: Number;
    street: String;
    city: String;
    state: String;
    zip: Number;
    profileImage: String;
    shoppingCart: [{
        retailer: User,
        product: Product,
        count: Number,
        price: Number
    }];
    userType: {
        type: String,
        enum: [
          'ADMIN',
          'PRODUCER',
          'RETAILER',
          'BUYER'
        ],
        default: 'BUYER'
    };
}
