import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UserServiceClient} from '../services/user.service.client';
import {OrderServiceClient} from '../services/order.service.client';
import { Order } from '../models/order.model.client';
import { User } from '../models/user.model.client';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {

  userId;
  orderType;
  user: User;
  orders: Order[] = [];
  total;
  userType;

  constructor(private service: OrderServiceClient,
              private userService: UserServiceClient,
              private aRoute: ActivatedRoute,
              private router: Router) {
    this.aRoute.params.subscribe(params => this.setParams(params));
  }

  setParams(params) {
    this.userId = params.userId;
    this.orderType = params.order;
    this.loadOrders();
  }

  cancelOrder(order) {
    const status = {
      status: 'CANCELLED'
    };

    this.service
      .updateOrderStatus(order._id, status)
      .then(newOrder => {
        this.loadOrders();
      });
  }

  convertDate(date) {
    return new Date(date).toDateString();
  }

  fulfillOrder(order) {
    const status = {
      status: 'FULFILLED'
    };

    this.service
      .updateOrderStatus(order._id, status)
      .then(newOrder => {
        this.loadOrders();
      });
  }
  loadOrders() {
    this.userService
      .currentUser()
      .then(user => {
        if (user) {
          this.user = user;
          this.userType = user.userType;
          if (user.userType === 'RETAILER') {
            this.service
              .findOrdersOfStatusForRetailer(user, this.orderType)
              .then (orders => {
                this.orders = orders;
              });
          } else if (user.userType === 'BUYER') {
            // get all the orders for which this user is the requester
            this.service
              .findOrdersOfStatusForBuyer(user, this.orderType)
              .then (orders => {
                this.orders = orders;
              });
          }
        } else {
          alert('Session Expired');
          this.router.navigate(['/home']);
        }
      });
  }

  ngOnInit() {
  }

}
