import { Component, OnInit } from '@angular/core';
import {ProducerProductsServiceClient} from '../services/producer-products.service.client';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-producer-profile',
  templateUrl: './producer-profile.component.html',
  styleUrls: ['./producer-profile.component.css']
})
export class ProducerProfileComponent implements OnInit {

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

  productDetails(productId) {
    this.router.navigate(['edit-product/' + productId]);
  }

}
