import { Component, OnInit } from '@angular/core';
// import { MenuService } from '../../../@cd/sys/moduleman/controller/menu.service';
import { ModulesService } from '../../../@cd/sys/moduleman/controller/modules.service';

@Component({
  selector: 'ngx-module-list',
  templateUrl: './module-list.component.html',
  styleUrls: ['./module-list.component.scss']
})
export class ModuleListComponent implements OnInit {
  modulesData;
  primaryIndex = 'module_id';
  // configId = 2;
  colConfig = {
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
        dataType: 'string',
        controlType: 'label',
      },
      {
        index: 4,
        name: 'module_name',
        map: 'module_name',
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
        name: 'module_name',
        map: 'module_name',
        dataType: 'string',
        controlType: 'label',
        editable: true,
        alt: [
          {
            index: 5,
            name: 'module_name',
            dataType: 'string',
            controlType: 'textBox',
          }
        ]
      },
      {
        index: 6,
        name: 'doc_id',
        map: 'doc_id',
        dataType: 'string',
        controlType: 'label',
      },
      {
        index: 7,
        name: 'last_modification_date',
        map: 'last_modification_date',
        dataType: 'string',
        controlType: 'label',
      },
      {
        index: 8,
        name: 'group_guid',
        map: 'group_guid',
        dataType: 'string',
        controlType: 'label',
      },
      {
        index: 9,
        name: 'group_name',
        map: 'group_name',
        dataType: 'string',
        controlType: 'label',
      },
      {
        index: 10,
        name: 'group_owner_id',
        map: 'group_owner_id',
        dataType: 'string',
        controlType: 'label',
      },
      {
        index: 11,
        name: 'group_type_id',
        map: 'group_type_id',
        dataType: 'string',
        controlType: 'label',
      },
      {
        index: 12,
        name: 'company_id',
        map: 'company_id',
        dataType: 'string',
        controlType: 'label',
      },
      {
        index: 13,
        name: 'is_sys_module',
        map: 'is_sys_module',
        dataType: 'boolean',
        controlType: 'checkbox',
        disabled: true
      },
      {
        index: 14,
        name: 'is_public',
        map: 'is_public',
        dataType: 'boolean',
        controlType: 'checkbox',
        editable: true,
        disabled: true,
        alt: [
          {
            index: 14,
            name: 'is_public',
            dataType: 'boolean',
            controlType: 'checkbox',
            disabled: false,
          }
        ]
      },
      {
        index: 15,
        name: 'enabled',
        map: 'enabled',
        dataType: 'boolean',
        controlType: 'checkbox',
        editable: true,
        disabled: true,
        alt: [
          {
            index: 15,
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
    // public svMenu: MenuService,
    public svModule: ModulesService,
  ) {
    // this.svMenu.getMenuConfig(1);
    // this.svMenu.getMenuConfig(2);
    this.svModule.getGetAll();
  }

  ngOnInit(): void {
    this.modulesData = this.svModule.Modules;
  }

}
