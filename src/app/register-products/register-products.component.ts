import {Component, OnInit} from '@angular/core';
import {OtreebaProductsServiceClient} from '../services/otreeba-products.service.client';
import {UserServiceClient} from '../services/user.service.client';
import {InventoryServiceClient} from '../services/inventory.service.client';
import {ProductServiceClient} from '../services/product.service.client';
import { User } from '../models/user.model.client';
import { Inventory } from '../models/inventory.model.client';
import { Product } from '../models/product.model.client';

@Component({
  selector: 'app-register-products',
  templateUrl: './register-products.component.html',
  styleUrls: ['./register-products.component.css']
})
export class RegisterProductsComponent implements OnInit {

  products: Product[];
  loggedIn = false;
  user: User;
  quantity = {};
  price = {};
  inventory: Inventory;
  constructor(private service: OtreebaProductsServiceClient,
              private userService: UserServiceClient,
              private inventoryService: InventoryServiceClient,
              private productService: ProductServiceClient) {
  }

  add(product) {
    this.inventoryService
      .findInventoryByOwner(this.user)
      .then(inventory => {
        if (inventory.length > 0) {
          this.inventory = inventory[0];
          this.changeInventory(product, true);
        } else {
          this.changeInventory(product, false);
        }
      });
  }

  changeInventory(product, inventExists) {
    this.productService
      .findProductByOCPC(product.ocpc)
      .then(prod => {
        if (prod.length === 0) {
          this.createProduct(product, inventExists);
        } else {
          if (inventExists) {
            this.addProdToInventory(prod[0]);
          } else {
            this.createInventory(prod[0]);
          }

        }
      });
  }

  addProdToInventory(product) {
    const invProd = {
      product: product,
      price: this.price[product.ocpc],
      availability: this.quantity[product.ocpc]
    };

    this.inventoryService
      .addProductToInventory(this.inventory._id, invProd);
      // .then(res => {
      //
      // });
  }

  createProduct(product, inventExists) {
    this.productService
      .createProduct(product)
      .then(prod => {
        if (prod !== null) {
          if (inventExists) {
            this.addProdToInventory(prod);
          } else {
            this.createInventory(prod);
          }
        } else {
          alert('Eeeoe!!');
        }
      });
  }

  createInventory(product) {
    const invProd = {
      product: product,
      price: this.price[product.ocpc],
      availability: this.quantity[product.ocpc]
    };

    const inv = {
      owner: this.user._id,
      items: [invProd]
    };

    this.inventoryService
      .createInventory(inv);
      // .then(res => {
      //   alert(res);
      // });
  }

  ngOnInit() {
    this.userService
      .currentUser()
      .then(user => {
        if (user !== null) {
          this.loggedIn = true;
          this.user = user;

          if (user.userType === 'PRODUCER') {
            this.service.findAllProducts()
              .then(products => this.products = products.data);
          } else {
            this.productService.findAllProducts()
              .then(products => this.products = products);
          }
        }
      });
  }
}
