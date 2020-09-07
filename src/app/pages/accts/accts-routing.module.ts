import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from '../cd-auth/auth-guard.service';

import { AccountsComponent } from './accounts/accounts.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BankComponent } from './bank/bank.component';
import { BudgetComponent } from './budget/budget.component';
import { TrailComponent } from './trail/trail.component';
import { ActivityComponent } from './activity/activity.component';
import { HrmComponent } from './hrm/hrm.component';
import { PaymentComponent } from './payment/payment.component';
import { DeductionsComponent } from './deductions/deductions.component';
import { GradesComponent } from './grades/grades.component';
import { CoaComponent } from './coa/coa.component';
import { CurrencyComponent } from './currency/currency.component';
import { DeliveryComponent } from './delivery/delivery.component';
import { ExtInvoiceComponent } from './ext-invoice/ext-invoice.component';
import { ExtQuoteComponent } from './ext-quote/ext-quote.component';
import { IntQuoteComponent } from './int-quote/int-quote.component';
import { IntInvoiceComponent } from './int-invoice/int-invoice.component';
import { InventoryComponent } from './inventory/inventory.component';
import { PayrollComponent } from './payroll/payroll.component';
import { ProcurementComponent } from './procurement/procurement.component';
import { ReportComponent } from './report/report.component';
import { RequisitionComponent } from './requisition/requisition.component';
import { SaleComponent } from './sale/sale.component';
import { ServiceComponent } from './service/service.component';
import { ProductComponent } from './product/product.component';
import { StoreComponent } from './store/store.component';
import { TaxComponent } from './tax/tax.component';
import { TransactComponent } from './transact/transact.component';
import { AcctsComponent } from './accts/accts.component';





const routes: Routes = [
  {
    path: '',
    component: AcctsComponent,
    canActivate: [ AuthGuardService ],
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [ AuthGuardService ],
      },{
        path: 'accounts',
        component: AccountsComponent,
        canActivate: [ AuthGuardService ],
      },
      {
        path: 'bank',
        component: BankComponent,
        canActivate: [ AuthGuardService ],
      },
      {
        path: 'budget',
        component: BudgetComponent,
        canActivate: [ AuthGuardService ],
      },
      {
        path: 'trail',
        component: TrailComponent,
        canActivate: [ AuthGuardService ],
      },
      {
        path: 'activity',
        component: ActivityComponent,
        canActivate: [ AuthGuardService ],
      },
      {
        path: 'hrm',
        component: HrmComponent,
        canActivate: [ AuthGuardService ],
      },
      {
        path: 'payment',
        component: PaymentComponent,
        canActivate: [ AuthGuardService ],
      },
      {
        path: 'accts',
        component: AcctsComponent,
        canActivate: [ AuthGuardService ],
      },
      {
        path: 'deductions',
        component: DeductionsComponent,
        canActivate: [ AuthGuardService ],
      },
      {
        path: 'grades',
        component: GradesComponent,
        canActivate: [ AuthGuardService ],
      },
      {
        path: 'coa',
        component: CoaComponent,
        canActivate: [ AuthGuardService ],
      },
      {
        path: 'currency',
        component: CurrencyComponent,
        canActivate: [ AuthGuardService ],
      },
      {
        path: 'delivery',
        component: DeliveryComponent,
        canActivate: [ AuthGuardService ],
      },
      {
        path: 'ext-invoice',
        component: ExtInvoiceComponent,
        canActivate: [ AuthGuardService ],
      },
      {
        path: 'ext-quote',
        component: ExtQuoteComponent,
        canActivate: [ AuthGuardService ],
      },
      {
        path: 'int-quote',
        component: IntQuoteComponent,
        canActivate: [ AuthGuardService ],
      },
      {
        path: 'int-invoice',
        component: IntInvoiceComponent,
        canActivate: [ AuthGuardService ],
      },
      {
        path: 'inventory',
        component: InventoryComponent,
        canActivate: [ AuthGuardService ],
      },
      {
        path: 'payroll',
        component: PayrollComponent,
        canActivate: [ AuthGuardService ],
      },
      {
        path: 'procurement',
        component: ProcurementComponent,
        canActivate: [ AuthGuardService ],
      },
      {
        path: 'report',
        component: ReportComponent,
        canActivate: [ AuthGuardService ],
      },
      {
        path: 'requisition',
        component: RequisitionComponent,
        canActivate: [ AuthGuardService ],
      },
      {
        path: 'sale',
        component: SaleComponent,
        canActivate: [ AuthGuardService ],
      },
      {
        path: 'product',
        component: ProductComponent,
        canActivate: [ AuthGuardService ],
      },
      {
        path: 'service',
        component: ServiceComponent,
        canActivate: [ AuthGuardService ],
      },
      {
        path: 'store',
        component: StoreComponent,
        canActivate: [ AuthGuardService ],
      },
      {
        path: 'tax',
        component: TaxComponent,
        canActivate: [ AuthGuardService ],
      },
      {
        path: 'transact',
        component: TransactComponent,
        canActivate: [ AuthGuardService ],
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AcctsRoutingModule { }
