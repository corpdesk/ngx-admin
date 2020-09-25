import { Injectable } from '@angular/core';

import { ModuleListComponent } from './module-list/module-list.component';
import { ModuleCreateComponent } from './module-create/module-create.component';
import { ModuleDashboardComponent } from './module-dashboard/module-dashboard.component';
import { TabItem } from '../../@cd/guig/models/tab-item';

@Injectable({
  providedIn: 'root'
})
export class ModuleTabsService {

  constructor() { }

  getTabs() {
    return [
      new TabItem(ModuleListComponent,
        {
          title: 'Modules',
          options: {}
        }),

      new TabItem(ModuleCreateComponent,
        {
          title: 'Create',
          options: {}
        }),

      new TabItem(ModuleDashboardComponent,
        {
          title: 'Dashboard',
          options: {}
        }),
    ];
  }
}
