import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from '../cd-auth/auth-guard.service';

import { MenuComponent } from './menu/menu.component';
import { ModulemanComponent } from './moduleman/moduleman.component';
import { ModuleComponent } from './module/module.component';
import { CompanyComponent } from './company/company.component';
import { ConsumerComponent } from './consumer/consumer.component';
import { DocprocComponent } from './docproc/docproc.component';
import { SysConfigComponent } from './sys-config/sys-config.component';
import { ObservComponent } from './observ/observ.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: ModulemanComponent,
    canActivate: [ AuthGuardService ],
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [ AuthGuardService ],
      },
      {
        path: 'menu',
        component: MenuComponent,
        canActivate: [ AuthGuardService ],
      },
      {
        path: 'module',
        component: ModuleComponent,
        canActivate: [ AuthGuardService ],
      },
      {
        path: 'company',
        component: CompanyComponent,
        canActivate: [ AuthGuardService ],
      },
      {
        path: 'consumer',
        component: ConsumerComponent,
        canActivate: [ AuthGuardService ],
      },
      {
        path: 'docproc',
        component: DocprocComponent,
        canActivate: [ AuthGuardService ],
      },
      {
        path: 'sys-config',
        component: SysConfigComponent,
        canActivate: [ AuthGuardService ],
      },
      {
        path: 'observ',
        component: ObservComponent,
        canActivate: [ AuthGuardService ],
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModulemanRoutingModule { }
