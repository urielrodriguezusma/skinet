import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BasketService } from 'src/app/basket/basket.service';
import { IBasket, IBasketItem } from 'src/app/shared/models/basket';

@Component({
  selector: 'app-nav-var',
  templateUrl: './nav-var.component.html',
  styleUrls: ['./nav-var.component.scss'],
})
export class NavVarComponent implements OnInit {

  constructor(private basketService: BasketService) { }

  basket$: Observable<IBasket>;
  ngOnInit(): void {
    this.basket$ = this.basketService.basket$;
  }

}
