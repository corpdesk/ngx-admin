import { Injectable } from '@angular/core';
import { ServerService } from '../../moduleman/controller/server.service';
import { SessService } from '../../user/controllers/sess.service';

@Injectable({
  providedIn: 'root'
})
export class GroupMemberService {
  postData: any;
  constructor(
    private svServer: ServerService,
    private svSess: SessService,
  ) { }

  createObsv(members) {
    console.log('starting createObsv()');
    this.setEnvelopeCreate(members);
    console.log('this.postData:', JSON.stringify(this.postData));
    /*
    post request to server and return observable
    */
    return this.svServer.proc(this.postData);
  }

  // Request format:
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
  setEnvelopeCreate(members) {
    this.postData = {
      ctx: 'Sys',
      m: 'User',
      c: 'GroupMemberController',
      a: 'actionCreate',
      dat: {
                f_vals: members,
        token: this.svSess.getCdToken()
      },
      args: null
    };
  }

  removeUser() {

  }

  getAll() {

  }

  get(filter) {

  }
}
