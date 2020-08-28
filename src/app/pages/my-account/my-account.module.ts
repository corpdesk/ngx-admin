import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyAccountRoutingModule } from './my-account-routing.module';
import { CdPaletteModule } from '../cd-palette/cd-palette.module';
import { PersonalDataComponent } from './personal-data/personal-data.component';
import { CalendarComponent } from './calendar/calendar.component';
import { ActivityComponent } from './activity/activity.component';
import { ContactsComponent } from './contacts/contacts.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MyAccountComponent } from './my-account/my-account.component';

import { ThemeModule } from '../../@theme/theme.module';

import {
  NbAccordionModule,
  NbButtonModule,
  NbCardModule,
  NbIconModule,
  NbListModule,
  NbRouteTabsetModule,
  NbStepperModule,
  NbTabsetModule,
  NbUserModule,
} from '@nebular/theme';


@NgModule({
  declarations: [
    PersonalDataComponent,
    CalendarComponent,
    ActivityComponent,
    ContactsComponent,
    DashboardComponent,
    MyAccountComponent
  ],
  imports: [
    CommonModule,
    ThemeModule,
    NbAccordionModule,
    NbButtonModule,
    NbCardModule,
    NbIconModule,
    NbListModule,
    NbRouteTabsetModule,
    NbStepperModule,
    NbTabsetModule,
    NbUserModule,
    CdPaletteModule,
    MyAccountRoutingModule
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class MyAccountModule { }
