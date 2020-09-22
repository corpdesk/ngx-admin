import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { GuigTableComponent } from '../../cd-palette/guig-table/guig-table.component';
import { MenuService } from '../../../@cd/sys/moduleman/controller/menu.service';

@Component({
  selector: 'ngx-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit, AfterViewInit {
  menuConfigData;
  primaryIndex = 'menu_config_id';
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
        editable: true,
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
        editable: true,
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
  constructor(
    private svMenu: MenuService
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
