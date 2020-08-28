import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PubFormComponent } from './pub-form/pub-form.component';
import { PubArticleComponent } from './pub-article/pub-article.component';
import { PubComponent } from './pub/pub.component';
import { DashboardComponent } from './dashboard/dashboard.component';


const routes: Routes = [
  {
    path: '',
    component: PubComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'article',
        component: PubArticleComponent,
      },
      {
        path: 'forms',
        component: PubFormComponent,
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CdPubRoutingModule { }
