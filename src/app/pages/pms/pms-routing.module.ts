import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

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
      },
      {
        path: 'projects',
        component: ProjectsComponent,
      },
      {
        path: 'gantt',
        component: GanttComponent,
      },
      {
        path: 'scheduler',
        component: SchedulerComponent,
      },
      {
        path: 'activity',
        component: ActivityComponent,
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PmsRoutingModule { }
