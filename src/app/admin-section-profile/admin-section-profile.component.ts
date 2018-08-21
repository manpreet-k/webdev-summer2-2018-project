import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { UserServiceClient } from '../services/user.service.client';
import { User } from '../models/user.model.client';

@Component({
  selector: 'app-admin-section-profile',
  templateUrl: './admin-section-profile.component.html',
  styleUrls: ['./admin-section-profile.component.css']
})
export class AdminSectionProfileComponent implements OnInit {

  username = '';

  user: User = new User() ;

  profileNotSelect = false;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private userService: UserServiceClient) {
    this.route.params.subscribe(params => this.loadProfile(params['userId']));
  }

  ngOnInit() {
  }
  loadProfile(userId) {
    if (userId !== undefined) {
      this.userService
        .findUserById(userId)
        .then(user => {
          if (user !== null) {
            this.user = user;
          } else {
            // alert('Session expired');
            // this.router.navigate(['/home']);
          }
        });
    } else {
      this.profileNotSelect = true;
    }

  }

  create() {
    if (this.user.firstName !== '' ) {
      this.userService.register(this.user)
        .then(() => {
                      alert('New User added');
                      this.user = new User();
                      this.router.navigate(['/admin'])
        });
    }else {
      alert('please enter the details and try again');
    }

  }

  update() {
    this.userService.update(this.user)
      .then(user => this.user = user)
      .then((() => alert('Details updated successfully!')));
      this.router.navigate(['/admin'])
  }

  delete() {
    this.userService.delete(this.user._id)
      .then(() => {
        alert('User deleted successfully!');
        this.router.navigate(['/admin']);
      });

  }

}
