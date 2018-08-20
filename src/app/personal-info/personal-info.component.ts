import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UserServiceClient} from '../services/user.service.client';
import {User} from '../models/user.model.client';

@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.css']
})
export class PersonalInfoComponent implements OnInit {

  user: User = new User();
  userId;
  constructor(private userService: UserServiceClient,
              private aRoute: ActivatedRoute,
              private router: Router) {
    this.aRoute.params.subscribe(params => this.setParams(params));
  }

  setParams(params) {
    alert(params.userId)
    this.userId = params.userId;
    this.loadUsers();
  }

  loadUsers() {
    this.userService
      .findUserById(this.userId)
      .then (user => {
        if (user !== null) {
          this.user = user;
        }
      });
  }

  ngOnInit() {

  }
}
