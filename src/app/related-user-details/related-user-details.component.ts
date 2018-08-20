import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UserServiceClient} from '../services/user.service.client';
import {OrderServiceClient} from '../services/order.service.client';

@Component({
  selector: 'app-related-user-details',
  templateUrl: './related-user-details.component.html',
  styleUrls: ['./related-user-details.component.css']
})
export class RelatedUserDetailsComponent implements OnInit {

  userId;
  user;
  requester;
  receiver;
  orders;
  loggedInUser;

  constructor(private service: OrderServiceClient,
              private userService: UserServiceClient,
              private aRoute: ActivatedRoute,
              private router: Router) {
    this.aRoute.params.subscribe(params => this.setParams(params));
  }

  setParams(params) {
    this.userId = params.userId;
    this.loadUser();
  }

  convertDate(date) {
    return new Date(date).toDateString();
  }

  loadCurrentUser() {
    this.userService
      .currentUser()
      .then(user => {
        if (user !== null && this.user != null) {
          this.loggedInUser = user;
          if (this.user.userType === 'RETAILER') {
            // load all the orders with this.user as receiver and user as receiver
            this.service
              .findRelatedOrders(this.user._id, user._id)
              .then (orders => {
                if (orders) {
                  this.orders = orders;
                  this.requester = user;
                  this.receiver = this.user;
                }
              });
          } else {
            // load all the orders with this.user as requester and user as requester
            this.service
              .findRelatedOrders(user._id, this.user._id)
              .then (orders => {
                if (orders) {
                  this.orders = orders;
                  this.requester = this.user;
                  this.receiver = user;
                }
              });
          }
        }
      })
  }

  loadUser() {
    this.userService
      .findUserById(this.userId)
      .then (user => {
        if (user !== null) {
          this.user = user;
          this.loadCurrentUser();
        }
      });
  }

  ngOnInit() {
    this.loadUser();
  }

}
