import { Injectable } from '@angular/core';
import { ServerService } from '../../../sys/moduleman/controllers/server.service';
import { SessService } from '../../../sys/user/controllers/sess.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private postData;
  public pushChannel = 'pms'; // the room where all the clients expecting push data should enroll
  constructor(
    private svServer: ServerService,
    private svSess: SessService,
  ) { }

  getProjectsObsv(){
    this.setEnvelopeGetProjects();
    return this.svServer.proc(this.postData);
  }

  setEnvelopeGetProjects() {
    this.postData = {
      ctx: 'App',
      m: 'Pms',
      c: 'ProjectController',
      a: 'actionGet',
      dat: {
        token: this.svSess.getCdToken()
      },
      args: null
    };
  }

  registerProjectObsv(data) {
    console.log(data);
    this.setEnvelopeRegProject(data);
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
