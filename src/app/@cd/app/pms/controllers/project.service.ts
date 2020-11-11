import { Injectable } from '@angular/core';
import { ServerService } from '../../../sys/moduleman/controllers/server.service';
import { SessService } from '../../../sys/user/controllers/sess.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private postData;
  constructor(
    private svServer: ServerService,
    private svSess: SessService,
  ) { }

  registerProjectObsv(data) {
    console.log(data);
    this.setEnvelopeRegProject(data);
    /*
    post login request to server
    */
    return this.svServer.proc(this.postData);
  }

  setEnvelopeRegProject(regData) {
    this.postData = {
      ctx: 'App',
      m: 'Pms',
      c: 'ProjectController',
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
}
