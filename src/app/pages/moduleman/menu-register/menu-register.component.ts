import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModulesService } from '../../../@cd/sys/moduleman/controllers/modules.service';
import { MenuService } from '../../../@cd/sys/moduleman/controllers/menu.service';

@Component({
  selector: 'ngx-menu-register',
  templateUrl: './menu-register.component.html',
  styleUrls: ['./menu-register.component.scss']
})
export class MenuRegisterComponent implements OnInit {
  linearMode = true;
  // frmRegModule: FormGroup;
  isInvalidRegModule = true;
  successRegModule = false;
  regDataModule = { module_name: '', is_sys_module: '' };
  newModule: any;
  regDataMenu: any;
  newMenu: any;
  regModuleAffectedRows: any;
  isInvalidRegMenu = true;
  successRegMenu = false;
  frmRegMenu: FormGroup;
  regMenuAffectedRows: any;
  currentMenu: any;

  constructor(
    private fb: FormBuilder,
    private svModules: ModulesService,
    private svMenu: MenuService,
    // private toastr: ToastrService,
  ) { }

  ngOnInit() {
    this.initForms();
  }

  initForms() {
    this.frmRegMenu = this.fb.group({
      menu_name: ['', Validators.required],
      menu_description: ['',],
      menu_icon: ['', Validators.required],
      icon_type: ['', Validators.required],
      group: [''],
    });
  }

  /* Handle form errors in Angular 8 */
  public errorHandling = (frm, control: string, error: string) => {
    return frm.controls[control].hasError(error);
  }

  submitMenuForm(frm: FormGroup) {
    this.regDataMenu = frm.value;
    if(this.regDataMenu.group == ""){
      this.regDataMenu.group = false;
    }

    let m_parent_id = this.svMenu.selectedMenus[0].menu_id;
    if(this.regDataMenu.group){
      m_parent_id = -1;
    }
    
    const regDataMenu = {
      cd_obj: {
        cd_obj_name: this.regDataMenu.menu_name + '-component-menu-link',
        cd_obj_type_guid: 'f5df4494-5cc9-4463-8e8e-c5861703280e',
        parent_module_guid: this.svModules.selectedModules[0].module_guid
      },
      data: {
        menu_name: this.regDataMenu.menu_name,
        menu_closet_file: '',
        menu_parent_id: this.svMenu.selectedMenus[0].menu_id,
        module_id: this.svModules.selectedModules[0].module_id,
        menu_order: '11',
        path: '/pages/' + this.svModules.selectedModules[0].module_name + '/' + this.regDataMenu.menu_name,
        menu_description: this.regDataMenu.menu_description,
        menu_lable: this.regDataMenu.menu_name,
        menu_icon: this.regDataMenu.menu_icon,
        icon_type: this.regDataMenu.icon_type,
        active: true,
        group: this.regDataMenu.group
      }
    };

    console.log('regDataMenu:', regDataMenu);

    if (frm.invalid) {
      console.log('form is invalid');
      console.log('frm:', frm);
      this.isInvalidRegMenu = true;
    } else {

      this.svMenu.registerMenuObsv(regDataMenu)
        .subscribe((resp: any) => {
          console.log('resp:', resp);
          if (resp.app_state.success > 0) {
            this.successRegMenu = true;
            this.newMenu = resp.data.newMenu[0];
            this.regMenuAffectedRows = resp.data.affectedRows;
            this.currentMenu = resp.data.currentMenu; 
            console.log('this.newMenu:', this.newMenu);
            console.log('this.currentMenu:', this.currentMenu);
            console.log('this.regMenuAffectedRows:', this.regMenuAffectedRows);
          }
        });
    }
  }
}
