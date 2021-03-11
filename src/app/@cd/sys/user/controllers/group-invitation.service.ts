import { Injectable } from '@angular/core';
import { CdFilter } from '../../../base/b.model';
import { ServerService } from '../../moduleman/controllers/server.service';
import { SessService } from '../../user/controllers/sess.service';
import { GroupMember, GroupMemberInput } from '../../user/models/gruoup-member-model';

@Injectable({
  providedIn: 'root'
})
export class GroupInvitationService {
  postData: any;
  constructor(
    private svServer: ServerService,
    private svSess: SessService,
  ) { }

  getGroupInvitationObsv(filter: CdFilter[]) {
    console.log('starting getGroupInvitationObsv()');
    this.setEnvelopeGroupMember(filter);
    console.log('this.postData:', JSON.stringify(this.postData));
    /*
    post request to server and return observable
    */
    return this.svServer.proc(this.postData);
  }

  // {
  //     "ctx": "Sys",
  //     "m": "User",
  //     "c": "GroupMemberController",
  //     "a": "actionGroupMember",
  //     "dat": {
  //         "f_vals": [
  //             {
  //                 "filter": [
  //                     {
  //                         "field": "group_guid_parent",
  //                         "operator": "=",
  //                         "val": "5D865522-6"
  //                     }
  //                 ]
  //             }
  //         ],
  //         "token": "mT6blaIfqWhzNXQLG8ksVbc1VodSxRZ8lu5cMgda"
  //     },
  //     "args": null
  // }
  setEnvelopeGroupMember(f: CdFilter[]) {
    this.postData = {
      ctx: 'Sys',
      m: 'User',
      c: 'GroupInvitationController',
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
}
