import { Injectable } from '@angular/core';
import { InteRactData } from '../models/inte-ract.model';
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
    private svSocket: SocketIoService,) { }

  /*
  * create a pub
  */
  createPubObsv(createPubData: InteRactData) {
    console.log('starting InteRactPubService::createPubObsv()');
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
  //                     "location": "http://localhost/xxx",
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

  /**
   * Array of custom sql-like filters.
   * @param f: CdFilter[]
   */
  getPubObsv(f: CdFilter[]) {
    console.log('starting InteRactPubService::createPubObsv()');
    this.setEnvelopeGetPub(f);
    console.log('this.postData:', JSON.stringify(this.postData));
    return this.svServer.proc(this.postData)
  }

  /**
   * 
  //  * {
  //              "ctx": "Sys",
  //              "m": "InteRact",
  //              "c": "InteRactPubController",
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
  setEnvelopeGetPub(f: CdFilter[]) {
    this.postData = {
      ctx: 'Sys',
      m: 'InteRact',
      c: 'InteRactPubController',
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
