import {Component, Input, OnInit} from '@angular/core';
import {UserServiceClient} from '../services/user.service.client';
import {ActivatedRoute, Router} from '@angular/router';
import { User } from '../models/user.model.client';

@Component({
  selector: 'app-user-personal-info',
  templateUrl: './user-personal-info.component.html',
  styleUrls: ['./user-personal-info.component.css']
})
export class UserPersonalInfoComponent implements OnInit {

  @Input() userId;

  user: User;
  editMode = false;
  tmpUser: User;
  visitor = false;

  constructor(private userService: UserServiceClient,
              private aRoute: ActivatedRoute,
              private router: Router) {}

  update() {
    this.userService
      .update(this.user)
      .then(newUser => {
        this.user = newUser;
        this.editMode = false;
      });
  }

  enableEdit() {
    this.tmpUser = Object.assign({}, this.user);
    this.editMode = true;
  }

  cancelEdit() {
    this.editMode = false;
    this.user = Object.assign({}, this.tmpUser);
  }

  ngOnInit() {
    this.userService
      .currentUser()
      .then (user => {
        if (user !== null) {
          this.user = user;
          this.visitor = user._id !== this.userId;
        } else {
          alert('Session Expired');
          this.router.navigate(['/home']);
        }
      });
  }
}
