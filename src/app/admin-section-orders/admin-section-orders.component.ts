import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {UserServiceClient} from '../services/user.service.client';

@Component({
  selector: 'app-admin-section-orders',
  templateUrl: './admin-section-orders.component.html',
  styleUrls: ['./admin-section-orders.component.css']
})
export class AdminSectionOrdersComponent implements OnInit {

  order: any = {};

  orders: any ={};

  username = 'Visitor'
  constructor(private route: ActivatedRoute,
              private userService: UserServiceClient) {
    this.route.params.subscribe(params => this.loadOrders(params['username']));
  }

  ngOnInit() {
  }

  loadOrders(username){
    this.username = username;
  }

  createOrder(){

  }

  updateOrder(){

  }
}
