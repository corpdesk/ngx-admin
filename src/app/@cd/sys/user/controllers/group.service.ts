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

  joinGroup(member) { 

  }

  getAll(filter) { 

  }

  get(filter) { 
    
  }
}
