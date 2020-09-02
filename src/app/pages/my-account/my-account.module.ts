// import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SparklineModule, SparklineTooltipService } from '@syncfusion/ej2-angular-charts';


import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';

import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { CalendarHeaderComponent } from './planner/calendar-header.component';
import { FlatpickrModule } from 'angularx-flatpickr';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';


import { MyAccountRoutingModule } from './my-account-routing.module';
import { CdPaletteModule } from '../cd-palette/cd-palette.module';
import { PersonalDataComponent } from './personal-data/personal-data.component';
import { CalendarComponent } from './calendar/calendar.component';
import { ActivityComponent } from './activity/activity.component';
import { ContactsComponent } from './contacts/contacts.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MyAccountComponent } from './my-account/my-account.component';
import { PlannerComponent } from './planner/planner.component';

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
import { CdMemoComponent } from './cd-memo/cd-memo.component';
import { IntrayComponent } from './intray/intray.component';
import { ReadDocComponent } from './read-doc/read-doc.component';
import { ComposeDocComponent } from './compose-doc/compose-doc.component';
import { DocTrayComponent } from './doc-tray/doc-tray.component';
import { InteRactComponent } from './inte-ract/inte-ract.component';



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
    CalendarHeaderComponent,
    PlannerComponent,
    CdMemoComponent,
    IntrayComponent,
    ReadDocComponent,
    ComposeDocComponent,
    DocTrayComponent,
    InteRactComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
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
    MyAccountRoutingModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    FlatpickrModule.forRoot(),
    NgbModalModule,
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  providers:[SparklineTooltipService],
  exports:[CalendarComponent]
})
export class MyAccountModule { }
