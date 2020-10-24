import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BasketService } from 'src/app/basket/basket.service';
import { IProduct } from 'src/app/shared/models/product';
import { BreadcrumbService } from 'xng-breadcrumb';
import { ShopService } from '../shop.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  product: IProduct;
  quantity = 1;

  constructor(
    private shopService: ShopService,
    private route: ActivatedRoute,
    private bcService: BreadcrumbService,
    private basketService: BasketService) {
  }

  ngOnInit(): void {
    this.bcService.set('@productDetails', '');
    this.loadProduct();
  }

  addItemToBasket() {
    this.basketService.addItemToBasket(this.product, this.quantity);
  }

  incrementQuantity() {
    this.quantity++;
  }

  decremetQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  loadProduct() {
    this.shopService.getProduct(+this.route.snapshot.paramMap.get('id')).subscribe(prod => {
      this.product = prod;
      this.bcService.set('@productDetails', this.product.name);
    }, error => {
      console.log(error);
    });
  }

}
