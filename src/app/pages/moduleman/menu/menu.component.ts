import { Component, OnInit, AfterViewInit } from '@angular/core';
import { MenuService } from '../../../@cd/sys/moduleman/controllers/menu.service';
import { GuigTableConfig } from '../../../@cd/guig/models/guig-table-col.model';
import { TabsService } from '../../../@cd/guig/tabs.service';

@Component({
  selector: 'ngx-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit, AfterViewInit {
  component = "MenuComponent";
  menuConfigData;
  primaryIndex = 'menu_config_id';
  thisInstance;
  configId = 2;
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
        map: 'menu_config_id',
        dataType: 'string',
        controlType: 'label',
      },
      {
        index: 3,
        name: 'name',
        map: 'f_name',
        dataType: 'string',
        controlType: 'label',
      },
      {
        index: 4,
        name: 'alias',
        map: 'alias',
        dataType: 'string',
        controlType: 'label',
        editable: true,
        alt: [
          {
            index: 4,
            name: 'alias',
            dataType: 'string',
            controlType: 'textBox',
          }
        ]
      },
      {
        index: 5,
        name: 'isCustom',
        map: 'isCustom',
        dataType: 'boolean',
        controlType: 'checkbox',
        disabled: true
      },
      {
        index: 6,
        name: 'active',
        map: 'active',
        dataType: 'boolean',
        controlType: 'checkbox',
        editable: true,
        disabled: true,
        alt: [
          {
            index: 6,
            name: 'alias',
            dataType: 'boolean',
            controlType: 'checkbox',
            disabled: false,
          }
        ]
      }
    ]
  };
  constructor(
    public svMenu: MenuService,
    public svTabs: TabsService,
  ) {
    this.svMenu.getMenuConfig(1);
    this.svMenu.getMenuConfig(2);
  }

  ngOnInit(): void {
    this.menuConfigData = this.svMenu.menuConfigData;
  }

  ngAfterViewInit() {
  }

}
