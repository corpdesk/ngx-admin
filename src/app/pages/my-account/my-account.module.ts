import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyAccountRoutingModule } from './my-account-routing.module';
import { PersonalDataComponent } from './personal-data/personal-data.component';
import { CalendarComponent } from './calendar/calendar.component';
import { ActivityComponent } from './activity/activity.component';
import { ContactsComponent } from './contacts/contacts.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MyAccountComponent } from './my-account/my-account.component';


@NgModule({
  declarations: [PersonalDataComponent, CalendarComponent, ActivityComponent, ContactsComponent, DashboardComponent, MyAccountComponent],
  imports: [
    CommonModule,
    MyAccountRoutingModule
  ]
})
export class MyAccountModule { }
