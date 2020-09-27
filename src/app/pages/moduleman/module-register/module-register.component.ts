import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
// import { ToastrService } from 'ngx-toastr';
import { ModulesService } from '../../../@cd/sys/moduleman/controller/modules.service';

@Component({
  selector: 'ngx-module-register',
  templateUrl: './module-register.component.html',
  styleUrls: ['./module-register.component.scss']
})
export class ModuleRegisterComponent implements OnInit {
  linearMode = true;
  frmRegModule: FormGroup;
  secondFormGroup: FormGroup;
  isInvalidRegModule = true;
  successRegModule = false;

  constructor(
    private fb: FormBuilder,
    private svModules: ModulesService,
    // private toastr: ToastrService,
    ) {}

  ngOnInit() {
    this.initForms();
  }

  initForms(){
    this.frmRegModule = this.fb.group({
      module_name: ['', Validators.required],
      is_sys_module: ['', Validators.required]
    });
    this.secondFormGroup = this.fb.group({
      secondCtrl: ['', Validators.required]
    });
  }

  /* Handle form errors in Angular 8 */
  public errorHandling = (frm, control: string, error: string) => {
    return frm.controls[control].hasError(error);
  }

  get dataControls() {
    return this.frmRegModule.controls;
  }

  submitForm(frm: FormGroup) {
    console.log(frm.value);
    // this.toastr.success('Hello world!', 'Toastr fun!');
    if(frm.invalid){
      this.isInvalidRegModule = true;
    } else {
      frm.value.module_type_id = 1;
      console.log(frm.value);
      this.svModules.registerModule(frm.value);
    }
    
  }
}
