import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IDeliveryMethods } from '../shared/models/deliveryMethod';
import { IOrder, IOrderToCreate } from '../shared/models/order';


@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  private baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) { }

  getDeliveryMethods() {
    return this.http.get(`${this.baseUrl}/orders/deliveryMethods`).pipe(
      map((dm: IDeliveryMethods[]) => {
        return dm.sort((a, b) => b.price - a.price);
      })
    );
  }

  createOrder(order: IOrderToCreate): Observable<IOrder> {
    return this.http.post<IOrder>(`${this.baseUrl}/orders`, order);
  }
}
