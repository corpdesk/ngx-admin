import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EventsComponent } from './events/events.component';
import { ResourcesComponent } from './resources/resources.component';
import { NewsComponent } from './news/news.component';
import { HomeComponent } from './home/home.component';
import { ForumsComponent } from './forums/forums.component';
import { ComplianceComponent } from './compliance/compliance.component';
import { MembershipComponent } from './membership/membership.component';
import { CapacityBuildingComponent } from './capacity-building/capacity-building.component';
import { CoopsComponent } from './coops/coops.component';

const routes: Routes = [
  {
    path: '',
    component: CoopsComponent,
    children: [
      {
        path: 'events',
        component: EventsComponent,
      },
      {
        path: 'resources',
        component: ResourcesComponent,
      },
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'news',
        component: NewsComponent,
      },
      {
        path: 'forums',
        component: ForumsComponent,
      },
      {
        path: 'compliance',
        component: ComplianceComponent,
      },
      {
        path: 'membership',
        component: MembershipComponent,
      },
      {
        path: 'capacity-building',
        component: CapacityBuildingComponent,
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoopsRoutingModule { }
