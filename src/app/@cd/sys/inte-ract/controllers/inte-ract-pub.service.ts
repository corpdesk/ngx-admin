import { Injectable } from '@angular/core';
import { InteRactPubData } from '../models/inte-ract.model';
import { ServerService } from '../../moduleman/controllers/server.service';
import { SessService } from '../../user/controllers/sess.service';
import { UserService } from '../../user/controllers/user.service';
import { SocketIoService } from '../../cd-push/controllers/socket-io.service';
import { CdFilter } from '../../../base/b.model';

@Injectable({
  providedIn: 'root'
})
export class InteRactPubService {
  Pubs;
  postData;
  constructor(
    private svServer: ServerService,
    private svSess: SessService,
    private svUser: UserService,
    private svSocket: SocketIoService,
    ) { }

  /*
  * create a pub
  */
  createPubObsv(createPubData: InteRactPubData) {
    console.log('starting InteRactPubService::createPubObsv()');
    console.log('InteRactPubService::createPubObsv()/this.svUser.pals:', this.svUser.pals);
    this.setEnvelopeCreatePub(createPubData);
    console.log('createPubObsv(createPubData: InteRactData)/this.postData:', JSON.stringify(this.postData));
    return this.svServer.proc(this.postData)
  }

  // /**
  //  * {
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
  //                     "location": "${environment.HOST}/xxx",
  //                     "inte_ract_pub_id": ""
  //                 },
  //                 "data": {
  //                     "inte_ract_react_name": "pms/schedule?project_id=3&schedule_id=12",
  //                     "inte_ract_react_description": "jgfl",
  //                     "inte_ract_react_type_id": "1",
  //                     "inte_ract_react_type_optval": "3",
  //                     "j_val": "{\"m\":\"pms\",\"c\":\"schedules\",\"projectID\":\"3\",\"scheduleID\":\"12\"}"
  //                 }
  //             }
  //         ],
  //         "token": "mT6blaIfqWhzNXQLG8ksVbc1VodSxRZ8lu5cMgda"
  //     },
  //     "args": null
  // }
  //  */
  setEnvelopeCreatePub(createPubData) {
    this.postData = {
      ctx: 'Sys',
      m: 'InteRact',
      c: 'InteRactPubController',
      a: 'actionCreate',
      dat: {
        f_vals: [
          createPubData
        ],
        token: this.svSess.getCdToken()
      },
      args: null
    };
  }

  pushData(pushEvent, data) {
    switch (pushEvent) {
      case 'send-pub':
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
  getPubObsv(f: CdFilter[], fExt: CdFilter[][]) {
    console.log('starting InteRactPubService::getPubObsv()');
    this.setEnvelopeGetPub(f,fExt);
    console.log('this.postData:', JSON.stringify(this.postData));
    return this.svServer.proc(this.postData)
  }

  /**
   * 
      {
          "ctx": "Sys",
          "m": "InteRact",
          "c": "InteRactPubController",
          "a": "actionGet",
          "dat": {
              "f_vals": [
                  {
                      "filter": [
                          {
                              "field": "user_id",
                              "operator": "=",
                              "val": 1007,
                              "conjType": "or"
                          },
                          {
                              "field": "user_id",
                              "operator": "=",
                              "val": 1002,
                              "conjType": "or"
                          },
                          {
                              "field": "user_id",
                              "operator": "=",
                              "val": 1010,
                              "conjType": "or"
                          }
                      ],
                      "filterExt": [
                          [
                              {
                                  "fieldType": "json",
                                  "jField": "j_val",
                                  "jPath": "$.m",
                                  "operator": "=",
                                  "jVal": "user"
                              },
                              {
                                  "fieldType": "json",
                                  "jField": "j_val",
                                  "jPath": "$.domain.group_invitation_type_id",
                                  "operator": "=",
                                  "jVal": 1313
                              }
                          ]
                      ]
                  }
              ],
              "token": "5B812D34-EA96-9FFE-8EE9-443DEEF214A8"
          },
          "args": null
      }
   * @param filter 
   */
  setEnvelopeGetPub(f: CdFilter[], fExt: CdFilter[][]) {
    this.postData = {
      ctx: 'Sys',
      m: 'InteRact',
      c: 'InteRactPubController',
      a: 'actionGet',
      dat: {
        f_vals: [
          {
            filter: f,
            filterExt: fExt
          }
        ],
        token: this.svSess.getCdToken()
      },
      args: null
    };
  }
  
}
