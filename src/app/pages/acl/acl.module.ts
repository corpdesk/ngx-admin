import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
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
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';

import { AclRoutingModule } from './acl-routing.module';
import { ModulemanModule } from '../moduleman/moduleman.module';
import { UserComponent } from './user/user.component';
import { GroupComponent } from './group/group.component';
import { AclComponent } from './acl/acl.component';
import { GrusComponent } from './grus/grus.component';
import { UserListComponent } from './user-list/user-list.component';
import { GroupListComponent } from './group-list/group-list.component';
import { UserGroupComponent } from './user-group/user-group.component';
import { GroupNestedComponent } from './group-nested/group-nested.component';
import { GroupMemberComponent } from './group-member/group-member.component';
import { UserSelectComponent } from './user-select/user-select.component';
import { GroupSelectComponent } from './group-select/group-select.component';
import { GroupTreeViewComponent } from './group-tree-view/group-tree-view.component';
import { ConsumerComponent } from './consumer/consumer.component';
import { ConsumerResourcesComponent } from './consumer-resources/consumer-resources.component';
import { ConsumerSelectComponent } from './consumer-select/consumer-select.component';
import { ConsumerListComponent } from './consumer-list/consumer-list.component';
import { AclConsumerComponent } from './acl-consumer/acl-consumer.component';

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
  NgxMatSelectSearchModule,
];

@NgModule({
  declarations: [UserComponent, GroupComponent, AclComponent, GrusComponent, UserListComponent, GroupListComponent, UserGroupComponent, GroupNestedComponent, GroupMemberComponent, UserSelectComponent, GroupSelectComponent, GroupTreeViewComponent, ConsumerComponent, ConsumerResourcesComponent, ConsumerSelectComponent, ConsumerListComponent, AclConsumerComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule, 
    FormsModule,
    // ToastrModule.forRoot(), // ToastrModule added
    // CdPaletteModule,
    ModulemanModule,
    AclRoutingModule,
    ThemeModule,
    NbAccordionModule,
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
    ReactiveFormsModule,
    ...materialModules,
  ]
})
export class AclModule { }
