import { Injectable } from '@angular/core';

import { ServerService } from './server.service';
import { SessService } from '../../user/controllers/sess.service';
import { UserService } from '../../user/controllers/user.service';


@Injectable({
  providedIn: 'root'
})
export class ModulesService {
  private postData;
  currentModule = '';
  public Modules;
  successNewModule = false;
  constructor(
    private svServer: ServerService,
    private svSess: SessService,
    private svUser: UserService
  ) { }

  // register module
  registerModule(data) {
    console.log(data);
    console.log(data.is_sys_module);
    data = this.cleanRegData(data);
    this.setEnvelopeRegModule(data);
    /*
    post login request to server
    */
    this.svServer.proc(this.postData)
      .subscribe((res: any) => {
        console.log(res);
        res.app_state.success = Number(res.app_state.success);
        if (res.app_state.success === 1) {
          this.successNewModule = true;
        }
        this.setRespRegModule(res.data);
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
  //  *
  //  * @param data
  //  * {
  //         "ctx": "Sys",
  //         "m": "Moduleman",
  //         "c": "ModulesController",
  //         "a": "actionRegisterModule",
  //         "dat": {
  //             "f_vals": [
  //                 {
  //                     "data": {
  //                         "module_name": "FooModule",
  //                         "is_sys_module": false,
  //                         "module_type_id": 1
  //                     }
  //                 }
  //             ],
  //             "token": "mT6blaIfqWhzNXQLG8ksVbc1VodSxRZ8lu5cMgda"
  //         },
  //         "args": null
  //     }
  //  */
  setEnvelopeRegModule(regData) {
    this.postData = {
      ctx: 'Sys',
      m: 'Moduleman',
      c: 'ModulesController',
      a: 'actionRegisterModule',
      dat: {
        f_vals: [
          {
            data: regData
          }
        ],
        docproc: {},
        token: this.svSess.token
      },
      args: null
    };
  }

  setRespRegModule(data) {
    console.log(data);


  }

  /**
   * register module
   */
  deRegisterModule(moduleName, isSysModule) {
    let data = {
      module_name: moduleName,
      is_sys_module: isSysModule
    };
    data = this.cleanRegData(data);
    this.setEnvelopeDeRegModule(data);
    /*
    post login request to server
    */
    this.svServer.proc(this.postData)
      .subscribe((res: any) => {
        console.log(res);
        this.setRespRegModule(res.data);
      });
  }

  // /**
  //  *
  //  * @param data
  //  * {
  //         "ctx": "Sys",
  //         "m": "Moduleman",
  //         "c": "ModulesController",
  //         "a": "actionRegisterModule",
  //         "dat": {
  //             "f_vals": [
  //                 {
  //                     "data": {
  //                         "module_name": "FooModule",
  //                         "is_sys_module": false
  //                     }
  //                 }
  //             ],
  //             "token": "mT6blaIfqWhzNXQLG8ksVbc1VodSxRZ8lu5cMgda"
  //         },
  //         "args": null
  //     }
  //  */
  setEnvelopeDeRegModule(deRegData) {
    console.log('ModulesService::setEnvelopeDeRegModule(deRegData)');
    console.log(deRegData);
    this.postData = {
      ctx: 'Sys',
      m: 'Moduleman',
      c: 'ModulesController',
      a: 'actionDeRegisterModule',
      dat: {
        f_vals: [
          {
            data: deRegData
          }
        ],
        docproc: {},
        token: this.svSess.token
      },
      args: null
    };
  }

  toggleEnable(moduleID, state) {
    state = Boolean(state);
    if (state === true) {
      this.disableModule(moduleID);
    } else {
      this.enableModule(moduleID);
    }
  }

  enableModule(moduleID) {
    // let data = {
    //   module_name: moduleName,
    //   is_sys_module: isSysModule
    // };
    // data = this.cleanRegData(data);
    this.setEnvelopEnableModule(moduleID);
    /*
    post login request to server
    */
    this.svServer.proc(this.postData)
      .subscribe((res: any) => {
        console.log(res);
        this.setRespRegModule(res.data);
      });
  }

  // /**
  //  *
  //  * @param data
  //  * {
  //       "ctx": "Sys",
  //       "m": "Moduleman",
  //       "c": "ModulesController",
  //       "a": "actionEnable",
  //       "dat": {
  //           "f_vals": [
  //               {
  //                   "data": {
  //                       "module_id": 92
  //                   }
  //               }
  //           ],
  //           "token": "mT6blaIfqWhzNXQLG8ksVbc1VodSxRZ8lu5cMgda"
  //       },
  //       "args": null
  //   }
  //  */
  setEnvelopEnableModule(moduleID) {
    console.log('ModulesService::setEnvelopEnableModule(moduleID)');
    this.postData = {
      ctx: 'Sys',
      m: 'Moduleman',
      c: 'ModulesController',
      a: 'actionEnable',
      dat: {
        f_vals: [
          {
            data: { module_id: moduleID }
          }
        ],
        docproc: {},
        token: this.svSess.token
      },
      args: null
    };
  }

  disableModule(moduleID) {
    this.setEnvelopeDisableModule(moduleID);
    /*
    post login request to server
    */
    this.svServer.proc(this.postData)
      .subscribe((res: any) => {
        console.log(res);
        this.setRespRegModule(res.data);
      });
  }

  // /**
  //  *
  //  * @param data
  //  * {
  //       "ctx": "Sys",
  //       "m": "Moduleman",
  //       "c": "ModulesController",
  //       "a": "actionDisable",
  //       "dat": {
  //           "f_vals": [
  //               {
  //                   "data": {
  //                       "module_id": 92
  //                   }
  //               }
  //           ],
  //           "token": "mT6blaIfqWhzNXQLG8ksVbc1VodSxRZ8lu5cMgda"
  //       },
  //       "args": null
  //   }
  //  */
  setEnvelopeDisableModule(moduleID) {
    console.log('ModulesService::setEnvelopeDisableModule(moduleID)');
    this.postData = {
      ctx: 'Sys',
      m: 'Moduleman',
      c: 'ModulesController',
      a: 'actionDisable',
      dat: {
        f_vals: [
          {
            data: { module_id: moduleID }
          }
        ],
        docproc: {},
        token: this.svSess.token
      },
      args: null
    };
  }

  registerModuleUser(moduleID) {

  }

  getGetAll() {
    console.log('starting getGetAll()');
    this.setEnvelopeGetAll();
    console.log('this.postData:', this.postData);
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
  //         "c": "ModulesController",
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
      c: 'ModulesController',
      a: 'actionGetAll',
      dat: {
        token: this.svSess.getCdToken()
      },
      args: null
    };
  }

  setRespGetAll(data) {
    console.log('starting setRespGetAll()');
    console.log('data:', data);
    console.log(data);
    this.Modules = data;
  }

}
