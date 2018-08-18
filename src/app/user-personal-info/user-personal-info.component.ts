import {Component, Input, OnInit} from '@angular/core';
import {ProducerProductsServiceClient} from '../services/producer-products.service.client';
import {UserServiceClient} from '../services/user.service.client';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-user-personal-info',
  templateUrl: './user-personal-info.component.html',
  styleUrls: ['./user-personal-info.component.css']
})
export class UserPersonalInfoComponent implements OnInit {

  @Input() userId;

  user: any = {};
  openOrders: any = {};

  constructor(private service: ProducerProductsServiceClient,
              private userService: UserServiceClient,
              private aRoute: ActivatedRoute,
              private router: Router) {}

  update() {

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
