import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from '../cd-auth/auth-guard.service';

import { PubFormComponent } from './pub-form/pub-form.component';
import { PubArticleComponent } from './pub-article/pub-article.component';
import { PubComponent } from './pub/pub.component';
import { DashboardComponent } from './dashboard/dashboard.component';


const routes: Routes = [
  {
    path: '',
    component: PubComponent,
    canActivate: [ AuthGuardService ],
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [ AuthGuardService ],
      },
      {
        path: 'article',
        component: PubArticleComponent,
        canActivate: [ AuthGuardService ],
      },
      {
        path: 'forms',
        component: PubFormComponent,
        canActivate: [ AuthGuardService ],
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CdPubRoutingModule { }
