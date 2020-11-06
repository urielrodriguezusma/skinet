import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IOrder } from '../shared/models/order';
import { OrderService } from './order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  orders$: Observable<IOrder[]>;
  constructor(
    private orderService: OrderService,
    private route: Router) { }

  ngOnInit(): void {
    this.getOrders();
  }

  getOrders() {
    this.orders$ = this.orderService.getOrders();
  }

  detailOrder(order: IOrder) {
    const navigationExtras: NavigationExtras = { state: order };
    this.route.navigate(['/orders', order.id], navigationExtras);
  }

}
