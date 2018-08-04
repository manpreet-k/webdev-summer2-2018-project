import { Component, OnInit } from '@angular/core';
import {ProductsServiceClient} from '../services/products.service.client';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private service: ProductsServiceClient) { }

  products = [];

  ngOnInit() {
    this.service.findAllProducts()
      .then(products => this.products = products.data);
  }

}
