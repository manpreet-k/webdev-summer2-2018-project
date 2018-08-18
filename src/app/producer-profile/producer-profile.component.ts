import { Component, OnInit } from '@angular/core';
import {ProducerProductsServiceClient} from '../services/producer-products.service.client';
import {ActivatedRoute, Router} from '@angular/router';
import {UserServiceClient} from '../services/user.service.client';

@Component({
  selector: 'app-producer-profile',
  templateUrl: './producer-profile.component.html',
  styleUrls: ['./producer-profile.component.css']
})
export class ProducerProfileComponent implements OnInit {

  username = 'XYZ';
  listedProducts;

  constructor(private service: ProducerProductsServiceClient,
              private userService: UserServiceClient,
              private aRoute: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {

  }

}
