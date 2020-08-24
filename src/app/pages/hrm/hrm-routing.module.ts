import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

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

const routes: Routes = [
  {
    path: '',
    component: HrmComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'designation',
        component: DesignationComponent,
      },
      {
        path: 'organogram',
        component: OrganogramComponent,
      },
      {
        path: 'grade',
        component: GradeComponent,
      },
      {
        path: 'recruit',
        component: RecruitComponent,
      },
      {
        path: 'staff',
        component: StaffComponent,
      },
      {
        path: 'capacity-building',
        component: CapacityBuildingComponent,
      },
      {
        path: 'accts',
        component: AcctsComponent,
      },
      {
        path: 'payments',
        component: PaymentsComponent,
      },
      {
        path: 'deduction',
        component: DeductionComponent,
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HrmRoutingModule { }
