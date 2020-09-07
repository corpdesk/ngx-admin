import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from '../cd-auth/auth-guard.service';

import { EditorsComponent } from './editors.component';
import { TinyMCEComponent } from './tiny-mce/tiny-mce.component';
import { CKEditorComponent } from './ckeditor/ckeditor.component';

const routes: Routes = [{
  path: '',
  component: EditorsComponent,
  canActivate: [ AuthGuardService ],
  children: [{
    path: 'tinymce',
    component: TinyMCEComponent,
    canActivate: [ AuthGuardService ],
  }, {
    path: 'ckeditor',
    component: CKEditorComponent,
    canActivate: [ AuthGuardService ],
  }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditorsRoutingModule { }

export const routedComponents = [
  EditorsComponent,
  TinyMCEComponent,
  CKEditorComponent,
];
