import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AcctsRoutingModule } from './accts-routing.module';
import { AccountsComponent } from './accounts/accounts.component';
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
import { StoreComponent } from './store/store.component';
import { TaxComponent } from './tax/tax.component';
import { TransactComponent } from './transact/transact.component';
import { AcctsComponent } from './accts/accts.component';
import { ProductComponent } from './product/product.component';
import { DashboardComponent } from './dashboard/dashboard.component';


@NgModule({
  declarations: [AccountsComponent, BankComponent, BudgetComponent, TrailComponent, ActivityComponent, HrmComponent, PaymentComponent, DeductionsComponent, GradesComponent, CoaComponent, CurrencyComponent, DeliveryComponent, ExtInvoiceComponent, ExtQuoteComponent, IntQuoteComponent, IntInvoiceComponent, InventoryComponent, PayrollComponent, ProcurementComponent, ReportComponent, RequisitionComponent, SaleComponent, ServiceComponent, StoreComponent, TaxComponent, TransactComponent, AcctsComponent, ProductComponent, DashboardComponent],
  imports: [
    CommonModule,
    AcctsRoutingModule
  ]
})
export class AcctsModule { }
