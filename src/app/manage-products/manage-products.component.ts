import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UserServiceClient} from '../services/user.service.client';
import {InventoryServiceClient} from '../services/inventory.service.client';

@Component({
  selector: 'app-manage-products',
  templateUrl: './manage-products.component.html',
  styleUrls: ['./manage-products.component.css']
})
export class ManageProductsComponent implements OnInit {

  username = 'XYZ';
  listedProducts;
  user;
  inventory;

  constructor(private service: InventoryServiceClient,
              private userService: UserServiceClient,
              private aRoute: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.userService
      .currentUser()
      .then(user => {
        if (user !== null) {
          this.user = user;
          this.username = user.firstName;
          this.service
            .findAllListedProducts(user)
            .then(inv => {
              if (inv.length > 0) {
                this.inventory = inv[0];
                this.listedProducts = inv[0].items;
              }
            });
        } else {
          alert('Session expired');
          this.router.navigate(['/home']);
        }
      });
  }

  deleteProduct(id) {
    this.service
      .deleteProductFromInventory(this.inventory._id, id)
      .then(res => this.loadProducts());
  }
}
