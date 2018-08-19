import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UserServiceClient} from '../services/user.service.client';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  userId;
  user: any = {};

  constructor(private userService: UserServiceClient,
              private aRoute: ActivatedRoute,
              private router: Router) {
    this.aRoute.params.subscribe(params => this.setUserId(params));
  }

  setUserId(params) {
    this.userId = params.userId;
  }

  ngOnInit() {
    this.userService
      .currentUser()
      .then (user => {
        if (user !== null) {
          this.user = user;
        } else {
          alert('Session Expired');
          this.router.navigate(['/home']);
        }
      });
  }
}
