import { Injectable } from '@angular/core';
import { ServerService } from '../../../sys/moduleman/controllers/server.service';
import { SessService } from '../../../sys/user/controllers/sess.service';
import { ScheduleSettings } from '../models/schedule.model';
import * as moment from 'moment';

const DATETIME_FORMAT = ScheduleSettings.DATETIME_FORMAT;
const TIME_FORMAT = ScheduleSettings.TIME_FORMAT;
const DATE_FORMAT = ScheduleSettings.DATE_FORMAT;


@Injectable({
  providedIn: 'root'
})
export class ScheduleService {
  schedule;
  postData;
  constructor(
    private svServer: ServerService,
    private svSess: SessService,
  ) {
    this.schedule = []
  }

  getScheduleObsv() {
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

  getProjectScheduleObsv(projectID) {
    this.setEnvelopeGetProjectSchedule(projectID);
    return this.svServer.proc(this.postData);
  }

  setEnvelopeGetProjectSchedule(projectID) {
    this.postData = {
      ctx: 'Sys',
      m: 'Scheduler',
      c: 'ScheduleController',
      a: 'actionGetProjectSchedule',
      dat: {
        f_vals: [
          {
            data: {
              project_id: projectID
            }
          }
        ],
        token: this.svSess.getCdToken()
      },
      args: null
    };
  }

  registerScheduleObsv(regData) {
    console.log(regData);
    this.setEnvelopeRegSchedule(regData);
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
          regData
        ],
        docproc: {},
        token: this.svSess.getCdToken()
      },
      args: null
    };
  }

  updateScheduleObsv(updateData) {
    console.log(updateData);
    this.setEnvelopeUpdateSchedule(updateData);
    return this.svServer.proc(this.postData);
  }

  /**
   * {
    "ctx": "Sys",
    "m": "Scheduler",
    "c": "ScheduleController",
    "a": "actionUpdate",
    "dat": {
        "f_vals": [
            {
                "filter": [
                    {
                        "field": "schedule_id",
                        "operator": "=",
                        "val": "104"
                    }
                ],
                "schedulestage": {
                    "days": "3",
                    "hrs": "16",
                    "schedulestage_name": "xxxx"
                },
                "data": {
                    "schedule_name": "nursury preparation",
                    "schedule_description": "testing description2"
                }
            }
        ],
        "token": "mT6blaIfqWhzNXQLG8ksVbc1VodSxRZ8lu5cMgda"
    },
    "args": null
}
   * @param updateData 
   */
  setEnvelopeUpdateSchedule(updateData) {
    this.postData = {
      ctx: 'Sys',
      m: 'Scheduler',
      c: 'ScheduleController',
      a: 'actionUpdate',
      dat: {
        f_vals: [
          updateData
        ],
        docproc: {},
        token: this.svSess.getCdToken()
      },
      args: null
    };
  }

  addSchedule() {
    const newSchedule = {
      taskName: 'Task4',
      taskCost: 'USD76.00',
      taskDesc: 'Descrp three',
      taskGanttGridRow: {
        id: 'taskGanttGridRow-2',
        width: 0,
        height: 38
      },
      taskGanttEventRow: {
        id: 'taskGanttEventRow-3',
        height: 38
      },
      divGanttEvent: {
        id: 'divGanttEvent-3',
        startDay: 7
      },
      taskGanttEventBlock: {
        id: 'taskGanttEventBlock-3',
        noOfDays: 8,
      }
    };
    this.schedule.push(newSchedule);
  }

  mysqlToEpoch(mysqlTime) {
    console.log('starting mysqlToEpoch(mysqlTime)');
    console.log('mysqlTime:', mysqlTime);
    const tStr = mysqlTime.replace(' ', 'T');
    console.log('tStr:', tStr);
    return new Date(tStr).getTime() / 1000;
  }

  epochToDateTime(epoch) {
    return moment.unix(epoch).format(DATETIME_FORMAT);
  }

  leading0(val) {
    if (val < 10 && val > -1) {
      return '0' + val;
    } else {
      return val;
    }
  }
}
