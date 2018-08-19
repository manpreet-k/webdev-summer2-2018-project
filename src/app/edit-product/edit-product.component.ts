import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UserServiceClient} from '../services/user.service.client';
import {InventoryServiceClient} from '../services/inventory.service.client';
import { User } from '../models/user.model.client';
import { Product } from '../models/product.model.client';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

  availability;
  price;
  user: User;
  username;
  productId;
  product: Product;
  inventoryId;

  constructor(private service: InventoryServiceClient,
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
      .updateInventoryProduct(this.inventoryId, this.productId, item)
      .then(res => {
        this.router.navigate(['/manage-products']);
      });
  }

  loadProduct(productId) {
    this.productId = productId;
    this.service
      .findProductInInventory(productId)
      .then(product => {
        this.inventoryId = product[0]._id;
        const item = product[0].items.filter(obj => {
          return obj._id === productId;
        });
        this.product = item[0].product;
        this.availability = item[0].availability;
        this.price = item[0].price;
      });
  }
}
