import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from '../cd-auth/auth-guard.service';

import { UserComponent } from './user/user.component';
import { GroupComponent } from './group/group.component';
import { AclComponent } from './acl/acl.component';
import { GrusComponent } from './grus/grus.component';
import { UserSelectComponent } from './user-select/user-select.component';
import { GroupSelectComponent } from './group-select/group-select.component';



const routes: Routes = [
  {
    path: '',
    component: AclComponent,
    canActivate: [AuthGuardService],
    children: [
      {
        path: 'user',
        component: UserComponent,
        canActivate: [AuthGuardService],
      },
      {
        path: 'group',
        component: GroupComponent,
        canActivate: [AuthGuardService],
      },
      {
        path: 'grus',
        component: GrusComponent,
        canActivate: [AuthGuardService],
      },
      {
        path: 'user-select',
        component: UserSelectComponent,
        canActivate: [AuthGuardService],
      },
      {
        path: 'group-select',
        component: GroupSelectComponent,
        canActivate: [AuthGuardService],
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AclRoutingModule { }
