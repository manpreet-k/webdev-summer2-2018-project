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

  constructor(private productService: ProductServiceClient,
    private inventoryService: InventoryServiceClient,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.productService.findProductById(params.productId)
        .then(product => this.product = product);
      this.inventoryService.findAllInventoriesForProduct(params.productId)
        .then(inventories => this.inventories = inventories);
    });
  }

  showListing(inventory) {

  }

}