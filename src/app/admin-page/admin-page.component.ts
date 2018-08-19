import { Component, OnInit } from '@angular/core';
import {UserServiceClient} from '../services/user.service.client';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit {


  user = '';
  username = 'Visitor';
  users = '';

  constructor(private userService: UserServiceClient) { }

  ngOnInit() {
    this.loadUser();
    this.loadUsers();
  }

  loadUser() {
    this.userService
      .currentUser()
      .then(user => {
        if (user !== null) {
          this.user = user;
          this.username = user.firstName;
        } else {
          // alert('Session expired');
          // this.router.navigate(['/home']);
        }
      });
  }

  loadUsers(){
    this.userService
      .findAllUsers()
      .then(users => {
        this.users = users;
      });
  }
}
