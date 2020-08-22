import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from '../cd-auth/auth-guard.service';

import { ChartsComponent } from './charts.component';
import { EchartsComponent } from './echarts/echarts.component';
import { D3Component } from './d3/d3.component';
import { ChartjsComponent } from './chartjs/chartjs.component';

const routes: Routes = [{
  path: '',
  component: ChartsComponent,
  canActivate: [ AuthGuardService ],
  children: [{
    path: 'echarts',
    component: EchartsComponent,
    canActivate: [ AuthGuardService ],
  }, {
    path: 'd3',
    component: D3Component,
    canActivate: [ AuthGuardService ],
  }, {
    path: 'chartjs',
    component: ChartjsComponent,
    canActivate: [ AuthGuardService ],
  }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChartsRoutingModule { }

export const routedComponents = [
  ChartsComponent,
  EchartsComponent,
  D3Component,
  ChartjsComponent,
];
