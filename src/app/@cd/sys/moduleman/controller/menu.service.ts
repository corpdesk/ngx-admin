import { Injectable } from '@angular/core';

import { ServerService } from './server.service';
import { SessService } from '../../user/controllers/sess.service';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private postData;
  // currentModule = '';
  menuData = [];
  menuList = [];
  // MenuModel
  successNewMenu = false;
  constructor(
    private svServer: ServerService,
    private svSess: SessService,
  ) { }

  /*
  invoked following svUser::getUserData() when all menu items are fetched
  */
  init(res: any) {
    this.setMenuData(res.data.menu_data);
  }

  setMenuData(menuData) {
    this.menuData = menuData;
  }

  // register menu
  registerMenu(data) {
    console.log(data);
    console.log(data.is_sys_module);
    data = this.cleanRegData(data);
    this.setEnvelopeRegMenu(data);
    /*
    post request to server
    */
    this.svServer.proc(this.postData)
      .subscribe((res: any) => {
        console.log(res);
        res.app_state.success = Number(res.app_state.success);
        if (res.app_state.success === 1) {
          this.successNewMenu = true;
        }
        this.setRespRegMenu(res.data);
      });
  }

  cleanRegData(data) {
    data.is_sys_module = Number(data.is_sys_module);
    if (data.is_sys_module === 1) {
      data.is_sys_module = true;
    } else {
      data.is_sys_module = false;
    }
    data.module_type_id = Number(data.module_type_id);
    return data;
  }

  // /**
  //  * {
  //         "ctx": "Sys",
  //         "m": "Moduleman",
  //         "c": "MenuController",
  //         "a": "actionCreate",
  //         "dat": {
  //             "f_vals": [{
  //                 "cd_obj": {
  //                     "cd_obj_name": "reservation-component-menu-link",
  //                     "cd_obj_type_guid": "f5df4494-5cc9-4463-8e8e-c5861703280e",
  //                     "parent_module_guid": "a06f881e-41f1-45b9-87f4-8475fef7fcba"
  //                 },
  //                 "data": {
  //                     "menu_name": "reservation",
  //                     "menu_closet_file": "",
  //                     "menu_parent_id": "982",
  //                     "module_id": "258",
  //                     "menu_order": "11",
  //                     "path": "reservation",
  //                     "menu_description": "reservation",
  //                     "menu_lable": "reservation",
  //                     "menu_icon": "cog",
  //                     "active": true
  //                 }
  //             }],
  //             "token": "mT6blaIfqWhzNXQLG8ksVbc1VodSxRZ8lu5cMgda"
  //         },
  //         "args": null
  //     }
  //  */
  setEnvelopeRegMenu(regData) {
    this.postData = {
      ctx: 'Sys',
      m: 'Moduleman',
      c: 'MenuController',
      a: 'actionCreate',
      dat: {
        f_vals: [{
          cd_obj: regData.cd_obj,
          data: regData.data
        }],
        docproc: {},
        token: this.svSess.token
      },
      args: null
    };
  }

  setRespRegMenu(data) {
    console.log(data);
  }

  // register menu
  getGetAll() {
    this.setEnvelopeGetAll();
    /*
    post request to server
    */
    this.svServer.proc(this.postData)
      .subscribe((res: any) => {
        console.log(res);
        this.setRespGetAll(res.data);
      });
  }

  // /**
  //  * {
  //         "ctx": "Sys",
  //         "m": "Moduleman",
  //         "c": "MenuController",
  //         "a": "actionGetAll",
  //         "dat": {
  //             "token": "C64AC158-80F7-5AA7-D3A6-240E399B1A0A"
  //         },
  //         "args": null
  //     }
  //  */
  setEnvelopeGetAll() {
    this.postData = {
      ctx: 'Sys',
      m: 'Moduleman',
      c: 'MenuController',
      a: 'actionGetAll',
      dat: {
        token: this.svSess.token
      },
      args: null
    };
  }

  setRespGetAll(data) {
    console.log(data);
    this.menuList = data;
  }

}
