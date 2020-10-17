import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModulesService } from '../../../@cd/sys/moduleman/controller/modules.service';
import { MenuService } from '../../../@cd/sys/moduleman/controller/menu.service';

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
    // this.frmRegModule = this.fb.group({
    //   module_name: ['', Validators.required],
    //   is_sys_module: ['', Validators.required]
    // });
    this.frmRegMenu = this.fb.group({
      menu_name: ['', Validators.required],
      menu_description: ['',],
      menu_icon: ['', Validators.required],
      icon_type: ['', Validators.required],
      group: ['', Validators.required],
    });
  }

  /* Handle form errors in Angular 8 */
  public errorHandling = (frm, control: string, error: string) => {
    return frm.controls[control].hasError(error);
  }

  // get dataControls() {
  //   // return this.frmRegModule.controls;
  // }

  // submitModuleForm(frm: FormGroup) {
  //   console.log(frm.value);
  //   this.regDataModule = frm.value;
  //   if (frm.invalid) {
  //     this.isInvalidRegModule = true;
  //   } else {
  //     frm.value.module_type_id = 1;
  //     console.log(frm.value);
  //     // this.svModules.registerModule(frm.value);
  //     this.svModules.registerModuleObsv(frm.value)
  //       .subscribe((resp: any) => {
  //         console.log('resp:', resp);
  //         if (resp.app_state.success > 0) {
  //           this.successRegModule = true;
  //           this.newModule = resp.data.newModule[0];
  //           this.regModuleAffectedRows = resp.data.affectedRows;
  //           console.log('this.newModule:', this.newModule);
  //           console.log('this.regModuleAffectedRows:', this.regModuleAffectedRows);
  //         }
  //       });
  //   }

  // }

  // menuParentId(){
  //   console.log('starting menuParentId()')
  //   const parentMenu = this.regModuleAffectedRows.filter(affrectedRow => affrectedRow.m == 'menu');
  //   return parentMenu[0].rowID;
  // }

  submitMenuForm(frm: FormGroup) {
    this.regDataMenu = frm.value;
    if(this.regDataMenu.group == ""){
      this.regDataMenu.group = false;
    }

    let m_parent_id = this.svMenu.selectedMenus[0].menu_id;
    if(this.regDataMenu.group){
      m_parent_id = -1;
    }
    // console.log('this.regDataMenu:', this.regDataMenu);
    // console.log('this.svModules.selectedModules:', this.svModules.selectedModules[0]);
    // console.log('Parent Menu: this.svMenu:', this.svMenu.selectedMenus);
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
