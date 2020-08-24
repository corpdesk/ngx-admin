import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

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
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
      },{
        path: 'accounts',
        component: AccountsComponent,
      },
      {
        path: 'bank',
        component: BankComponent,
      },
      {
        path: 'budget',
        component: BudgetComponent,
      },
      {
        path: 'trail',
        component: TrailComponent,
      },
      {
        path: 'activity',
        component: ActivityComponent,
      },
      {
        path: 'hrm',
        component: HrmComponent,
      },
      {
        path: 'payment',
        component: PaymentComponent,
      },
      {
        path: 'accts',
        component: AcctsComponent,
      },
      {
        path: 'deductions',
        component: DeductionsComponent,
      },
      {
        path: 'grades',
        component: GradesComponent,
      },
      {
        path: 'coa',
        component: CoaComponent,
      },
      {
        path: 'currency',
        component: CurrencyComponent,
      },
      {
        path: 'delivery',
        component: DeliveryComponent,
      },
      {
        path: 'ext-invoice',
        component: ExtInvoiceComponent,
      },
      {
        path: 'ext-quote',
        component: ExtQuoteComponent,
      },
      {
        path: 'int-quote',
        component: IntQuoteComponent,
      },
      {
        path: 'int-invoice',
        component: IntInvoiceComponent,
      },
      {
        path: 'inventory',
        component: InventoryComponent,
      },
      {
        path: 'payroll',
        component: PayrollComponent,
      },
      {
        path: 'procurement',
        component: ProcurementComponent,
      },
      {
        path: 'report',
        component: ReportComponent,
      },
      {
        path: 'requisition',
        component: RequisitionComponent,
      },
      {
        path: 'sale',
        component: SaleComponent,
      },
      {
        path: 'product',
        component: ProductComponent,
      },
      {
        path: 'service',
        component: ServiceComponent,
      },
      {
        path: 'store',
        component: StoreComponent,
      },
      {
        path: 'tax',
        component: TaxComponent,
      },
      {
        path: 'transact',
        component: TransactComponent,
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AcctsRoutingModule { }
