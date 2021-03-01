import { Injectable } from '@angular/core';
import { InteRactReactData } from '../models/inte-ract.model';
import { ServerService } from '../../moduleman/controllers/server.service';
import { SessService } from '../../user/controllers/sess.service';
import { UserService } from '../../user/controllers/user.service';
import { SocketIoService } from '../../cd-push/controllers/socket-io.service';
import { CdFilter } from '../../../base/b.model';

@Injectable({
  providedIn: 'root'
})
export class InteRactReactService {
  Reactions;
  postData;
  constructor(
    private svServer: ServerService,
    private svSess: SessService,
    private svUser: UserService,
    private svSocket: SocketIoService,
  ) { }

  /*
  * create a react
  */
  createReactObsv(createReactData: InteRactReactData) {
    console.log('starting createReactObsv::createReactData()');
    this.setEnvelopeCreateReact(createReactData);
    console.log('createReactObsv(createReactData: InteRactData)/this.postData:', JSON.stringify(this.postData));
    return this.svServer.proc(this.postData)
  }

  // /**
    //  * {
        // {
        //     "ctx": "Sys",
        //     "m": "InteRact",
        //     "c": "InteRactReactController",
        //     "a": "actionCreate",
        //     "dat": {
        //         "f_vals": [
        //             {
        //                 "inte_ract_media": {
        //                     "inte_ract_media_name": "",
        //                     "inte_ract_media_description": "",
        //                     "inte_ract_media_type_id": "",
        //                     "location": "http:localhost/xxx"
        //                 },
        //                 "data": {
        //                     "inte_ract_react_name": "pms/schedule?project_id=3&schedule_id=12",
        //                     "inte_ract_react_description": "jgfl",
        //                     "inte_ract_react_type_id": "1",
        //                     "inte_ract_react_type_optval": "3",
        //                     "j_val": "{\"m\":\"pms\",\"c\":\"schedules\",\"projectID\":\"3\",\"scheduleID\":\"12\"}",
        //                     "inte_ract_pub_id": "11",
        //                     "parent_id": "-1"
        //                 }
        //             }
        //         ],
        //         "token": "mT6blaIfqWhzNXQLG8ksVbc1VodSxRZ8lu5cMgda"
        //     },
        //     "args": null
        // }
    //  */
  setEnvelopeCreateReact(createReactData) {
    this.postData = {
      ctx: 'Sys',
      m: 'InteRact',
      c: 'InteRactReactController',
      a: 'actionCreate',
      dat: {
        f_vals: [
          createReactData
        ],
        token: this.svSess.getCdToken()
      },
      args: null
    };
  }

  pushData(pushEvent, data) {
    switch (pushEvent) {
      case 'send-react':
        this.svSocket.emit(pushEvent, data);
        break;
      case 'private':
        // if scope is room, subscribe to room then emit
        this.svSocket.emit(pushEvent, data);
        // if channel, subscribe to channel then send message
        break;
    }
  }

  /**
   * Array of custom sql-like filters.
   * @param f: CdFilter[]
   */
  getReactObsv(f: CdFilter[]) {
    console.log('starting InteRactReactService::getReactObsv()');
    this.setEnvelopeGetReact(f);
    console.log('this.postData:', JSON.stringify(this.postData));
    return this.svServer.proc(this.postData)
  }

  /**
   * 
  //  * {
  //              "ctx": "Sys",
  //              "m": "InteRact",
  //              "c": "InteRactReactController",
  //              "a": "actionGet",
  //              "dat": {
  //                  "f_vals": [
  //                      {
  //                          "filter": [
  //                              {
  //                                  "field": "user_id",
  //                                  "operator": "=",
  //                                  "val": "1010"
  //                              }
  //                          ]
  //                      }
  //                  ],
  //                  "token": "mT6blaIfqWhzNXQLG8ksVbc1VodSxRZ8lu5cMgda"
  //              },
  //              "args": null
  //          }
   * @param filter 
   */
  setEnvelopeGetReact(f: CdFilter[]) {
    this.postData = {
      ctx: 'Sys',
      m: 'InteRact',
      c: 'InteRactReactController',
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
