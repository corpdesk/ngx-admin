import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoopsRoutingModule } from './coops-routing.module';
import { EventsComponent } from './events/events.component';
import { ResourcesComponent } from './resources/resources.component';
import { NewsComponent } from './news/news.component';
import { HomeComponent } from './home/home.component';
import { ForumsComponent } from './forums/forums.component';
import { ComplianceComponent } from './compliance/compliance.component';
import { MembershipComponent } from './membership/membership.component';
import { CapacityBuildingComponent } from './capacity-building/capacity-building.component';
import { CoopsComponent } from './coops/coops.component';


@NgModule({
  declarations: [EventsComponent, ResourcesComponent, NewsComponent, HomeComponent, ForumsComponent, ComplianceComponent, MembershipComponent, CapacityBuildingComponent, CoopsComponent],
  imports: [
    CommonModule,
    CoopsRoutingModule
  ]
})
export class CoopsModule { }
