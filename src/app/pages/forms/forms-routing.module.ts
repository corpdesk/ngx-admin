import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from '../cd-auth/auth-guard.service';

import { FormsComponent } from './forms.component';
import { FormInputsComponent } from './form-inputs/form-inputs.component';
import { FormLayoutsComponent } from './form-layouts/form-layouts.component';
import { DatepickerComponent } from './datepicker/datepicker.component';
import { ButtonsComponent } from './buttons/buttons.component';

const routes: Routes = [
  {
    path: '',
    component: FormsComponent,
    canActivate: [ AuthGuardService ],
    children: [
      {
        path: 'inputs',
        component: FormInputsComponent,
        canActivate: [ AuthGuardService ],
      },
      {
        path: 'layouts',
        component: FormLayoutsComponent,
        canActivate: [ AuthGuardService ],
      },
      {
        path: 'layouts',
        component: FormLayoutsComponent,
        canActivate: [ AuthGuardService ],
      },
      {
        path: 'buttons',
        component: ButtonsComponent,
        canActivate: [ AuthGuardService ],
      },
      {
        path: 'datepicker',
        component: DatepickerComponent,
        canActivate: [ AuthGuardService ],
      },
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule,
  ],
})
export class FormsRoutingModule {
}

