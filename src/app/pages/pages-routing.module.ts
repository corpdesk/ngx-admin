import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { AuthGuardService } from '../pages/cd-auth/auth-guard.service';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ECommerceComponent } from './e-commerce/e-commerce.component';
import { NotFoundComponent } from './miscellaneous/not-found/not-found.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'home',
      loadChildren: () => import('./home/home.module')
        .then(m => m.HomeModule),
    },
    {
      path: 'cd-pub',
      loadChildren: () => import('./cd-pub/cd-pub.module')
        .then(m => m.CdPubModule),
    }
    // CdKioskModule
    ,
    {
      path: 'cd-kiosk',
      loadChildren: () => import('./cd-kiosk/cd-kiosk.module')
        .then(m => m.CdKioskModule),
    },
    {
      path: 'moduleman',
      loadChildren: () => import('./moduleman/moduleman.module')
        .then(m => m.ModulemanModule),
    },
    {
      path: 'acl',
      loadChildren: () => import('./acl/acl.module')
        .then(m => m.AclModule),
    },
    {
      path: 'dashboard',
      component: ECommerceComponent,
      canActivate: [ AuthGuardService ],
    },
    {
      path: 'iot-dashboard',
      component: DashboardComponent,
      canActivate: [ AuthGuardService ],
    },
    {
      path: 'cd-auth',
      loadChildren: () => import('./cd-auth/cd-auth.module')
        .then(m => m.CdAuthModule),
    },
    {
      path: 'my-account',
      loadChildren: () => import('./my-account/my-account.module')
        .then(m => m.MyAccountModule),
    },
    {
      path: 'coops',
      loadChildren: () => import('./coops/coops.module')
        .then(m => m.CoopsModule),
    },
    {
      path: 'pms',
      loadChildren: () => import('./pms/pms.module')
        .then(m => m.PmsModule),
    },
    {
      path: 'hrm',
      loadChildren: () => import('./hrm/hrm.module')
        .then(m => m.HrmModule),
    },
    {
      path: 'accts',
      loadChildren: () => import('./accts/accts.module')
        .then(m => m.AcctsModule),
    },
    {
      path: 'layout',
      loadChildren: () => import('./layout/layout.module')
        .then(m => m.LayoutModule),
    },
    {
      path: 'forms',
      loadChildren: () => import('./forms/forms.module')
        .then(m => m.FormsModule),
    },
    {
      path: 'ui-features',
      loadChildren: () => import('./ui-features/ui-features.module')
        .then(m => m.UiFeaturesModule),
    },
    {
      path: 'modal-overlays',
      loadChildren: () => import('./modal-overlays/modal-overlays.module')
        .then(m => m.ModalOverlaysModule),
    },
    {
      path: 'extra-components',
      loadChildren: () => import('./extra-components/extra-components.module')
        .then(m => m.ExtraComponentsModule),
    },
    {
      path: 'maps',
      loadChildren: () => import('./maps/maps.module')
        .then(m => m.MapsModule),
    },
    {
      path: 'charts',
      loadChildren: () => import('./charts/charts.module')
        .then(m => m.ChartsModule),
    },
    {
      path: 'editors',
      loadChildren: () => import('./editors/editors.module')
        .then(m => m.EditorsModule),
    },
    {
      path: 'tables',
      loadChildren: () => import('./tables/tables.module')
        .then(m => m.TablesModule),
    },
    {
      path: 'miscellaneous',
      loadChildren: () => import('./miscellaneous/miscellaneous.module')
        .then(m => m.MiscellaneousModule),
    },
    {
      path: '',
      redirectTo: 'home',
      pathMatch: 'full',
    },
    {
      path: '**',
      component: NotFoundComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
