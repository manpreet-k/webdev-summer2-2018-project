import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ProducerProductsServiceClient} from '../services/producer-products.service.client';
import {UserServiceClient} from '../services/user.service.client';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

  availability;
  price;
  user;
  username;
  productId;
  product: any = {};

  constructor(private service: ProducerProductsServiceClient,
              private userService: UserServiceClient,
              private aRoute: ActivatedRoute,
              private router: Router) {
    this.aRoute.params.subscribe(
      params => this.loadProduct(params['productId']));
  }

  ngOnInit() {
    this.userService
      .currentUser()
      .then(user => {
        if (user !== null) {
          this.user = user;
          this.username = user.firstName;
        } else {
          alert('Session expired');
          this.router.navigate(['/home']);
        }
      });
  }

  submit() {
    const item = {
      product: this.product,
      price: this.price,
      availability: this.availability
    };
    this.service
      .updateInventoryProduct(this.productId, item)
      .then(res => {
        this.router.navigate(['/manage-products']);
      });
  }

  loadProduct(productId) {
    this.productId = productId;
    this.service
      .findProductInInventory(productId)
      .then(product => {
        this.product = product[0].product;
        this.availability = product[0].availability;
        this.price = product[0].price;
      });
  }
}
