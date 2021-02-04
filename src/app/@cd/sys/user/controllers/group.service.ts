import { Injectable } from '@angular/core';
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
  constructor(
    private svServer: ServerService,
    private svSess: SessService,
  ) { }

  getGroupsObsv() {
    console.log('starting getGroupsObsv()');
    this.setEnvelopeGroups();
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
  //     "a": "actionGetAll",
  //     "dat": {
  //         "token": "6E831EAF-244D-2E5A-0A9E-27C1FDF7821D"
  //     },
  //     "args": null
  // }
  setEnvelopeGroups() {
    this.postData = {
      ctx: 'Sys',
      m: 'User',
      c: 'GroupController',
      a: 'actionGetAll',
      dat: {
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

  registerGroupObsv(regData) {
    console.log('starting getGroupsObsv()');
    this.setEnvelopeRegisterGroup(regData);
    console.log('this.postData:', JSON.stringify(this.postData));
    return this.svServer.proc(this.postData);
  }

  // {
    //     "ctx": "Sys",
    //     "m": "User",
    //     "c": "GroupMemberController",
    //     "a": "actionCreate",
    //     "dat": {
    //         "f_vals": [
    //             {
    //                 "data": {
    //                     "user_id_member": "1010",
    //                     "member_guid": "fe5b1a9d-df45-4fce-a181-65289c48ea00",
    //                     "group_guid_parent": "D7FF9E61-B143-D083-6130-A51058AD9630",
    //                     "cd_obj_type_id": "9"
    //                 }
    //             },
    //             {
    //                 "data": {
    //                     "user_id_member": "1015",
    //                     "member_guid": "fe5b1a9d-df45-4fce-a181-65289c48ea00",
    //                     "group_guid_parent": "2cdaba03-5121-11e7-b279-c04a002428aa",
    //                     "cd_obj_type_id": "9"
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
      a: 'actionGetAll',
      dat: {
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
