import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MenuService } from '../../../@cd/sys/moduleman/controller/menu.service';
import { GuigTableConfig } from '../../../@cd/guig/models/guig-table-col.model';
import { JsHelperService } from '../../../@cd/guig/js-helper.service';

@Component({
  selector: 'ngx-menu-list',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.scss']
})
export class MenuListComponent implements OnInit {
  menuData;
  menuDataOrig;
  primaryIndex = 'menu_id';
  thisInstance;
  configId = 2;
  frmSearchMenu: FormGroup;

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
        map: 'menu_id',
        dataType: 'string',
        controlType: 'label',
      },
      {
        index: 3,
        name: 'title',
        map: 'title',
        dataType: 'string',
        controlType: 'label',
      },
      {
        index: 4,
        name: 'icon',
        map: 'icon',
        dataType: 'string',
        controlType: 'label',
        editable: true,
        alt: [
          {
            index: 4,
            name: 'icon',
            dataType: 'string',
            controlType: 'textBox',
          }
        ]
      },
      {
        index: 5,
        name: 'icon_type',
        map: 'icon_type',
        dataType: 'string',
        controlType: 'label',
        editable: true,
        alt: [
          {
            index: 5,
            name: 'icon_type',
            dataType: 'string',
            controlType: 'textBox',
          }
        ]
      },
      {
        index: 6,
        name: 'menu_order',
        map: 'menu_order',
        dataType: 'string',
        controlType: 'label',
        editable: true,
        alt: [
          {
            index: 6,
            name: 'menu_order',
            dataType: 'string',
            controlType: 'textBox',
          }
        ]
      },
      {
        index: 7,
        name: 'group',
        map: 'group',
        dataType: 'boolean',
        controlType: 'checkbox',
        editable: true,
        disabled: true,
        alt: [
          {
            index: 7,
            name: 'group',
            dataType: 'boolean',
            controlType: 'checkbox',
            disabled: false,
          }
        ]
      },
      {
        index: 8,
        name: 'enabled',
        map: 'enabled',
        dataType: 'boolean',
        controlType: 'checkbox',
        editable: true,
        disabled: true,
        alt: [
          {
            index: 8,
            name: 'enabled',
            dataType: 'boolean',
            controlType: 'checkbox',
            disabled: false,
          }
        ]
      },
      {
        index: 9,
        name: 'link',
        map: 'link',
        dataType: 'string',
        controlType: 'label',
        editable: true,
        alt: [
          {
            index: 9,
            name: 'link',
            dataType: 'string',
            controlType: 'textBox',
          }
        ]
      }
    ]
  };

  // group, enabled, link

  constructor(
    private fb: FormBuilder,
    public svMenu: MenuService,
    public svJsHelper: JsHelperService,
  ) {
    const clientAppId = 2;
    this.svMenu.getGetAllObsv(clientAppId)
    .subscribe((res: any) => {
      console.log('MenuService::getGetAll(clientAppId)/res:', res);
      //this.menuData = res.data;
      this.menuData = res.data.map((m)=>{
        if(m.group == null){
          m.group = false;
        }
        return m;
      });
      this.menuDataOrig = this.menuData;
      console.log('this.menuData:',this.menuData);
      console.log('this.menuDataOrig:',this.menuDataOrig);
    });

    
  }

  ngOnInit(): void {
    this.initForms();
  }

  initForms() {
    this.frmSearchMenu = this.fb.group({
      searchMenu: ['', Validators.required],
    });
  }

  search(frm: FormGroup, mode){
    console.log('search is clicked');
    console.log('frm.value.searchMenu:', frm.value.searchMenu);
    const key = frm.value.searchMenu;
    // this.menuDataOrig = this.menuData;
    if(mode == 'change' && key.length > 2){
      this.menuFilter(key);
    }

    if(mode == 'submit'){
      this.menuFilter(key);
    }

    if(key.length == 0){
      this.menuData = this.menuDataOrig;
    }
  }

  menuFilter(key){
    this.menuData = this.menuData.filter((m)=>{
      const ret1 = this.svJsHelper.kmpSearch(key,m.title);
      const ret2 = this.svJsHelper.kmpSearch(key,m.icon);
      const ret3 = this.svJsHelper.kmpSearch(key,m.link);
      if( ret1 > -1 || ret2 > -1 || ret3 > -1 ){
        return true;
      }
      else{
        return false;
      }
    });
  }

}
