import { Component, OnInit, Input } from '@angular/core';
import {ProductServiceClient} from '../services/product.service.client';
import {UserServiceClient} from '../services/user.service.client';

@Component({
  selector: 'app-search-bar-cart',
  templateUrl: './search-bar-cart.component.html',
  styleUrls: ['./search-bar-cart.component.css']
})
export class SearchBarCartComponent implements OnInit {

  @Input() userId;

  searchText = '';

  products: any  = {};
  names = [];
  users: any = {};

  constructor(private productService: ProductServiceClient,
              private userService: UserServiceClient) { }

  ngOnInit() {

    this.productService.findListedByRetailer()
      .then(products => this.products = products)
      .then(() => this.products.map(product => this.names.push(product['name'])));

    this.userService
      .findAllUsers()
      .then(users => {
        this.users = users;
      });

  }



}
