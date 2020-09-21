import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { NotifierService, NotifierOptions } from "angular-notifier";
import { HtmlElemService } from '../../../@cd/guig/html-elem.service';
import { MenuService } from '../../../@cd/sys/moduleman/controller/menu.service';

interface NotifType {
  type: 'info' | 'succsess' | 'warning' | 'danger';
}

@Component({
  selector: 'ngx-guig-table',
  templateUrl: './guig-table.component.html',
  styleUrls: ['./guig-table.component.scss']
})
export class GuigTableComponent implements OnInit, AfterViewInit {
  @ViewChild("customNotification", { static: true }) customNotificationTmpl;
  private readonly notifier: NotifierService;
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
  menuConfig;

  options = {
    autoClose: false,
    keepAfterRouteChange: false,
  };

  notifierDefaultOptions: NotifierOptions = {
    position: {
      horizontal: {
        position: "right",
        distance: 12
      },
      vertical: {
        position: "top",
        distance: 12,
        gap: 10
      }
    },
    theme: "material",
    behaviour: {
      autoHide: 5000,
      onClick: false,
      onMouseover: "pauseAutoHide",
      showDismissButton: true,
      stacking: 4
    },
    animations: {
      enabled: true,
      show: {
        preset: "slide",
        speed: 300,
        easing: "ease"
      },
      hide: {
        preset: "fade",
        speed: 300,
        easing: "ease",
        offset: 50
      },
      shift: {
        speed: 300,
        easing: "ease"
      },
      overlap: 150
    }
  };

  currentConfigId = 2;

  constructor(
    private svElem: HtmlElemService,
    public svMenu: MenuService,
    private notifierService: NotifierService
  ) {
    this.svMenu.getMenuConfig(1);
    this.svMenu.getMenuConfig(2);
  }

  ngOnInit(): void {

  }

  ngAfterViewInit() {

  }

  rowClick(id) {
    this.clearNotification();
    this.selectedId = id;
  }

  toEdit(id): boolean {
    if (this.selectedId == id) {
      return true;
    } else {
      return false;
    }
  }

  save(id: number,configId) {
    this.clearNotification();
    const elemAlias = document.getElementById('alias_' + id) as HTMLInputElement;
    console.log('elemAlias.value:', elemAlias.value);
    const elemActive = this.svElem.getElem({ id: 'active_' + id }) as HTMLInputElement;
    this.svElem.isChecked(elemActive);
    console.log('elemActive.checked:', elemActive);
    const updateData = {
      alias: elemAlias.value,
      active: this.svElem.isChecked(elemActive)
    };

    
    this.svMenu.updateMenuConfig(updateData, configId);

    // process notifications after 2 seconds
    setTimeout( () => { this.showNotification(this.svMenu.resp) }, 2000 );

  }

  trash(id) {
    this.clearNotification();
  }

  goBack(id) {
    this.clearNotification();
    this.selectedId = -1;
  }

  showNotification(resp) {
    console.log('starting MenuService::showNotification(res)');
    if (resp) {
      if (resp.app_state.success > 0) {
        const msg = resp.data.affectedRows[0].updatedRows + ' rows updated';
        const msgType = 'success';
        this.notifierService.show({
          message: msg,
          type: msgType,
          template: this.customNotificationTmpl
        });
        //clear resp after display so that same value is not read again
        this.svMenu.resp = null;
      }
      else {
        const msg = 'something went wrong:' + resp.app_state.err_msg;
        const msgType = 'warning';
        this.notifierService.show({
          message: msg,
          type: msgType,
          template: this.customNotificationTmpl
        });
        //clear resp after display so that same value is not read again
        this.svMenu.resp = null;
      }
    }

  }

  clearNotification() {
    this.notifierService.hideAll();
  }

}
