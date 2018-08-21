import {Component, OnInit} from '@angular/core';
import {OtreebaProductsServiceClient} from '../services/otreeba-products.service.client';
import {UserServiceClient} from '../services/user.service.client';
import {InventoryServiceClient} from '../services/inventory.service.client';
import {ProductServiceClient} from '../services/product.service.client';
import {User} from '../models/user.model.client';
import {Inventory} from '../models/inventory.model.client';

@Component({
  selector: 'app-register-products',
  templateUrl: './register-products.component.html',
  styleUrls: ['./register-products.component.css']
})
export class RegisterProductsComponent implements OnInit {

  products = [];
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
    if (this.inventory) {
      this.changeInventory(product, true);
    } else {
      this.changeInventory(product, false);
    }
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
    this.setListedOwnerField(product);
    this.productService
      .updateProduct(product)
      .then(prod => {
        const invProd = this.setInventoryObject(product);
        this.inventoryService
          .addProductToInventory(this.inventory._id, product  ._id, invProd)
          .then(res => {
            this.inventory.items.push(invProd);
            this.filterExistingProducts();
          });
      });
  }

  createProduct(product, inventExists) {
    this.setListedOwnerField(product);

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

  setListedOwnerField(product) {
    if (this.user.userType === 'RETAILER') {
      product.listedByRetailer = true;
    } else if (this.user.userType === 'PRODUCER') {
      product.listedByProducer = true;
    }
  }

  setInventoryObject(product) {
    return {
      product: product,
      price: this.price[product.ocpc],
      count: this.quantity[product.ocpc]
    };
  }

  createInventory(product) {
    this.setListedOwnerField(product);
    const invProd = this.setInventoryObject(product);
    const inv = {
      owner: this.user._id,
      items: [invProd]
    };

    this.inventoryService
      .createInventory(inv)
      .then(res => {
        this.inventory.items.push(invProd);
        this.filterExistingProducts();
      });
  }

  loadInventory() {
    this.inventoryService
      .findInventoryByOwner(this.user)
      .then(inventory => {
        if (inventory.length > 0) {
          this.inventory = inventory[0];
          this.filterExistingProducts();
        }
      });
  }

  comparer(otherArray) {
    return function(current) {
      return otherArray.filter(function(other) {
        return other.product.ocpc === current.ocpc;
      }).length === 0;
    };
  }

  filterExistingProducts() {
    const items = this.inventory.items;
    const result = this.products.filter(this.comparer(items));
    this.products = result;
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
              .then(products => {
                this.products = products.data;
                this.loadInventory();
              });
          } else {
            this.productService.findAllProducts()
              .then(products => {
                this.products = products;
                this.loadInventory();
              });
          }
        }
      });
  }
}
