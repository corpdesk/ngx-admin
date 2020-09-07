import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from '../cd-auth/auth-guard.service';

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
    canActivate: [ AuthGuardService ],
    children: [
      {
        path: 'product-cards',
        component: ProductCardsComponent,
        canActivate: [ AuthGuardService ],
      },
      {
        path: 'product-list',
        component: ProductListComponent,
        canActivate: [ AuthGuardService ],
      },
      {
        path: 'product-info',
        component: ProductInfoComponent,
        canActivate: [ AuthGuardService ],
      },
      {
        path: 'product-manager',
        component: ProductManagerComponent,
        canActivate: [ AuthGuardService ],
      },
      {
        path: 'wish-list',
        component: WishListComponent,
        canActivate: [ AuthGuardService ],
      },
      {
        path: 'orders',
        component: OrdersComponent,
        canActivate: [ AuthGuardService ],
      },
      {
        path: 'online-payment',
        component: OnlinePaymentComponent,
        canActivate: [ AuthGuardService ],
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CdKioskRoutingModule { }
