import { Injectable } from '@angular/core';
import { ServerService } from '../../../sys/moduleman/controllers/server.service';
import { SessService } from '../../../sys/user/controllers/sess.service';


@Injectable({
  providedIn: 'root'
})
export class ScheduleService {
  postData;
  constructor(
    private svServer: ServerService,
    private svSess: SessService,
  ) { }

  getScheduleObsv(){
    this.setEnvelopeGetSchedules();
    return this.svServer.proc(this.postData);
  }

  setEnvelopeGetSchedules() {
    this.postData = {
      ctx: 'Sys',
      m: 'Scheduler',
      c: 'ScheduleController',
      a: 'actionGet',
      dat: {
        token: this.svSess.getCdToken()
      },
      args: null
    };
  }

  registerScheduleObsv(data) {
    console.log(data);
    this.setEnvelopeRegSchedule(data);
    return this.svServer.proc(this.postData);
  }

  setEnvelopeRegSchedule(regData) {
    this.postData = {
      ctx: 'Sys',
      m: 'Scheduler',
      c: 'ScheduleController',
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
