import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShopRoutingModule } from './shop-routing.module';
import { ShopComponent } from './shop.component';
import { ShopService } from './shop.service';
import { ProductItemComponent } from './product-item/product-item.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [ShopComponent, ProductItemComponent],
  imports: [
    CommonModule,
    ShopRoutingModule,
    SharedModule
  ],
  providers: [
    ShopService
  ],
  exports: [
    ShopComponent
  ]
})
export class ShopModule { }
