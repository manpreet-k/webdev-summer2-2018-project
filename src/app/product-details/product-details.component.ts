 import { Component, OnInit } from '@angular/core';
 import {ActivatedRoute, Router} from '@angular/router';
 import {ProductServiceClient} from '../services/product.service.client';
 import {InventoryServiceClient} from '../services/inventory.service.client';
 import {Inventory} from '../models/inventory.model.client';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  product: any = {};
  listings = [];
  selectedListing;

  constructor(private service: ProductServiceClient,
              private aRoute: ActivatedRoute,
              private inventoryService: InventoryServiceClient,
              private router: Router) {
    this.aRoute.params.subscribe(params =>
      this.loadProductDetails(params['productId']));
  }

  loadProductDetails(productId) {
    this.service
      .findProductById(productId)
      .then (product => {
        this.product = product;
        this.inventoryService
          .findAllInventoriesForProduct(productId)
          .then(inventories => {
            this.listings = this.retrieveListings(inventories, product);
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

  ngOnInit() {
  }

}
