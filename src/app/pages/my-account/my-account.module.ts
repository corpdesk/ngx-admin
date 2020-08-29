// import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SparklineModule, SparklineTooltipService } from '@syncfusion/ej2-angular-charts';


import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';


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
import { PlannerComponent } from './planner/planner.component';


FullCalendarModule.registerPlugins([ // register FullCalendar plugins
  dayGridPlugin,
  timeGridPlugin,
  listPlugin,
  interactionPlugin
]);

@NgModule({
  declarations: [
    PersonalDataComponent,
    CalendarComponent,
    ActivityComponent,
    ContactsComponent,
    DashboardComponent,
    MyAccountComponent,
    PlannerComponent,
  ],
  imports: [
    CommonModule,
    SparklineModule,
    FullCalendarModule,
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
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  providers:[SparklineTooltipService],
  exports:[CalendarComponent]
})
export class MyAccountModule { }
