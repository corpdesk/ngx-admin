import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProjectService } from '../../../@cd/app/pms/controllers/project.service';
import { MenuService } from '../../../@cd/sys/moduleman/controllers/menu.service';

@Component({
  selector: 'ngx-project-register',
  templateUrl: './project-register.component.html',
  styleUrls: ['./project-register.component.scss']
})
export class ProjectRegisterComponent implements OnInit {
  linearMode = true;
  frmRegProject: FormGroup;
  isInvalidRegProject = true;
  successRegProject = false;
  regDataProject = { module_name: '', is_sys_module: '' };
  newProject: any;
  regDataMenu: any;
  newMenu: any;
  regProjectAffectedRows: any;
  isInvalidRegMenu = true;
  successRegMenu = false;
  frmRegMenu: FormGroup;
  regMenuAffectedRows: any;
  currentMenu: any;

  constructor(
    private fb: FormBuilder,
    private svProject: ProjectService,
    private svMenu: MenuService,
  ) { }

  ngOnInit() {
    this.initForms();
  }

  initForms() {
    this.frmRegProject = this.fb.group({
      project_name: ['', Validators.required]
    });
    this.frmRegMenu = this.fb.group({
      menu_name: ['', Validators.required],
      menu_description: ['',],
      menu_icon: ['', Validators.required],
      icon_type: ['', Validators.required],
    });
  }

  /* Handle form errors in Angular 8 */
  public errorHandling = (frm, control: string, error: string) => {
    return frm.controls[control].hasError(error);
  }

  // get dataControls() {
  //   return this.frmRegProject.controls;
  // }

  submitProjectForm(frm: FormGroup) {
    console.log('starting submitProjectForm(frm: FormGroup)')
    console.log('frm.value:', frm.value);
    this.regDataProject = frm.value;
    if (frm.invalid) {
      this.isInvalidRegProject = true;
    } else {
      this.svProject.registerProjectObsv(frm.value)
        .subscribe((resp: any) => {
          console.log('resp:', resp);
          if (resp.app_state.success > 0) {
            this.successRegProject = true;
            this.newProject = resp.data.newProject[0];
            this.regProjectAffectedRows = resp.data.affectedRows;
            console.log('this.newProject:', this.newProject);
            console.log('this.regProjectAffectedRows:', this.regProjectAffectedRows);
          }
        });
    }

  }

  menuParentId(){
    console.log('starting menuParentId()')
    const parentMenu = this.regProjectAffectedRows.filter(affrectedRow => affrectedRow.m == 'menu');
    return parentMenu[0].rowID;
  }

  submitMenuForm(frm: FormGroup) {
    this.regDataMenu = frm.value;
    const regDataMenu = {
      cd_obj: {
        cd_obj_name: this.regDataMenu.menu_name + '-component-menu-link',
        cd_obj_type_guid: 'f5df4494-5cc9-4463-8e8e-c5861703280e',
        parent_module_guid: this.newProject.module_guid
      },
      data: {
        menu_name: this.regDataMenu.menu_name,
        menu_closet_file: '',
        menu_parent_id: this.menuParentId(),
        module_id: this.newProject.module_id,
        menu_order: '11',
        path: '/pages/' + this.regDataProject.module_name + '/' + this.regDataMenu.menu_name,
        menu_description: this.regDataMenu.menu_description,
        menu_lable: this.regDataMenu.menu_name,
        menu_icon: this.regDataMenu.menu_icon,
        icon_type: this.regDataMenu.icon_type,
        active: true
      }
    };

    if (frm.invalid) {
      this.isInvalidRegMenu = true;
    } else {
      frm.value.module_type_id = 1;
      console.log('frm.value:', frm.value);

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
