import { Component, OnInit } from '@angular/core';
import {OtreebaProductsServiceClient} from '../services/otreeba-products.service.client';
import {SignInComponent} from '../sign-in/sign-in.component';
import {ActivatedRoute} from '@angular/router';
import {UserServiceClient} from '../services/user.service.client';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})


export class HomeComponent implements OnInit {
  loggedIn = false;
  products = []; // To be populated from Input Field
  productName;
  user: any = {};

  constructor(private service: OtreebaProductsServiceClient,
              private userService: UserServiceClient,
              private route: ActivatedRoute) {}

  ngOnInit() {
    this.service.findAllProducts()
      .then(products => this.products = products.data);
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
