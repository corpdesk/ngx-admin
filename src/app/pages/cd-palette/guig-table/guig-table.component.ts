import { Component, Input, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { NotifierService, NotifierOptions } from "angular-notifier";
import { HtmlElemService } from '../../../@cd/guig/html-elem.service';

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
  @Input() consumerServer; // instance of consumer server
  editableFields = [];
  dataFields = [];
  postData;
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

  constructor(
    private svElem: HtmlElemService,
    private notifierService: NotifierService
  ) {
    
  }

  ngOnInit(): void {
    this.setEditableFields();
    this.setDataFields();
  }

  ngAfterViewInit() {
    
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

  save(id: number) {
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
    // this.svMenu.updateMenuConfig(updateData, configId,fieldId);
    this.consumerServer.tUpdate(updateData,fieldId);

    // process notifications after 2 seconds
    setTimeout(() => { this.showNotification(this.consumerServer.resp) }, 2000);

  }

  // extract the editable fields
  setEditableFields(){
    this.editableFields = this.colConfig.columns.filter(
      (ef) => { return ef.editable == true;}
    );
    console.log('editableFields:', this.editableFields);
  }

  setDataFields(){
    this.dataFields = this.colConfig.columns.filter(
      (df) => { return df.index > 1;}
    );
    console.log('dataFields:', this.dataFields);
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
        this.consumerServer.resp = null;
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
        this.consumerServer.resp = null;
      }
    }

  }

  clearNotification() {
    this.notifierService.hideAll();
  }

  // updateMenuConfig(updateData, configId, fieldId) {
  //   console.log('starting MenuService::updateMenuConfig()');
  //   console.log('updateData:', updateData);
  //   this.updateMenuConfigDataPost(updateData, fieldId);
  //   this.svServer.proc(this.postData)
  //     .subscribe((res) => {
  //       console.log(res);
  //       this.respUpdateMenuConfig(res, configId);
  //     });

  // }

  // updateMenuConfigDataPost(updateData, fieldId) {
  //   console.log('starting MenuService::updateMenuConfigDataPost()');
  //   this.postData = {
  //     ctx: 'Sys',
  //     m: 'Moduleman',
  //     c: 'MenuConfigController',
  //     a: 'actionUpdate',
  //     dat: {
  //       f_vals: [
  //         {
  //           filter: [
  //             {
  //               field: 'menu_config_id',
  //               operator: '=',
  //               val: fieldId
  //             }
  //           ],
  //           data: updateData
  //         }
  //       ],
  //       token: "mT6blaIfqWhzNXQLG8ksVbc1VodSxRZ8lu5cMgda"
  //     },
  //     args: null
  //   }
  // }

  // respUpdateMenuConfig(res, configId) {
  //   console.log('starting MenuService::respUpdateMenuConfig(res)');
  //   console.log(res);
  //   this.resp = res;
  //   this.getMenuConfig(configId);
  // }

}
