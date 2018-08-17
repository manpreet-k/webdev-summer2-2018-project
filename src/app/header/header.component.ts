import {Component, Input, OnInit} from '@angular/core';
import {UserServiceClient} from '../services/user.service.client';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Input() username;

  constructor(private service: UserServiceClient,
              private router: Router) { }

  logout() {
    this.service
      .logout()
      .then(() =>
        this.router.navigate(['home']));
  }

  ngOnInit() {
  }

}
