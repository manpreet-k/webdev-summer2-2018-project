import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {AuthService, FacebookLoginProvider, GoogleLoginProvider} from 'angular-6-social-login';
import {UserServiceClient} from '../services/user.service.client';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  showError = false;
  errorText = '';
  email;
  password;

  constructor(private router: Router,
              private socialAuthService: AuthService,
              private userService: UserServiceClient) {
  }

  public socialSignIn(socialPlatform: string) {
    let socialPlatformProvider;
    if (socialPlatform === 'facebook') {
      socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
    } else if (socialPlatform === 'google') {
      socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    }

    this.socialAuthService.signIn(socialPlatformProvider).then(
      (userData) => {
        if (userData.email !== '') {
          const user = {
            email: userData.email,
            isSocialLogin: true
          };
          this.loginUser(user);
        } else {
          this.showError = true;
          this.errorText = 'Username empty';
        }
      }
    );
  }

  login() {
    const user = {
      email: this.email,
      password: this.password,
      isSocialLogin: false
    };
    this.loginUser(user);
  }

  loginUser(user) {
    this.userService
      .login(user)
      .then(loggedIn => {
        if (loggedIn !== null) {
          if (loggedIn.userType === 'BUYER') {
            this.router.navigate(['home']);
          } else {
            this.router.navigate(['profile/' + loggedIn._id]);
          }
        } else {
          this.showError = true;
          this.errorText = 'Invalid credentials';
        }
      })
      .catch(error => {
        this.showError = true;
        this.errorText = 'Invalid credentials';
      });
  }

  ngOnInit() {
  }

}
