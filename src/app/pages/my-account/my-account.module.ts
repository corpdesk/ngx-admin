// import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SparklineModule, SparklineTooltipService } from '@syncfusion/ej2-angular-charts';
import { NgxTextEditorModule } from 'ngx-text-editor';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
// import { QuillModule } from 'ngx-quill';
import { EditorModule } from '@tinymce/tinymce-angular';

// tutorial: https://morioh.com/p/cea985ce3632
import { AngularEditorModule } from '@kolkov/angular-editor';


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
import { AclModule } from '../acl/acl.module';
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

import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatTreeModule } from '@angular/material/tree';
import { MatStepperModule } from '@angular/material/stepper';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';

const materialModules = [
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatNativeDateModule,
  MatDatepickerModule,
  MatCheckboxModule,
  MatSlideToggleModule,
  MatRadioModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatTreeModule,
  MatStepperModule,
  MatIconModule,
  MatChipsModule,
];

import { CdMemoComponent } from './cd-memo/cd-memo.component';
import { IntrayComponent } from './intray/intray.component';
import { ReadDocComponent } from './read-doc/read-doc.component';
import { ComposeDocComponent } from './compose-doc/compose-doc.component';
import { DocTrayComponent } from './doc-tray/doc-tray.component';
import { InteRactComponent } from './inte-ract/inte-ract.component';
import { ReplyDocComponent } from './reply-doc/reply-doc.component';
import { DocThreadComponent } from './doc-thread/doc-thread.component';

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
    ReplyDocComponent,
    DocThreadComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
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
    ...materialModules,
    CdPaletteModule,
    AclModule,
    MyAccountRoutingModule,
    NgxTextEditorModule,
    FroalaEditorModule.forRoot(), FroalaViewModule.forRoot(),
    AngularEditorModule,
    EditorModule,
    // QuillModule.forRoot(),
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
