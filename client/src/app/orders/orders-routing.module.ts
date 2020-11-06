import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { OrderComponent } from './order.component';


const routes: Routes = [
  { path: '', component: OrderComponent },
  { path: ':id', component: OrderDetailComponent, data: { breadcrumb: { alias: 'OrderDetailed' } } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdersRoutingModule { }
