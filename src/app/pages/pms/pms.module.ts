import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { PmsRoutingModule } from './pms-routing.module';
import { CdPaletteModule } from '../cd-palette/cd-palette.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProjectsComponent } from './projects/projects.component';
import { GanttComponent } from './gantt/gantt.component';
import { SchedulerComponent } from './scheduler/scheduler.component';
import { PmsComponent } from './pms/pms.component';
import { ActivityComponent } from './activity/activity.component';
import { ProjectSummaryComponent } from './project-summary/project-summary.component';
import { ProjectDetailsComponent } from './project-details/project-details.component';
import { ProjectDashboardComponent } from './project-dashboard/project-dashboard.component';
import { ProjectInfoComponent } from './project-info/project-info.component';
import { ProjectTabsComponent } from './project-tabs/project-tabs.component';
import { ProjectListComponent } from './project-list/project-list.component';
import { ProjectRegisterComponent } from './project-register/project-register.component';
import { ProjectSelectComponent } from './project-select/project-select.component';

import { Ng2SmartTableModule } from 'ng2-smart-table';
import {
  NbActionsModule,
  NbButtonModule,
  NbCardModule,
  NbCheckboxModule,
  NbDatepickerModule, NbIconModule,
  NbInputModule,
  NbRadioModule,
  NbSelectModule,
  NbUserModule,
  NbAccordionModule,
  NbStepperModule,
} from '@nebular/theme';

import { ThemeModule } from '../../@theme/theme.module';
import { FormsModule as ngFormsModule } from '@angular/forms';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';

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
import { TaskRegisterComponent } from './task-register/task-register.component';
import { TaskSelectComponent } from './task-select/task-select.component';
import { TaskListComponent } from './task-list/task-list.component';


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
];


@NgModule({
  declarations: [DashboardComponent, ProjectsComponent, GanttComponent, SchedulerComponent, PmsComponent, ActivityComponent, ProjectSummaryComponent, ProjectDetailsComponent, ProjectDashboardComponent, ProjectInfoComponent, ProjectTabsComponent, ProjectListComponent, ProjectRegisterComponent, ProjectSelectComponent, TaskRegisterComponent, TaskSelectComponent, TaskListComponent],
  imports: [
    CommonModule,
    PmsRoutingModule,
    CdPaletteModule,
    CommonModule,
    ReactiveFormsModule, 
    FormsModule,
    NgxMatSelectSearchModule,
    // ToastrModule.forRoot(), // ToastrModule added
    NbAccordionModule,
    CdPaletteModule,
    ThemeModule,
    NbInputModule,
    NbCardModule,
    NbButtonModule,
    NbActionsModule,
    NbUserModule,
    NbCheckboxModule,
    NbRadioModule,
    NbDatepickerModule,
    NbSelectModule,
    NbIconModule,
    NbStepperModule,
    ngFormsModule,
    Ng2SmartTableModule,
    ...materialModules,
  ]
})
export class PmsModule { }
