import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IOrder } from '../shared/models/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private baseUrl = environment.baseUrl;
  orderDetail: IOrder;
  constructor(private http: HttpClient) { }

  getOrders(): Observable<IOrder[]> {
    return this.http.get<IOrder[]>(`${this.baseUrl}/orders`);
  }

  getOrderDetailed(id: number) {
    return this.http.get<IOrder>(`${this.baseUrl}/orders/${id}`);
  }
}
