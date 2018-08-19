import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { InventoryServiceClient } from '../services/inventory.service.client';
import { ProductServiceClient } from '../services/product.service.client';

@Component({
  selector: 'app-product-viewer',
  templateUrl: './product-viewer.component.html',
  styleUrls: ['./product-viewer.component.css']
})
export class ProductViewerComponent implements OnInit {

  product;
  inventories;
  listings;
  selectedListing;
  buyAmount = 1;

  constructor(private productService: ProductServiceClient,
    private inventoryService: InventoryServiceClient,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
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
    console.log(this.buyAmount);
  }

}
