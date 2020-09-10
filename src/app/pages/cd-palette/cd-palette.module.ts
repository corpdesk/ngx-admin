import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


import { CdPaletteRoutingModule } from './cd-palette-routing.module';
import { CarouselComponent } from './carousel/carousel.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
} from '@nebular/theme';

import { ThemeModule } from '../../@theme/theme.module';
import { FormsModule as ngFormsModule } from '@angular/forms';

import { FlexLayoutModule } from '@angular/flex-layout';
import { MatExpansionModule } from '@angular/material/expansion';
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
import { MatDividerModule } from '@angular/material/divider';
import { ProfileCardComponent } from './profile-card/profile-card.component';
import { ProfileAccordionComponent } from './profile-accordion/profile-accordion.component';
import { ProfileTwitterComponent } from './profile-twitter/profile-twitter.component';
import { FriblyTreeComponent } from './fribly-tree/fribly-tree.component';
import { CheckListComponent } from './check-list/check-list.component';

const materialModules = [
  MatExpansionModule,
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
  MatDividerModule
];

@NgModule({
  declarations: [
    CarouselComponent, 
    ProfileCardComponent, 
    ProfileAccordionComponent, 
    ProfileTwitterComponent, FriblyTreeComponent, CheckListComponent
  ],
  imports: [
    CommonModule,
    CdPaletteRoutingModule,
    FormsModule, 
    ReactiveFormsModule,
    FontAwesomeModule,
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
  ],
  exports:[
    CarouselComponent, 
    ProfileCardComponent, 
    ProfileAccordionComponent,
    ProfileTwitterComponent,
    FriblyTreeComponent,
    CheckListComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CdPaletteModule { }
