import { Component, OnInit } from '@angular/core';
import { User } from '../models/user.model.client';
import { UserServiceClient } from '../services/user.service.client';
import { ProductServiceClient } from '../services/product.service.client';
import { OrderServiceClient } from '../services/order.service.client';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart-view',
  templateUrl: './cart-view.component.html',
  styleUrls: ['./cart-view.component.css']
})
export class CartViewComponent implements OnInit {

  user: User;
  listings = [];

  constructor(private userService: UserServiceClient,
    private productService: ProductServiceClient,
    private orderService: OrderServiceClient,
    private router: Router) { }

  ngOnInit() {
    this.userService.profile()
      .then(user => {
        this.user = user;
        for (const listing of user.shoppingCart) {
          this.userService.findUserById(listing.retailer)
            .then(retailer => {
              listing.retailer = retailer;
              this.productService.findProductById(listing.product)
                .then(product => {
                  listing.product = product;
                  this.listings.push(listing);
                });
            });
        }
      });
  }

  getTotalPrice() {
    let total = 0;
    for (const listing of this.listings) {
      total += listing.price * listing.count;
    }
    return total;
  }

  placeOrder() {
    for (const listing of this.listings) {
      const order = {
        requester: this.user._id,
        receiver: listing.retailer._id,
        items: [{
          product: listing.product,
          count: listing.count,
          pricePerUnit: listing.price
        }],
        status: 'OPEN'
      };
      this.orderService.createOrder(order);
    }
    this.userService.updateShoppingCart([])
      .then(() => this.router.navigate(['home']));
  }

}
