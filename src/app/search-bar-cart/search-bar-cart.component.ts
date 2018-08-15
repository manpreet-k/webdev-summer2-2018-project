import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-search-bar-cart',
  templateUrl: './search-bar-cart.component.html',
  styleUrls: ['./search-bar-cart.component.css']
})
export class SearchBarCartComponent implements OnInit {

  @Input() loggedIn;
  searchText = '';

  constructor() { }

  ngOnInit() {
  }

  selectProduct() {}

}
