import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CdPubRoutingModule } from './cd-pub-routing.module';
import { PubFormComponent } from './pub-form/pub-form.component';
import { PubArticleComponent } from './pub-article/pub-article.component';
import { PubComponent } from './pub/pub.component';
import { DashboardComponent } from './dashboard/dashboard.component';


@NgModule({
  declarations: [PubFormComponent, PubArticleComponent, PubComponent, DashboardComponent],
  imports: [
    CommonModule,
    CdPubRoutingModule
  ]
})
export class CdPubModule { }
