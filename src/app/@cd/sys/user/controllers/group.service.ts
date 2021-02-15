import { Injectable } from '@angular/core';
import { CdFilter } from '../../../base/b.model';
import { ServerService } from '../../moduleman/controllers/server.service';
import { SessService } from '../../user/controllers/sess.service';
import { Group } from '../../user/models/group-model';


@Injectable({
  providedIn: 'root'
})
export class GroupService {
  postData: any;
  cd_token: any;
  selectedGroups: Group[] = [];
  isInvalidSelGroups = true;
  ExtFilter: CdFilter[] = null;
  constructor(
    private svServer: ServerService,
    private svSess: SessService,
  ) { }

  // registerProjectObsv(data) {
  //   console.log(data);
  //   this.setEnvelopeRegProject(data);
  //   return this.svServer.proc(this.postData);
  // }

  // setEnvelopeRegProject(regData) {
  //   this.postData = {
  //     ctx: 'App',
  //     m: 'Pms',
  //     c: 'ProjectController',
  //     a: 'actionCreate',
  //     dat: {
  //       f_vals: [
  //         {
  //           data: regData
  //         }
  //       ],
  //       docproc: {},
  //       token: this.svSess.getCdToken()
  //     },
  //     args: null
  //   };
  // }

  registerGroupObsv(regData) {
    console.log('starting getGroupsObsv()');
    this.setEnvelopeRegisterGroup(regData);
    console.log('this.postData:', JSON.stringify(this.postData));
    return this.svServer.proc(this.postData);
  }

  // {
  //     "ctx": "Sys",
  //     "m": "User",
  //     "c": "GroupController",
  //     "a": "actionCreate",
  //     "dat": {
  //         "f_vals": [
  //             {
  //                 "data": {
  //                     "user_id_member": "1010",
  //                     "member_guid": "fe5b1a9d-df45-4fce-a181-65289c48ea00",
  //                     "group_guid_parent": "D7FF9E61-B143-D083-6130-A51058AD9630",
  //                     "cd_obj_type_id": "9",
  //                     "is_public": true
  //                 }
  //             }
  //      ],
  //         "token": "6E831EAF-244D-2E5A-0A9E-27C1FDF7821D"
  //     },
  //     "args": null
  // }
  setEnvelopeRegisterGroup(regData) {
    this.postData = {
      ctx: 'Sys',
      m: 'User',
      c: 'GroupController',
      a: 'actionCreate',
      dat: {
        f_vals: [
          {
            data: regData
          }
        ],
        docproc: {},
        token: this.svSess.getCdToken()
      },
      args: null
    };
  }

  getGroupsObsv(filter: CdFilter[]) {
    console.log('starting getGroupsObsv()');
    console.log('filter:', filter);
    if(typeof(filter) == 'undefined'){
      filter = this.ExtFilter;
    }
    this.setEnvelopeGroups(filter);
    console.log('getGroupsObsv/this.postData:', JSON.stringify(this.postData));
    /*
    post request to server and return observable
    */
    return this.svServer.proc(this.postData);
  }

  // {
  //     "ctx": "Sys",
  //     "m": "User",
  //     "c": "GroupController",
  //     "a": "actionGetAll",
  //     "dat": {
  //         "token": "6E831EAF-244D-2E5A-0A9E-27C1FDF7821D"
  //     },
  //     "args": null
  // }
  setEnvelopeGroups(f: CdFilter[]) {
    console.log('starting setEnvelopeGroups(f: CdFilter[])');
    console.log('f:', f);
    this.postData = {
      ctx: 'Sys',
      m: 'User',
      c: 'GroupController',
      a: 'actionGet',
      dat: {
        f_vals: [
          {
            filter: f
          }
        ],
        token: this.svSess.getCdToken()
      },
      args: null
    };
  }

  getGroupRootObsv() {
    console.log('starting getGroupRootObsv()');
    this.setEnvelopeGroupRoot();
    console.log('this.postData:', JSON.stringify(this.postData));
    /*
    post request to server and return observable
    */
    return this.svServer.proc(this.postData);
  }

  // {
  //     "ctx": "Sys",
  //     "m": "User",
  //     "c": "GroupController",
  //     "a": "actionGetRoot",
  //     "dat": {
  //         "token": "6E831EAF-244D-2E5A-0A9E-27C1FDF7821D"
  //     },
  //     "args": null
  // }
  setEnvelopeGroupRoot() {
    this.postData = {
      ctx: 'Sys',
      m: 'User',
      c: 'GroupController',
      a: 'actionGetRoot',
      dat: {
        token: this.svSess.getCdToken()
      },
      args: null
    };
  }


  getGroupTypesObsv(f: CdFilter[]) {
    console.log('starting getGroupTypesObsv()');
    this.setEnvelopeGroupTypes(f);
    console.log('this.postData:', JSON.stringify(this.postData));
    /*
    post request to server and return observable
    */
    return this.svServer.proc(this.postData);
  }

  // /**
  //  NB: To get all data omit the 'filter' param
  //  * {
  //         "ctx": "Sys",
  //         "m": "User",
  //         "c": "GroupController",
  //         "a": "actionGetTypes",
  //         "dat": {
  //             "f_vals": [
  //                 {
  //                     "filter": [{
  //                         "field": "group_type_id",
  //                         "operator": ">",
  //                         "val":"3"
  //                     }]
  //                 }
  //             ],
  //             "token": "6E831EAF-244D-2E5A-0A9E-27C1FDF7821D"
  //         },
  //         "args": null
  //     }
  //  */
  setEnvelopeGroupTypes(f: CdFilter[]) {
    // //filter sample: 
    // f = [{
    //       field: "group_type_id",
    //       operator: ">",
    //       val: "3"
    //     }]
    let fVals;
    if (!f == null) {
      fVals = f;
    } else {
      fVals = {};
    }

    this.postData = {
      ctx: 'Sys',
      m: 'User',
      c: 'GroupController',
      a: 'actionGetTypes',
      dat: {
        f_vals: [
          fVals
        ],
        token: this.svSess.getCdToken()
      },
      args: null
    };
  }



  joinGroup(member) {

  }

  getAll(filter) {

  }

  get(filter) {

  }
}
