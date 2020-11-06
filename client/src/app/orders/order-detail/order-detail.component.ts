import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IOrder } from 'src/app/shared/models/order';
import { BreadcrumbService } from 'xng-breadcrumb';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent implements OnInit {

  orderDetail: IOrder;
  constructor(
    private route: Router,
    private breadcrumbService: BreadcrumbService,
    private orderService: OrderService,
    private activateRoute: ActivatedRoute) {

    this.breadcrumbService.set('@OrderDetailed', '');
    const navigation = this.route.getCurrentNavigation();
    const state = navigation && navigation.extras && navigation.extras.state;
    if (state) {
      this.orderDetail = state as IOrder;
      this.setBreadCrumb();
    } else {
      this.orderService.getOrderDetailed(+this.activateRoute.snapshot.paramMap.get('id')).subscribe(order => {
        this.orderDetail = order;
        this.setBreadCrumb();
      });
    }
  }
  ngOnInit(): void {
  }

  private setBreadCrumb(): void {
    this.breadcrumbService.set('@OrderDetailed', `Order# ${this.orderDetail.id} - ${this.orderDetail.status}`);
  }

}
