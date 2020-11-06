import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { BasketService } from 'src/app/basket/basket.service';
import { OrderService } from 'src/app/orders/order.service';
import { IBasket, IBasketItem } from '../../models/basket';
import { OrderItem } from '../../models/order';

@Component({
  selector: 'app-basket-summary',
  templateUrl: './basket-summary.component.html',
  styleUrls: ['./basket-summary.component.scss'],
})
export class BasketSummaryComponent implements OnInit {

  @Output() decremet = new EventEmitter<any>();
  @Output() increment = new EventEmitter<any>();
  @Output() remove = new EventEmitter<any>();
  @Input() isBasket = true;
  @Input() items: IBasketItem[] | OrderItem[] = [];
  @Input() isSummary = false;


  constructor() { }

  ngOnInit(): void {

  }

  incrementItemQuantity(item: IBasketItem) {
    this.increment.emit(item);
  }

  decrementItemQuantity(item: IBasketItem) {
    this.decremet.emit(item);
  }

  removeBasketItem(item: IBasketItem) {
    this.remove.emit(item);
  }
}
