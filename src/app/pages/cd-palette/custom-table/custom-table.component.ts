import { Component, OnInit } from '@angular/core';
import { HtmlElemService } from '../../../@cd/guig/html-elem.service';

@Component({
  selector: 'ngx-custom-table',
  templateUrl: './custom-table.component.html',
  styleUrls: ['./custom-table.component.scss']
})
export class CustomTableComponent implements OnInit {
  selectedId = -1;
  colConfig = {
    columns: [
      {
        name: 'edit',
        dataType: 'fa',
        icon: 'fa fa-edit',
        controlType: 'button',
        action: null,
        alt: [
          {
            name: 'save',
            dataType: 'fa',
            icon: 'fa fa-save',
            controlType: 'button',
            action: null,
          }
        ]
      },
      {
        name: 'delete',
        dataType: 'string',
        icon: 'fa fa-trash-alt',
        controlType: 'button',
        action: 'trash()',
        alt: [
          {
            name: 'go-back',
            dataType: 'fa',
            icon: 'fa fa-arrow-left',
            controlType: 'button',
            action: 'goBack()',
          }
        ]
      },
      {
        name: '#',
        map: 'menu_config_id',
        dataType: 'string',
        controlType: 'label',
      },
      {
        name: 'name',
        map: 'f_name',
        dataType: 'string',
        controlType: 'label',
      },
      {
        name: 'alias',
        map: 'alias',
        dataType: 'string',
        controlType: 'label',
        alt: [
          {
            name: 'alias',
            dataType: 'string',
            controlType: 'textBox',
          }
        ]
      },
      {
        name: 'isCustom',
        map: 'isCustom',
        dataType: 'boolean',
        controlType: 'checkbox',
        disabled: true
      },
      {
        name: 'active',
        map: 'active',
        dataType: 'boolean',
        controlType: 'checkbox',
        disabled: true,
        alt: [
          {
            name: 'alias',
            dataType: 'boolean',
            controlType: 'checkbox',
            disabled: false,
          }
        ]
      }
    ]
  };

  MenuConfigData = [
    {
        "menu_config_id": 120,
        "menu_config_guid": "9aaf1e6c-7f1d-40d9-a5b6-8b2f6f99e015",
        "client_app_id": 2,
        "consumer_id": null,
        "t": "menu",
        "f_name": "menu_id",
        "alias": "menu_id",
        "isCustom": 0,
        "active": 1
    },
    {
        "menu_config_id": 121,
        "menu_config_guid": "50e26b1b-c14f-49f4-8bec-4bce752b77ee",
        "client_app_id": 2,
        "consumer_id": null,
        "t": "menu",
        "f_name": "menu_name",
        "alias": "label",
        "isCustom": 0,
        "active": 1
    },
    {
        "menu_config_id": 122,
        "menu_config_guid": "50317145-b5ed-4c83-be80-1408702e8f16",
        "client_app_id": 2,
        "consumer_id": null,
        "t": "menu",
        "f_name": "menu_icon",
        "alias": "icon",
        "isCustom": 0,
        "active": 1
    },
    {
        "menu_config_id": 123,
        "menu_config_guid": "a",
        "client_app_id": 2,
        "consumer_id": null,
        "t": "menu",
        "f_name": "menu_guid",
        "alias": "menu_guid",
        "isCustom": 0,
        "active": 1
    },
    {
        "menu_config_id": 124,
        "menu_config_guid": "b",
        "client_app_id": 2,
        "consumer_id": null,
        "t": "menu",
        "f_name": "active",
        "alias": "registered",
        "isCustom": 0,
        "active": 1
    },
    {
        "menu_config_id": 125,
        "menu_config_guid": "c",
        "client_app_id": 2,
        "consumer_id": null,
        "t": "menu",
        "f_name": "menu_closet_file",
        "alias": "location",
        "isCustom": 0,
        "active": 1
    },
    {
        "menu_config_id": 126,
        "menu_config_guid": "d",
        "client_app_id": 2,
        "consumer_id": null,
        "t": "menu",
        "f_name": "menu_action_id",
        "alias": "menu_action_id",
        "isCustom": 0,
        "active": 1
    },
    {
        "menu_config_id": 127,
        "menu_config_guid": "e",
        "client_app_id": 2,
        "consumer_id": null,
        "t": "menu",
        "f_name": "doc_id",
        "alias": "doc_id",
        "isCustom": 0,
        "active": 1
    },
    {
        "menu_config_id": 128,
        "menu_config_guid": "f",
        "client_app_id": 2,
        "consumer_id": null,
        "t": "menu",
        "f_name": "menu_parent_id",
        "alias": "menu_parent_id",
        "isCustom": 0,
        "active": 1
    },
    {
        "menu_config_id": 129,
        "menu_config_guid": "g",
        "client_app_id": 2,
        "consumer_id": null,
        "t": "menu",
        "f_name": "menu_order",
        "alias": "menuOrder",
        "isCustom": 0,
        "active": 1
    },
    {
        "menu_config_id": 130,
        "menu_config_guid": "h",
        "client_app_id": 2,
        "consumer_id": null,
        "t": "menu",
        "f_name": "path",
        "alias": "path",
        "isCustom": 0,
        "active": 1
    },
    {
        "menu_config_id": 131,
        "menu_config_guid": "i",
        "client_app_id": 2,
        "consumer_id": null,
        "t": "menu",
        "f_name": "menu_description",
        "alias": "description",
        "isCustom": 0,
        "active": 1
    },
    {
        "menu_config_id": 132,
        "menu_config_guid": "j",
        "client_app_id": 2,
        "consumer_id": null,
        "t": "module",
        "f_name": "module_id",
        "alias": "module_id",
        "isCustom": 0,
        "active": 1
    },
    {
        "menu_config_id": 133,
        "menu_config_guid": "k",
        "client_app_id": 2,
        "consumer_id": null,
        "t": "module",
        "f_name": "module_type_id",
        "alias": "moduleTypeID",
        "isCustom": 0,
        "active": 1
    },
    {
        "menu_config_id": 134,
        "menu_config_guid": "l",
        "client_app_id": 2,
        "consumer_id": null,
        "t": "module",
        "f_name": "module_guid",
        "alias": "module_guid",
        "isCustom": 0,
        "active": 1
    },
    {
        "menu_config_id": 135,
        "menu_config_guid": "m",
        "client_app_id": 2,
        "consumer_id": null,
        "t": "module",
        "f_name": "module_name",
        "alias": "module_name",
        "isCustom": 0,
        "active": 1
    },
    {
        "menu_config_id": 136,
        "menu_config_guid": "n",
        "client_app_id": 2,
        "consumer_id": null,
        "t": "module",
        "f_name": "module_name",
        "alias": "moduleName",
        "isCustom": 0,
        "active": 1
    },
    {
        "menu_config_id": 137,
        "menu_config_guid": "p",
        "client_app_id": 2,
        "consumer_id": null,
        "t": "module",
        "f_name": "is_public",
        "alias": "'is_public",
        "isCustom": 0,
        "active": 1
    },
    {
        "menu_config_id": 138,
        "menu_config_guid": "q",
        "client_app_id": 2,
        "consumer_id": null,
        "t": "module",
        "f_name": "is_sys_module",
        "alias": "is_sys_module",
        "isCustom": 0,
        "active": 1
    },
    {
        "menu_config_id": 139,
        "menu_config_guid": "r",
        "client_app_id": 2,
        "consumer_id": null,
        "t": "",
        "f_name": "(SELECT NULL)",
        "alias": "children",
        "isCustom": 1,
        "active": 1
    },
    {
        "menu_config_id": 140,
        "menu_config_guid": "s",
        "client_app_id": 2,
        "consumer_id": null,
        "t": "",
        "f_name": "(SELECT NULL)",
        "alias": "menu_action",
        "isCustom": 1,
        "active": 1
    },
    {
        "menu_config_id": 141,
        "menu_config_guid": "t",
        "client_app_id": 2,
        "consumer_id": null,
        "t": "cd_obj",
        "f_name": "cd_obj_id",
        "alias": "cd_obj_id",
        "isCustom": 0,
        "active": 1
    },
    {
        "menu_config_id": 142,
        "menu_config_guid": "u",
        "client_app_id": 2,
        "consumer_id": null,
        "t": "cd_obj",
        "f_name": "cd_obj_name",
        "alias": "cd_obj_name",
        "isCustom": 0,
        "active": 1
    },
    {
        "menu_config_id": 143,
        "menu_config_guid": "v",
        "client_app_id": 2,
        "consumer_id": null,
        "t": "cd_obj",
        "f_name": "last_sync_date",
        "alias": "last_sync_date",
        "isCustom": 0,
        "active": 1
    },
    {
        "menu_config_id": 144,
        "menu_config_guid": "w",
        "client_app_id": 2,
        "consumer_id": null,
        "t": "cd_obj",
        "f_name": "cd_obj_disp_name",
        "alias": "cd_obj_disp_name",
        "isCustom": 0,
        "active": 1
    },
    {
        "menu_config_id": 145,
        "menu_config_guid": "x",
        "client_app_id": 2,
        "consumer_id": null,
        "t": "cd_obj",
        "f_name": "cd_obj_guid",
        "alias": "cd_obj_guid",
        "isCustom": 0,
        "active": 1
    },
    {
        "menu_config_id": 146,
        "menu_config_guid": "y",
        "client_app_id": 2,
        "consumer_id": null,
        "t": "cd_obj",
        "f_name": "cd_obj_type_guid",
        "alias": "cd_obj_type_guid",
        "isCustom": 0,
        "active": 1
    },
    {
        "menu_config_id": 147,
        "menu_config_guid": "z",
        "client_app_id": 2,
        "consumer_id": null,
        "t": "cd_obj",
        "f_name": "last_modification_date",
        "alias": "last_modification_date",
        "isCustom": 0,
        "active": 1
    },
    {
        "menu_config_id": 148,
        "menu_config_guid": "aa",
        "client_app_id": 2,
        "consumer_id": null,
        "t": "cd_obj",
        "f_name": "parent_module_guid",
        "alias": "parent_module_guid",
        "isCustom": 0,
        "active": 1
    },
    {
        "menu_config_id": 149,
        "menu_config_guid": "ab",
        "client_app_id": 2,
        "consumer_id": null,
        "t": "cd_obj",
        "f_name": "parent_class_guid",
        "alias": "parent_class_guid",
        "isCustom": 0,
        "active": 1
    },
    {
        "menu_config_id": 150,
        "menu_config_guid": "ac",
        "client_app_id": 2,
        "consumer_id": null,
        "t": "cd_obj",
        "f_name": "parent_obj",
        "alias": "parent_obj",
        "isCustom": 0,
        "active": 1
    },
    {
        "menu_config_id": 151,
        "menu_config_guid": "ad",
        "client_app_id": 2,
        "consumer_id": null,
        "t": "cd_obj",
        "f_name": "show_name",
        "alias": "show_name",
        "isCustom": 0,
        "active": 1
    },
    {
        "menu_config_id": 152,
        "menu_config_guid": "ae",
        "client_app_id": 2,
        "consumer_id": null,
        "t": "cd_obj",
        "f_name": "icon",
        "alias": "obJicon",
        "isCustom": 0,
        "active": 1
    },
    {
        "menu_config_id": 153,
        "menu_config_guid": "af",
        "client_app_id": 2,
        "consumer_id": null,
        "t": "cd_obj",
        "f_name": "show_icon",
        "alias": "show_icon",
        "isCustom": 0,
        "active": 1
    },
    {
        "menu_config_id": 154,
        "menu_config_guid": "ag",
        "client_app_id": 2,
        "consumer_id": null,
        "t": "cd_obj",
        "f_name": "curr_val",
        "alias": "curr_val",
        "isCustom": 0,
        "active": 1
    },
    {
        "menu_config_id": 155,
        "menu_config_guid": "ah",
        "client_app_id": 2,
        "consumer_id": null,
        "t": "cd_obj",
        "f_name": "enabled",
        "alias": "enabled",
        "isCustom": 0,
        "active": 1
    }
];


  constructor(private svElem: HtmlElemService) { }

  ngOnInit(): void {
  }

  rowClick(id) {
    this.selectedId = id;
  }

  toEdit(id): boolean {
    if (this.selectedId == id) {
      return true;
    } else {
      return false;
    }
  }

  save(id: number) {
    const elemAlias = document.getElementById('alias_' + id) as HTMLInputElement;
    console.log('elemAlias.value:', elemAlias.value);
    const elemActive = this.svElem.getElem({id: 'active_' + id}) as HTMLInputElement;
    this.svElem.isChecked(elemActive);
    console.log('elemActive.checked:', elemActive);
  }

  trash(id) {

  }

  goBack(id) {
    this.selectedId = -1;
  }

}
