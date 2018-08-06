import { Component, OnInit } from '@angular/core';
import {ProductsServiceClient} from '../services/products.service.client';
import {SignInComponent} from '../sign-in/sign-in.component';
import {ActivatedRoute} from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})


export class HomeComponent implements OnInit {
  logged = false;
  constructor(private service: ProductsServiceClient,
              private route: ActivatedRoute) {
    this.route.params.subscribe(
      params => this.setParams(params));
  }

  setParams(params) {
    alert(params.logged);
    this.logged = params['courseId'];
  }

  products = [];
  //To be populated from Input Field

  productName;
  ngOnInit() {
    this.service.findAllProducts()
      .then(products => this.products = products.data);
  }

  selectProduct() {
  alert('search Functionality');
  }

}
