import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from '../cd-auth/auth-guard.service';

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
    canActivate: [ AuthGuardService ],
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [ AuthGuardService ],
      },
      {
        path: 'designation',
        component: DesignationComponent,
        canActivate: [ AuthGuardService ],
      },
      {
        path: 'organogram',
        component: OrganogramComponent,
        canActivate: [ AuthGuardService ],
      },
      {
        path: 'grade',
        component: GradeComponent,
        canActivate: [ AuthGuardService ],
      },
      {
        path: 'recruit',
        component: RecruitComponent,
        canActivate: [ AuthGuardService ],
      },
      {
        path: 'staff',
        component: StaffComponent,
        canActivate: [ AuthGuardService ],
      },
      {
        path: 'capacity-building',
        component: CapacityBuildingComponent,
        canActivate: [ AuthGuardService ],
      },
      {
        path: 'accts',
        component: AcctsComponent,
        canActivate: [ AuthGuardService ],
      },
      {
        path: 'payments',
        component: PaymentsComponent,
        canActivate: [ AuthGuardService ],
      },
      {
        path: 'deduction',
        component: DeductionComponent,
        canActivate: [ AuthGuardService ],
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HrmRoutingModule { }
