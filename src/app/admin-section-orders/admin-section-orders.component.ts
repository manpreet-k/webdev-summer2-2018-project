import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {UserServiceClient} from '../services/user.service.client';
import {OrderServiceClient} from '../services/order.service.client';


@Component({
  selector: 'app-admin-section-orders',
  templateUrl: './admin-section-orders.component.html',
  styleUrls: ['./admin-section-orders.component.css']
})
export class AdminSectionOrdersComponent implements OnInit {

  newOrder;

  orders;

  Requester = '';

  Receiver;

  Price = '';

  OrderStatus = '';

  username = 'Visitor';


  constructor(private route: ActivatedRoute,
              private userService: UserServiceClient,
              private orderService: OrderServiceClient) {
    this.route.params.subscribe(params => this.loadOrders(params['username']));
  }

  ngOnInit() {
  }

  loadOrders(username) {
    this.username = username;
    this.orderService.findAllOrders()
      .then(orders => this.orders = orders);
    console.log('');
  }

  createOrder() {

  }


  updateOrder(){
    this.newOrder.requester['firstName'] = this.Requester;
    this.newOrder.receiver['firstName'] = this.Receiver;
    // this.newOrder.items[0].pricePerUnit = this.Price;
    this.newOrder.status = this.OrderStatus;
    console.log(this.newOrder);
    this.orderService.updateOrder(this.newOrder._id,this.newOrder)
      .then(response => console.log(response));

  }

 


  editSection(order)
  {

    this.Requester = order.requester['firstName'];

    this.Receiver = order.receiver['firstName'];

    this.Price = order.items[0].pricePerUnit;

    this.OrderStatus = order['status'];

    this.newOrder = order;
  }
  deleteOrder(orderId) {
    this.orderService.deleteOrder(orderId).then();
  }
}
