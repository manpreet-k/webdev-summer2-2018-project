import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ProducerProductsServiceClient} from '../services/producer-products.service.client';

@Component({
  selector: 'app-manage-products',
  templateUrl: './manage-products.component.html',
  styleUrls: ['./manage-products.component.css']
})
export class ManageProductsComponent implements OnInit {

  username = 'XYZ';
  listedProducts = [];

  constructor(private service: ProducerProductsServiceClient,
              private aRoute: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    if (this.username !== '') {
      const products = this.service
        .findAllListedProducts();
      // .then(products => this.listedProducts = products);
      console.log(products);
      this.listedProducts = products['data'];
      console.log(this.listedProducts);
    }
  }

  deleteProduct(productId) {
    // user product id and username to delete the record
    this.service;
  }
}
