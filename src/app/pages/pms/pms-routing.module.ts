import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from '../cd-auth/auth-guard.service';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProjectsComponent } from './projects/projects.component';
import { GanttComponent } from './gantt/gantt.component';
import { SchedulerComponent } from './scheduler/scheduler.component';
import { PmsComponent } from './pms/pms.component';
import { ActivityComponent }  from './activity/activity.component';
import { ProjectSummaryComponent } from './project-summary/project-summary.component';
import { ProjectDetailsComponent } from './project-details/project-details.component';
import { ProjectDashboardComponent } from './project-dashboard/project-dashboard.component';
import { ProjectInfoComponent } from './project-info/project-info.component';
import { ProjectTabsComponent } from './project-tabs/project-tabs.component';
import { ProjectListComponent } from './project-list/project-list.component';
import { ProjectRegisterComponent } from './project-register/project-register.component';
import { PmsInteRactComponent } from './pms-inte-ract/pms-inte-ract.component';

const routes: Routes = [
  {
    path: '',
    component: PmsComponent,
    children: [
      {
        path: 'dashboard',
        component: ProjectDashboardComponent,
        canActivate: [ AuthGuardService ],
      },
      {
        path: 'info',
        component: ProjectInfoComponent,
        canActivate: [ AuthGuardService ],
      },
      {
        path: 'tabs',
        component: ProjectTabsComponent,
        canActivate: [ AuthGuardService ],
      },
      {
        path: 'list',
        component: ProjectListComponent,
        canActivate: [ AuthGuardService ],
      },
      {
        path: 'register',
        component: ProjectRegisterComponent,
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
        path: 'inteRact',
        component: PmsInteRactComponent,
        canActivate: [ AuthGuardService ],
      },
      {
        path: 'summary',
        component: ProjectSummaryComponent,
        canActivate: [ AuthGuardService ],
      },
      {
        path: 'details',
        component: ProjectDetailsComponent,
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
