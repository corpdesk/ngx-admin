import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotifierModule } from "angular-notifier";

import { ModulemanRoutingModule } from './moduleman-routing.module';
import { CdPaletteModule } from '../cd-palette/cd-palette.module'; 
import { MenuComponent } from './menu/menu.component';
import { ModulemanComponent } from './moduleman/moduleman.component';
import { ModuleComponent } from './module/module.component';
import { CompanyComponent } from './company/company.component';
import { ConsumerComponent } from './consumer/consumer.component';
import { DocprocComponent } from './docproc/docproc.component';
import { SysConfigComponent } from './sys-config/sys-config.component';
import { ObservComponent } from './observ/observ.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ModuleTabsService } from './module-tabs.service';

import { Ng2SmartTableModule } from 'ng2-smart-table';
import {
  NbActionsModule,
  NbButtonModule,
  NbCardModule,
  NbCheckboxModule,
  NbDatepickerModule, NbIconModule,
  NbInputModule,
  NbRadioModule,
  NbSelectModule,
  NbUserModule,
  NbAccordionModule,
} from '@nebular/theme';

import { ThemeModule } from '../../@theme/theme.module';
import { FormsModule as ngFormsModule } from '@angular/forms';

import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatTreeModule } from '@angular/material/tree';
import { ModuleListComponent } from './module-list/module-list.component';
import { ModuleCreateComponent } from './module-create/module-create.component';
import { ModuleDashboardComponent } from './module-dashboard/module-dashboard.component';

const materialModules = [
  NbAccordionModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatNativeDateModule,
  MatDatepickerModule,
  MatCheckboxModule,
  MatSlideToggleModule,
  MatRadioModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatTreeModule,
];

@NgModule({
  declarations: [
    MenuComponent, 
    ModulemanComponent, 
    ModuleComponent, 
    CompanyComponent, 
    ConsumerComponent, 
    DocprocComponent, 
    SysConfigComponent, 
    ObservComponent, 
    DashboardComponent, ModuleListComponent, ModuleCreateComponent, ModuleDashboardComponent,
  ],
  providers: [ModuleTabsService],
  entryComponents: [ ModuleListComponent, ModuleCreateComponent, ModuleDashboardComponent ],
  imports: [
    CommonModule,
    // NotifierModule.withConfig({
    //   position: {
    //     horizontal: {
    //       position: "right",
    //       distance: 12
    //     },
    //     vertical: {
    //       position: "top",
    //       distance: 100,
    //       gap: 10
    //     }
    //   },
    //   theme: "material",
    //   behaviour: {
    //     autoHide: 5000,
    //     onClick: false,
    //     onMouseover: "pauseAutoHide",
    //     showDismissButton: true,
    //     stacking: 4
    //   },
    //   animations: {
    //     enabled: true,
    //     show: {
    //       preset: "slide",
    //       speed: 300,
    //       easing: "ease"
    //     },
    //     hide: {
    //       preset: "fade",
    //       speed: 300,
    //       easing: "ease",
    //       offset: 50
    //     },
    //     shift: {
    //       speed: 300,
    //       easing: "ease"
    //     },
    //     overlap: 150
    //   }}),
    CdPaletteModule,
    ModulemanRoutingModule,
    ThemeModule,
    NbInputModule,
    NbCardModule,
    NbButtonModule,
    NbActionsModule,
    NbUserModule,
    NbCheckboxModule,
    NbRadioModule,
    NbDatepickerModule,
    NbSelectModule,
    NbIconModule,
    ngFormsModule,
    Ng2SmartTableModule,
    ...materialModules,
  ]
})
export class ModulemanModule { }
