import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

// import { ToastrModule } from 'ngx-toastr';

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
  NbStepperModule,
} from '@nebular/theme';

import { ThemeModule } from '../../@theme/theme.module';
import { FormsModule as ngFormsModule } from '@angular/forms';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';

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
import { MatStepperModule } from '@angular/material/stepper';
import { ModuleListComponent } from './module-list/module-list.component';
import { ModuleDashboardComponent } from './module-dashboard/module-dashboard.component';
import { ModuleRegisterComponent } from './module-register/module-register.component';
import { MenuRegisterComponent } from './menu-register/menu-register.component';
import { MenuListComponent } from './menu-list/menu-list.component';
import { ModuleSelectComponent } from './module-select/module-select.component';

const materialModules = [
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
  MatStepperModule,
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
    DashboardComponent, ModuleListComponent, ModuleDashboardComponent, ModuleRegisterComponent, 
    MenuRegisterComponent, MenuListComponent, ModuleSelectComponent,
  ],
  providers: [ModuleTabsService],
  entryComponents: [ ModuleListComponent, ModuleDashboardComponent, ModuleRegisterComponent, ],
  imports: [
    CommonModule,
    ReactiveFormsModule, 
    FormsModule,
    NgxMatSelectSearchModule,
    // ToastrModule.forRoot(), // ToastrModule added
    NbAccordionModule,
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
    NbStepperModule,
    ngFormsModule,
    Ng2SmartTableModule,
    ...materialModules,
  ],
  exports:[ModuleSelectComponent]
})
export class ModulemanModule { }
