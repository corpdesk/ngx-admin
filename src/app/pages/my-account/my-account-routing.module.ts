import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from '../cd-auth/auth-guard.service';

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
import { MyInteRactComponent } from './my-inte-ract/my-inte-ract.component';

const routes: Routes = [
  {
    path: '',
    component: MyAccountComponent,
    canActivate: [ AuthGuardService ],
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [ AuthGuardService ],
      },
      {
        path: 'personal-data',
        component: PersonalDataComponent,
        canActivate: [ AuthGuardService ],
      },
      {
        path: 'activity',
        component: ActivityComponent,
        canActivate: [ AuthGuardService ],
      },
      {
        path: 'calendar',
        component: CalendarComponent,
        canActivate: [ AuthGuardService ],
      },
      {
        path: 'planner',
        component: PlannerComponent,
        canActivate: [ AuthGuardService ],
      },
      {
        path: 'contacts',
        component: ContactsComponent,
        canActivate: [ AuthGuardService ],
      },
      {
        path: 'cd-memo',
        component: CdMemoComponent,
        canActivate: [ AuthGuardService ],
      },
      {
        path: 'in-tray',
        component: IntrayComponent,
        canActivate: [ AuthGuardService ],
      },
      {
        path: 'read-doc',
        component: ReadDocComponent,
        canActivate: [ AuthGuardService ],
      },
      {
        path: 'compose-doc',
        component: ComposeDocComponent,
        canActivate: [ AuthGuardService ],
      },
      {
        path: 'doc-tray',
        component: DocTrayComponent,
        canActivate: [ AuthGuardService ],
      },
      {
        path: 'my-inte-ract',
        component: MyInteRactComponent,
        canActivate: [ AuthGuardService ],
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyAccountRoutingModule { }
