import { Component, OnInit } from '@angular/core';
import {AuthService} from 'angular-6-social-login';
import {Router} from '@angular/router';
import {UserServiceClient} from '../services/user.service.client';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  user: any = {};
  showError;
  errorText;
  verifyPassword;

  constructor(private router: Router,
              private userService: UserServiceClient) {}

  register() {
    this.userService
      .register(this.user)
      .then(loggedIn => {
        if (loggedIn !== null) {
          this.showError = false;
          if (loggedIn.userType === 'BUYER') {
            this.router.navigate(['home']);
          } else {
            this.router.navigate(['profile/' + loggedIn._id]);
          }
        } else {
          this.showError = true;
          this.errorText = 'Email is already registered';
        }
      })
      .catch(error => {
        this.showError = true;
        this.errorText = 'Email is already registered';
      });
  }

  ngOnInit() {
  }

}
