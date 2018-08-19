import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { InventoryServiceClient } from '../services/inventory.service.client';
import { ProductServiceClient } from '../services/product.service.client';
import { UserServiceClient } from '../services/user.service.client';
import { Product } from '../models/product.model.client';
import { Inventory } from '../models/inventory.model.client';
import { User } from '../models/user.model.client';

@Component({
  selector: 'app-product-viewer',
  templateUrl: './product-viewer.component.html',
  styleUrls: ['./product-viewer.component.css']
})
export class ProductViewerComponent implements OnInit {

  product: Product;
  inventories: Inventory[];
  listings = [];
  selectedListing;
  buyAmount = 1;
  user: User;

  constructor(private userService: UserServiceClient,
    private productService: ProductServiceClient,
    private inventoryService: InventoryServiceClient,
    private activatedRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.userService.profile().then(user => this.user = user);
    this.activatedRoute.params.subscribe(params => {
      this.productService.findProductById(params.productId)
        .then(product => {
          this.product = product;
          this.inventoryService.findAllInventoriesForProduct(params.productId)
            .then(inventories => {
              this.listings = this.retrieveListings(inventories, product);
            });
        });
    });
  }

  retrieveListings(inventories, product) {
    const listings = [];
    for (const inventory of inventories) {
      for (const item of inventory.items) {
        if (item.product._id === product._id) {
          listings.push({ item, owner: inventory.owner });
        }
      }
    }
    return listings;
  }

  selectListing(listing) {
    this.selectedListing = listing;
  }

  addToCart() {
    if (this.buyAmount > 0) {
      const item = {
        retailer: this.selectedListing.owner,
        product: this.selectedListing.item.product,
        count: this.buyAmount,
        price: this.selectedListing.item.price
      };
      this.user.shoppingCart.push(item);
      this.userService.updateShoppingCart(this.user.shoppingCart)
        .then(() => this.router.navigate(['cart']));
    }
  }

}
