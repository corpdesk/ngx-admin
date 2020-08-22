import { Injectable } from '@angular/core';

import { ServerService } from './server.service';
import { SessService } from '../../user/controllers/sess.service';
import { User, RegModel, Resp } from '../../user/models/user-model';
import { UserService } from '../../user/controllers/user.service';

@Injectable({
  providedIn: 'root'
})
export class ConsumerService {
postData;
consumers;
  constructor(
    private svServer: ServerService,
    private svUser: UserService,
    private svSess: SessService
  ) { 
    this.getAll();
  }

  
  getAll() {
    this.setEnvelopeGetAll();
    this.svServer.proc(this.postData)
      .subscribe((res) => {
        console.log(res);
        this.setRespGetAll(res['data']);
      });
  }


  /**
   * 
   * @param data 
   * {
        "ctx": "Sys",
        "m": "Moduleman",
        "c": "ConsumerController",
        "a": "actionGetAll",
        "dat": {
            "token": "mT6blaIfqWhzNXQLG8ksVbc1VodSxRZ8lu5cMgda"
        },
        "args": null
    }
   */
  setEnvelopeGetAll() {
    this.postData = {
      ctx: 'Sys',
      m: 'Moduleman',
      c: 'ConsumerController',
      a: 'actionGetAll',
      dat: {
        token: this.svSess.token
      },
      args: null
    };
  }

  setRespGetAll(data) {
    console.log('ConsumerService::setResGetAll()');
    console.log(data);
    this.consumers = data;
  }
}
