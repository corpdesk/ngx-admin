import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PmsRoutingModule } from './pms-routing.module';
import { CdPaletteModule } from '../cd-palette/cd-palette.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProjectsComponent } from './projects/projects.component';
import { GanttComponent } from './gantt/gantt.component';
import { SchedulerComponent } from './scheduler/scheduler.component';
import { PmsComponent } from './pms/pms.component';
import { ActivityComponent } from './activity/activity.component';


@NgModule({
  declarations: [DashboardComponent, ProjectsComponent, GanttComponent, SchedulerComponent, PmsComponent, ActivityComponent],
  imports: [
    CommonModule,
    PmsRoutingModule,
    CdPaletteModule,
  ]
})
export class PmsModule { }
