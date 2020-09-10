import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModulemanRoutingModule } from './moduleman-routing.module';
import { MenuComponent } from './menu/menu.component';
import { ModulemanComponent } from './moduleman/moduleman.component';
import { ModuleComponent } from './module/module.component';
import { CompanyComponent } from './company/company.component';
import { ConsumerComponent } from './consumer/consumer.component';
import { DocprocComponent } from './docproc/docproc.component';
import { SysConfigComponent } from './sys-config/sys-config.component';
import { ObservComponent } from './observ/observ.component';
import { DashboardComponent } from './dashboard/dashboard.component';

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
    DashboardComponent],
  imports: [
    CommonModule,
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
    ...materialModules,
  ]
})
export class ModulemanModule { }
