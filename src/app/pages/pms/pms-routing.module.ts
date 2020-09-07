import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from '../cd-auth/auth-guard.service';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProjectsComponent } from './projects/projects.component';
import { GanttComponent } from './gantt/gantt.component';
import { SchedulerComponent } from './scheduler/scheduler.component';
import { PmsComponent } from './pms/pms.component';
import { ActivityComponent }  from './activity/activity.component';

const routes: Routes = [
  {
    path: '',
    component: PmsComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [ AuthGuardService ],
      },
      {
        path: 'projects',
        component: ProjectsComponent,
        canActivate: [ AuthGuardService ],
      },
      {
        path: 'gantt',
        component: GanttComponent,
        canActivate: [ AuthGuardService ],
      },
      {
        path: 'scheduler',
        component: SchedulerComponent,
        canActivate: [ AuthGuardService ],
      },
      {
        path: 'activity',
        component: ActivityComponent,
        canActivate: [ AuthGuardService ],
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PmsRoutingModule { }
