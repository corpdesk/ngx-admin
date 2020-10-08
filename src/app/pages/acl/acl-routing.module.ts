import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from '../cd-auth/auth-guard.service';

import { UserComponent } from './user/user.component';
import { GroupComponent } from './group/group.component';
import { AclComponent } from './acl/acl.component';
import { GrusComponent } from './grus/grus.component';
import { UserSelectComponent } from './user-select/user-select.component';
import { ConsumerComponent } from './consumer/consumer.component';
import { AclConsumerComponent } from './acl-consumer/acl-consumer.component';



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
        path: 'acl-consumer',
        component: AclConsumerComponent,
        canActivate: [AuthGuardService],
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AclRoutingModule { }
