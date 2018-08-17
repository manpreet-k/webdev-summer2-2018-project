 import { Component, OnInit } from '@angular/core';
 import {ProducerProductsServiceClient} from '../services/producer-products.service.client';
 import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  product = {};
  constructor(private service: ProducerProductsServiceClient,
              private aRoute: ActivatedRoute,
              private router: Router) {
    this.aRoute.params.subscribe(params =>
      this.loadProductDetails(params['productId']));
  }

  loadProductDetails(productId) {
    const products = this.service
      .findProductById(productId);

    this.product = products['data'][productId];

  }

  ngOnInit() {
  }

}
