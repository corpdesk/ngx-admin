import { Component, Input, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { NotifierService, NotifierOptions } from "angular-notifier";
import { HtmlElemService } from '../../../@cd/guig/html-elem.service';
import { GuigTableConfig } from '../../../@cd/guig/models/guig-table-col.model';
import { AlertService } from '../../_alert/alert.service';

@Component({
  selector: 'ngx-guig-table',
  templateUrl: './guig-table.component.html',
  styleUrls: ['./guig-table.component.scss']
})
export class GuigTableComponent implements OnInit, AfterViewInit {
  @ViewChild("customNotification", { static: true }) customNotificationTmpl;
  private readonly notifier: NotifierService;
  selectedId = -1;
  @Input() colConfig: GuigTableConfig;
  @Input() payLoad: any;
  @Input() payLoadIndex: string;
  @Input() consumerServer: any; // instance of consumer server
  editableFields = [];
  dataFields = [];
  postData;
  options = {
    autoClose: false,
    keepAfterRouteChange: false,
  };

  // options for angular-8-alert-notifications
  alertOptions = {
    autoClose: true,
    keepAfterRouteChange: false
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
    private notifierService: NotifierService,
    protected alertService: AlertService,
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
      switch (ef.controlType) {
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
    this.consumerServer.tUpdate(updateData, fieldId);

    // process notifications after 2 seconds
    setTimeout(() => { this.showNotification(this.consumerServer.resp,'tUpdate') }, 2000);

  }

  // extract the editable fields
  setEditableFields() {
    this.editableFields = this.colConfig.columns.filter(
      (ef) => { return ef.editable == true; }
    );
    console.log('editableFields:', this.editableFields);
  }

  setDataFields() {
    this.dataFields = this.colConfig.columns.filter(
      (df) => { return df.index > 1 && df.hide !== true; }
    );
    console.log('dataFields:', this.dataFields);
  }

  getByID(id) {
    return this.payLoad.filter((dat) => { return dat[this.payLoadIndex] == id });
  }

  trash(id) {
    this.clearNotification();
    const rowData = this.getByID(id);
    console.log('rowData:', rowData);
    this.consumerServer.tTrash(rowData[0])
      .subscribe((resp: any) => {
        // do notification
        this.showNotification(resp, 'tTrash');
        /**
         * if trashing is successfull,
         * then refresh table
         */
        if (resp.app_state.success > 0) {
          this.consumerServer.tRefreshObsv()
            .subscribe((resp: any) => {
              this.payLoad = resp.data;
            })
        }

      });
  }

  goBack(id) {
    this.clearNotification();
    this.selectedId = -1;
  }

  showNotification(resp, fx) {
    console.log('starting GuigTableComponent::showNotification(res)');
    console.log('resp:', resp);
    let msg = '';
    let msgType = '';
    if (resp) {
      if (resp.app_state.success > 0) {
        switch (fx) {
          case 'tUpdate':
            const updatedRows = resp.data.affectedRows[0].updatedRows;
            msg = updatedRows;
            if (resp.data.affectedRows[0].updatedRows > 1) {
              msg += ' rows updated.';
            }
            else if (updatedRows == 1) {
              msg += ' row updated.';
            }
            else if (updatedRows == 0) {
              msg = 'No update was effected.';
            }
            msgType = 'success';
            //clear resp after display so that same value is not read again
            this.consumerServer.resp = null;
            break;
          case 'tTrash':
            msg = 'the data has been deleted';
            break
        }

        this.notifierService.show({
          message: msg,
          type: msgType,
          template: this.customNotificationTmpl
        });
        //test angular-8-alert-notifications
        this.alertService.success(msg, this.alertOptions);

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


}
