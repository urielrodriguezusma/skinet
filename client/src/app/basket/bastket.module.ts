import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BastketRoutingModule } from './bastket-routing.module';
import { BasketComponent } from './basket.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    BasketComponent
  ],
  imports: [
    CommonModule,
    BastketRoutingModule,
    SharedModule
  ]
})
export class BastketModule { }
