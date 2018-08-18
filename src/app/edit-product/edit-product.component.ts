import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ProducerProductsServiceClient} from '../services/producer-products.service.client';
import {UserServiceClient} from '../services/user.service.client';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

  user;
  username;
  product: any = {};
  constructor(private service: ProducerProductsServiceClient,
              private userService: UserServiceClient,
              private aRoute: ActivatedRoute,
              private router: Router) {
    this.aRoute.params.subscribe(
      params => this.loadProduct(params['productId']));
  }

  ngOnInit() {
  }

  submit() {
    this.service
      .updateProduct(this.product)
      .then(res => {
        this.router.navigate(['/manage-products']);
      });
  }

  loadProduct(productId) {
    this.userService
      .currentUser()
      .then(user => {
        if (user !== null) {
          this.user = user;
          this.username = user.firstName;
          this.service
            .findProductById(productId)
            .then(product => {
              this.product = product[0];
            });
        } else {
          alert('Session expired');
          this.router.navigate(['/home']);
        }
      });
  }

}
