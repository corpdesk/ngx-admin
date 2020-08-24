import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PersonalDataComponent } from './personal-data/personal-data.component';
import { CalendarComponent } from './calendar/calendar.component';
import { ActivityComponent } from './activity/activity.component';
import { ContactsComponent } from './contacts/contacts.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MyAccountComponent } from './my-account/my-account.component';

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
        path: 'contacts',
        component: ContactsComponent,
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyAccountRoutingModule { }
