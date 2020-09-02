import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PersonalDataComponent } from './personal-data/personal-data.component';
import { CalendarComponent } from './calendar/calendar.component';
import { ActivityComponent } from './activity/activity.component';
import { ContactsComponent } from './contacts/contacts.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MyAccountComponent } from './my-account/my-account.component';
import { PlannerComponent } from './planner/planner.component';

import { CdMemoComponent } from './cd-memo/cd-memo.component';
import { IntrayComponent } from './intray/intray.component';
import { ReadDocComponent } from './read-doc/read-doc.component';
import { ComposeDocComponent } from './compose-doc/compose-doc.component';
import { DocTrayComponent } from './doc-tray/doc-tray.component';
import { InteRactComponent } from './inte-ract/inte-ract.component';

const routes: Routes = [
  {
    path: '',
    component: MyAccountComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'personal-data',
        component: PersonalDataComponent,
      },
      {
        path: 'activity',
        component: ActivityComponent,
      },
      {
        path: 'calendar',
        component: CalendarComponent,
      },
      {
        path: 'planner',
        component: PlannerComponent,
      },
      {
        path: 'contacts',
        component: ContactsComponent,
      },
      {
        path: 'cd-memo',
        component: CdMemoComponent,
      },
      {
        path: 'in-tray',
        component: IntrayComponent,
      },
      {
        path: 'read-doc',
        component: ReadDocComponent,
      },
      {
        path: 'compose-doc',
        component: ComposeDocComponent,
      },
      {
        path: 'doc-tray',
        component: DocTrayComponent,
      },
      {
        path: 'inte-ract',
        component: InteRactComponent,
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyAccountRoutingModule { }
