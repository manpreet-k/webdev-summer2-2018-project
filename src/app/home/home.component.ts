import { Component, OnInit } from '@angular/core';
import {OtreebaProductsServiceClient} from '../services/otreeba-products.service.client';
import {SignInComponent} from '../sign-in/sign-in.component';
import {ActivatedRoute} from '@angular/router';
import {UserServiceClient} from '../services/user.service.client';
import { ProductServiceClient } from '../services/product.service.client';
import { User } from '../models/user.model.client';
import { Product } from '../models/product.model.client';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})


export class HomeComponent implements OnInit {
  loggedIn = false;
  products: Product[] = []; // To be populated from Input Field
  productName;
  user: User;

  constructor(private productService: ProductServiceClient,
              private userService: UserServiceClient,
              private route: ActivatedRoute) {}

  ngOnInit() {
    this.productService.findListedByRetailer()
      .then(products => this.products = products);
    this.userService
      .currentUser()
      .then(user => {
        if (user !== null) {
          this.loggedIn = true;
          this.user = user;
        }
      });
  }
}
