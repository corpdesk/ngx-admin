import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CdKioskComponent } from './cd-kiosk/cd-kiosk.component';
import { ProductCardsComponent } from './product-cards/product-cards.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductInfoComponent } from './product-info/product-info.component';
import { ProductManagerComponent } from './product-manager/product-manager.component';
import { WishListComponent } from './wish-list/wish-list.component';
import { OrdersComponent } from './orders/orders.component';
import { OnlinePaymentComponent } from './online-payment/online-payment.component';


const routes: Routes = [
  {
    path: '',
    component: CdKioskComponent,
    children: [
      {
        path: 'product-cards',
        component: ProductCardsComponent,
      },
      {
        path: 'product-list',
        component: ProductListComponent,
      },
      {
        path: 'product-info',
        component: ProductInfoComponent,
      },
      {
        path: 'product-manager',
        component: ProductManagerComponent,
      },
      {
        path: 'wish-list',
        component: WishListComponent,
      },
      {
        path: 'orders',
        component: OrdersComponent,
      },
      {
        path: 'online-payment',
        component: OnlinePaymentComponent,
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CdKioskRoutingModule { }
