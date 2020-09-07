import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from '../cd-auth/auth-guard.service';

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
    canActivate: [ AuthGuardService ],
    children: [
      {
        path: 'events',
        component: EventsComponent,
        canActivate: [ AuthGuardService ],
      },
      {
        path: 'resources',
        component: ResourcesComponent,
        canActivate: [ AuthGuardService ],
      },
      {
        path: 'home',
        component: HomeComponent,
        canActivate: [ AuthGuardService ],
      },
      {
        path: 'news',
        component: NewsComponent,
        canActivate: [ AuthGuardService ],
      },
      {
        path: 'forums',
        component: ForumsComponent,
        canActivate: [ AuthGuardService ],
      },
      {
        path: 'compliance',
        component: ComplianceComponent,
        canActivate: [ AuthGuardService ],
      },
      {
        path: 'membership',
        component: MembershipComponent,
        canActivate: [ AuthGuardService ],
      },
      {
        path: 'capacity-building',
        component: CapacityBuildingComponent,
        canActivate: [ AuthGuardService ],
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoopsRoutingModule { }
