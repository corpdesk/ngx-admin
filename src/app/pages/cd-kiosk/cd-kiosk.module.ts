import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CdKioskRoutingModule } from './cd-kiosk-routing.module';
import { ProductCardsComponent } from './product-cards/product-cards.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductInfoComponent } from './product-info/product-info.component';
import { ProductManagerComponent } from './product-manager/product-manager.component';
import { WishListComponent } from './wish-list/wish-list.component';
import { OrdersComponent } from './orders/orders.component';
import { OnlinePaymentComponent } from './online-payment/online-payment.component';
import { CdKioskComponent } from './cd-kiosk/cd-kiosk.component';
import { FormProductInfoComponent } from './form-product-info/form-product-info.component';
import { FormProductScheduleComponent } from './form-product-schedule/form-product-schedule.component';
import { FormProductDevelopersComponent } from './form-product-developers/form-product-developers.component';
import { FormProductAvailabilityComponent } from './form-product-availability/form-product-availability.component';


@NgModule({
  declarations: [ProductCardsComponent, ProductListComponent, ProductInfoComponent, ProductManagerComponent, WishListComponent, OrdersComponent, OnlinePaymentComponent, CdKioskComponent, FormProductInfoComponent, FormProductScheduleComponent, FormProductDevelopersComponent, FormProductAvailabilityComponent],
  imports: [
    CommonModule,
    CdKioskRoutingModule
  ]
})
export class CdKioskModule { }
