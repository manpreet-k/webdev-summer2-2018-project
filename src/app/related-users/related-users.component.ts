import { Component, OnInit } from '@angular/core';
import {OrderServiceClient} from '../services/order.service.client';
import {ActivatedRoute, Router} from '@angular/router';
import {UserServiceClient} from '../services/user.service.client';
import {User} from '../models/user.model.client';

@Component({
  selector: 'app-related-users',
  templateUrl: './related-users.component.html',
  styleUrls: ['./related-users.component.css']
})
export class RelatedUsersComponent implements OnInit {

  userId;
  relatedUsers = [];
  selectedUserId;
  loggedInUser;
  constructor(private service: OrderServiceClient,
              private userService: UserServiceClient,
              private aRoute: ActivatedRoute,
              private router: Router) {
    this.aRoute.params.subscribe(params => this.setParams(params));
  }

  setParams(params) {
    this.userId = params.userId;
    this.loadUsers();
  }

  removeDuplicateRequesters(arr) {
    return arr.reduce((unique, o) => {
      if (!unique.some(obj => obj.requester === o.requester)) {
        unique.push(o);
      }
      return unique;
    }, []);
  }

  removeDuplicateReceivers(arr) {
    return arr.reduce((unique, o) => {
      if (!unique.some(obj => obj.receiver === o.receiver)) {
        unique.push(o);
      }
      return unique;
    }, []);
  }

  setSelectedUserId(user) {
    this.selectedUserId = user._id;
    this.router.navigate(['profile/related/' + this.selectedUserId]);
  }

  loadUsers() {
    this.userService
      .currentUser()
      .then(user => {
        if (user) {
          this.loggedInUser = user;
          if (user.userType === 'RETAILER') {
            this.service
              .findRelatedBuyers(user._id)
              .then(orders => {
                if (orders.length > 0) {
                  const relatedUsers = [];
                  for (let i = 0; i < orders.length; i++) {
                      relatedUsers.push(orders[i].requester);
                      this.relatedUsers = this.removeDuplicateRequesters(relatedUsers);
                  }
                }
              });
          } else if (user.userType === 'BUYER') {
            this.service
              .findRelatedCustomers(user._id)
              .then(orders => {
                if (orders.length > 0) {
                  const relatedUsers = [];
                  for (let i = 0; i < orders.length; i++) {
                      relatedUsers.push(orders[i].receiver);
                    this.relatedUsers = this.removeDuplicateReceivers(relatedUsers);
                  }
                }
              });
          }
        }
      });
  }

  ngOnInit() {
  }

}
