import {Component, OnInit} from '@angular/core';
import {OtreebaProductsServiceClient} from '../services/otreeba-products.service.client';
import {UserServiceClient} from '../services/user.service.client';
import {ProducerProductsServiceClient} from '../services/producer-products.service.client';

@Component({
  selector: 'app-register-products',
  templateUrl: './register-products.component.html',
  styleUrls: ['./register-products.component.css']
})
export class RegisterProductsComponent implements OnInit {

  products = [];
  loggedIn = false;
  user: any = {};
  quantity = {};
  price = {};
  inventory: any = {};
  constructor(private service: OtreebaProductsServiceClient,
              private userService: UserServiceClient,
              private producerService: ProducerProductsServiceClient) {
  }

  add(product) {
    this.producerService
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
    this.producerService
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
    product['price'] = this.price[product.ocpc];
    product['availability'] = this.quantity[product.ocpc];

    this.producerService
      .addProductToInventory(this.inventory._id, product);
      // .then(res => {
      //
      // });
  }

  createProduct(product, inventExists) {
    this.producerService
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
    product['price'] = this.price[product.ocpc];
    product['availability'] = this.quantity[product.ocpc];

    const inv = {
      owner: this.user._id,
      items: [product]
    };

    this.producerService
      .createInventory(inv)
      // .then(res => {
      //   alert(res);
      // });
  }

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
