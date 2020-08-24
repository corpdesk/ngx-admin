import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HrmRoutingModule } from './hrm-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DesignationComponent } from './designation/designation.component';
import { OrganogramComponent } from './organogram/organogram.component';
import { GradeComponent } from './grade/grade.component';
import { RecruitComponent } from './recruit/recruit.component';
import { StaffComponent } from './staff/staff.component';
import { CapacityBuildingComponent } from './capacity-building/capacity-building.component';
import { AcctsComponent } from './accts/accts.component';
import { PaymentsComponent } from './payments/payments.component';
import { DeductionComponent } from './deduction/deduction.component';
import { HrmComponent } from './hrm/hrm.component';


@NgModule({
  declarations: [DashboardComponent, DesignationComponent, OrganogramComponent, GradeComponent, RecruitComponent, StaffComponent, CapacityBuildingComponent, AcctsComponent, PaymentsComponent, DeductionComponent, HrmComponent],
  imports: [
    CommonModule,
    HrmRoutingModule
  ]
})
export class HrmModule { }
