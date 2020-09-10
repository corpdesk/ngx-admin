import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

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
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'menu',
        component: MenuComponent,
      },
      {
        path: 'module',
        component: ModuleComponent,
      },
      {
        path: 'company',
        component: CompanyComponent,
      },
      {
        path: 'consumer',
        component: ConsumerComponent,
      },
      {
        path: 'docproc',
        component: DocprocComponent,
      },
      {
        path: 'sys-config',
        component: SysConfigComponent,
      },
      {
        path: 'observ',
        component: ObservComponent,
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModulemanRoutingModule { }
