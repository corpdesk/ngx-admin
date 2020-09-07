import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from '../cd-auth/auth-guard.service';

import { UiFeaturesComponent } from './ui-features.component';
import { GridComponent } from './grid/grid.component';
import { IconsComponent } from './icons/icons.component';
import { TypographyComponent } from './typography/typography.component';
import { SearchComponent } from './search-fields/search-fields.component';

const routes: Routes = [{
  path: '',
  component: UiFeaturesComponent,
  canActivate: [ AuthGuardService ],
  children: [ {
    path: 'grid',
    component: GridComponent,
    canActivate: [ AuthGuardService ],
  }, {
    path: 'icons',
    component: IconsComponent,
    canActivate: [ AuthGuardService ],
  }, {
    path: 'typography',
    component: TypographyComponent,
    canActivate: [ AuthGuardService ],
  }, {
    path: 'search-fields',
    component: SearchComponent,
    canActivate: [ AuthGuardService ],
  }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UiFeaturesRoutingModule { }
