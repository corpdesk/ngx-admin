import { Component, Input, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { of, interval } from 'rxjs';
import { map } from 'rxjs/operators';
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
  @Input() colConfig;
  @Input() payLoad;
  @Input() payLoadIndex;
  editableFields = [];
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
    
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.setEditableFields();
  }

  rowClick(id) {
    console.log('starting rowClick(id)');
    this.clearNotification();
    this.selectedId = id;
    console.log('this.selectedId:', this.selectedId);
  }

  toEdit(id): boolean {
    if (this.selectedId == id) {
      return true;
    } else {
      return false;
    }
  }

  save(id: number, configId) {
    console.log('starting save()');
    console.log('id:', id);
    console.log('this.selectedId:', this.selectedId);
    this.clearNotification();
    const updateData = {};
    this.editableFields.forEach((ef) => {
      switch (ef.controlType){
        case 'label':
          updateData[ef.map] = (document.getElementById(ef.map + '_' + this.selectedId) as HTMLInputElement).value;
          break;
        case 'checkbox':
          updateData[ef.map] = this.svElem.isChecked(this.svElem.getElem({ id: ef.map + '_' + this.selectedId }) as HTMLInputElement);
          break;
      }
    });
    const fieldId = this.selectedId;
    this.svMenu.updateMenuConfig(updateData, configId,fieldId);

    // process notifications after 2 seconds
    setTimeout(() => { this.showNotification(this.svMenu.resp) }, 2000);

  }

  // extract the editable fields
  setEditableFields(){
    this.editableFields = this.colConfig.columns.filter(
      (ef) => { return ef.editable == true;}
    );
    console.log('editableFields:', this.editableFields);
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
