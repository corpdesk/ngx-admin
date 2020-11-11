import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { MenuService } from '../../../@cd/sys/moduleman/controllers/menu.service';
import { ModulesService } from '../../../@cd/sys/moduleman/controllers/modules.service';
import { GuigTableConfig } from '../../../@cd/guig/models/guig-table-col.model';
import { JsHelperService } from '../../../@cd/guig/js-helper.service';

@Component({
  selector: 'ngx-module-list',
  templateUrl: './module-list.component.html',
  styleUrls: ['./module-list.component.scss']
})
export class ModuleListComponent implements OnInit {
  component = "ModuleListComponent";
  modulesData;
  modulesDataOrig;
  frmSearchModule: FormGroup;
  primaryIndex = 'module_id';
  colConfig: GuigTableConfig = {
    columns: [
      {
        index: 0,
        name: 'edit',
        dataType: 'fa',
        icon: 'fa fa-edit',
        controlType: 'button',
        action: null,
        alt: [
          {
            index: 0,
            name: 'save',
            dataType: 'fa',
            icon: 'fa fa-save',
            controlType: 'button',
            action: null,
          }
        ]
      },
      {
        index: 1,
        name: 'delete',
        dataType: 'string',
        icon: 'fa fa-trash-alt',
        controlType: 'button',
        action: 'trash()',
        alt: [
          {
            index: 1,
            name: 'go-back',
            dataType: 'fa',
            icon: 'fa fa-arrow-left',
            controlType: 'button',
            action: 'goBack()',
          }
        ]
      },
      {
        index: 2,
        name: '#',
        map: 'module_id',
        dataType: 'string',
        controlType: 'label',
      },
      {
        index: 3,
        name: 'module_guid',
        map: 'module_guid',
        tField: 'module_guid',
        dataType: 'string',
        controlType: 'label',
        hide: true,
      },
      {
        index: 4,
        name: 'module_name',
        map: 'module_name',
        tField: 'module_name',
        dataType: 'string',
        controlType: 'label',
        editable: true,
        alt: [
          {
            index: 4,
            name: 'module_name',
            dataType: 'string',
            controlType: 'textBox',
          }
        ]
      },
      {
        index: 5,
        name: 'doc_id',
        map: 'doc_id',
        dataType: 'string',
        controlType: 'label',
        hide: true,
      },
      {
        index: 6,
        name: 'last_modification_date',
        map: 'last_modification_date',
        dataType: 'string',
        controlType: 'label',
      },
      {
        index: 7,
        name: 'group_guid',
        map: 'group_guid',
        tField: 'group_guid',
        dataType: 'string',
        controlType: 'label',
        hide: true,
      },
      {
        index: 8,
        name: 'group_name',
        map: 'group_name',
        tField: 'group_name',
        dataType: 'string',
        controlType: 'label',
      },
      {
        index: 9,
        name: 'group_owner_id',
        map: 'group_owner_id',
        tField: 'group_owner_id',
        dataType: 'string',
        controlType: 'label',
      },
      {
        index: 10,
        name: 'group_type_id',
        map: 'group_type_id',
        tField: 'group_type_id',
        dataType: 'string',
        controlType: 'label',
      },
      {
        index: 11,
        name: 'company_id',
        map: 'company_id',
        tField: 'company_id',
        dataType: 'string',
        controlType: 'label',
      },
      {
        index: 12,
        name: 'is_sys_module',
        map: 'is_sys_module',
        tField: 'is_sys_module',
        dataType: 'boolean',
        controlType: 'checkbox',
        disabled: true
      },
      {
        index: 13,
        name: 'is_public',
        map: 'is_public',
        tField: 'is_public',
        dataType: 'boolean',
        controlType: 'checkbox',
        editable: true,
        disabled: true,
        alt: [
          {
            index: 13,
            name: 'is_public',
            dataType: 'boolean',
            controlType: 'checkbox',
            disabled: false,
          }
        ]
      },
      {
        index: 14,
        name: 'enabled',
        map: 'enabled',
        tField: 'enabled',
        dataType: 'boolean',
        controlType: 'checkbox',
        editable: true,
        disabled: true,
        alt: [
          {
            index: 14,
            name: 'enabled',
            dataType: 'boolean',
            controlType: 'checkbox',
            disabled: false,
          }
        ]
      }
    ]
  };
  constructor(
    private fb: FormBuilder,
    public svModule: ModulesService,
    public svJsHelper: JsHelperService,
  ) {
    //this.svModule.getGetAll();
    this.svModule.getGetAllObsv()
    .subscribe((res: any) => {
      console.log('MenuService::getGetAll(clientAppId)/res:', res);
      //this.menuData = res.data;
      this.modulesData = res.data.map((m)=>{
        if(m.enabled == null){
          m.enabled = false;
        }
        return m;
      });
      this.modulesDataOrig = this.modulesData;
      console.log('this.modulesData:',this.modulesData);
      console.log('this.modulesDataOrig:',this.modulesDataOrig);
    });
  }

  ngOnInit(): void {
    this.initForms();
    // this.modulesData = this.svModule.Modules;
    // this.modulesDataOrig = this.svModule.Modules;
  }


  initForms() {
    this.frmSearchModule = this.fb.group({
      searchModule: ['', Validators.required],
    });
  }

  search(frm: FormGroup, mode){
    console.log('search is clicked');
    console.log('frm.value.searchModule:', frm.value.searchModule);
    const key = frm.value.searchModule;
    // this.menuDataOrig = this.menuData;
    if(mode == 'change' && key.length > 1){
      this.menuFilter(key);
    }

    if(mode == 'submit'){
      this.menuFilter(key);
    }

    if(key.length == 0){
      this.modulesData = this.modulesDataOrig;
    }
  }

  menuFilter(key){
    this.modulesData = this.modulesData.filter((m)=>{
      const ret1 = this.svJsHelper.kmpSearch(key,m.module_name);
      if( ret1 > -1 ){
        return true;
      }
      else{
        return false;
      }
    });
  }

}
