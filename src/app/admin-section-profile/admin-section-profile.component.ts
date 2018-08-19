import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Route, Router} from '@angular/router';
import {UserServiceClient} from '../services/user.service.client';

@Component({
  selector: 'app-admin-section-profile',
  templateUrl: './admin-section-profile.component.html',
  styleUrls: ['./admin-section-profile.component.css']
})
export class AdminSectionProfileComponent implements OnInit {

  username = '';

  user: any = {};

  // users = {email: '' ,
  // password: '',
  // firstName: '',
  // lastName: '',
  // phone: '',
  // street:'',
  // city: '',
  // state: '',
  // zip: '',
  // profileImage: '',
  // userType: ''};

  profileNotSelect = false;
  constructor(private router: Router,
              private route: ActivatedRoute,
              private userService: UserServiceClient) {
    this.route.params.subscribe(params => this.loadProfile(params['username']));
  }

  ngOnInit() {
  }
  loadProfile(username){
    if(username !== undefined)
    {
      this.username= username;
      this.userService
        .findUserByUsername(username)
        .then(user => {
          if (user !== null) {
            this.user = user;
          } else {
            // alert('Session expired');
            // this.router.navigate(['/home']);
          }
        });
    }else {
      this.profileNotSelect = true;
      console.log(username);
    }

  }

  create() {
    alert(this.user);
    this.userService.register(this.user)
      .then(res => this.router.navigate(['/admin']));
  }

  update() {
    // this.user.username = this.username;
    // this.user.firstName = this.firstName;
    // this.user.lastName = this.lastName;
    // this.user.email = this.email;
    this.userService.update(this.user)
      .then(user => this.user = user)
      .then((() => alert('Details updated successfully!')));
  }

  delete() {
    this.userService.delete(this.user._id)
      .then(() => {alert('User deleted successfully!')
      this.router.navigate(['/admin']);
      });

  }

}
