import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from '../cd-auth/auth-guard.service';

import { LayoutComponent } from './layout.component';
import { Tab1Component, Tab2Component, TabsComponent } from './tabs/tabs.component';
import { AccordionComponent } from './accordion/accordion.component';
import { InfiniteListComponent } from './infinite-list/infinite-list.component';
import { ListComponent } from './list/list.component';
import { StepperComponent } from './stepper/stepper.component';

const routes: Routes = [{
  path: '',
  component: LayoutComponent,
  canActivate: [ AuthGuardService ],
  children: [
    {
      path: 'stepper',
      component: StepperComponent,
      canActivate: [ AuthGuardService ],
    },
    {
      path: 'list',
      component: ListComponent,
      canActivate: [ AuthGuardService ],
    },
    {
      path: 'infinite-list',
      component: InfiniteListComponent,
      canActivate: [ AuthGuardService ],
    },
    {
      path: 'accordion',
      component: AccordionComponent,
      canActivate: [ AuthGuardService ],
    },
    {
      path: 'tabs',
      component: TabsComponent,
      canActivate: [ AuthGuardService ],
      children: [
        {
          path: '',
          redirectTo: 'tab1',
          pathMatch: 'full',
          canActivate: [ AuthGuardService ],
        },
        {
          path: 'tab1',
          component: Tab1Component,
          canActivate: [ AuthGuardService ],
        },
        {
          path: 'tab2',
          component: Tab2Component,
          canActivate: [ AuthGuardService ],
        },
      ],
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LayoutRoutingModule {
}
