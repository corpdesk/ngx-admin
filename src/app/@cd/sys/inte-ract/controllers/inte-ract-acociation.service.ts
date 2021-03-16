import { Injectable } from '@angular/core';
import { ServerService } from '../../moduleman/controllers/server.service';
import { SessService } from '../../user/controllers/sess.service';
import { UserService } from '../../user/controllers/user.service';
import { SocketIoService } from '../../cd-push/controllers/socket-io.service';
import { CdFilter } from '../../../base/b.model';

@Injectable({
  providedIn: 'root'
})
export class InteRactAcociationService {
  postData;
  constructor(
    private svServer: ServerService,
    private svSess: SessService,
    private svUser: UserService,
    private svSocket: SocketIoService,
  ) { }

  /**
   * Interactions are strupped in 'association' groupings.
   * This method gets list of groupings where interact user is associated
   * eg Pals and any other grouping where user is
   * including list of consumer_users
   * @param f: CdFilter[]
   */
   getAssociationsObsv(f: CdFilter[]) {
    console.log('starting InteRactAcociationService::getAssociationsObsv()');
    this.setEnvelopeGetAssociation(f);
    console.log('this.postData:', JSON.stringify(this.postData));
    return this.svServer.proc(this.postData)
  }

  /**
   * 
  //  * {
  //              "ctx": "Sys",
  //              "m": "InteRact",
  //              "c": "InteRactAssociationController",
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
  setEnvelopeGetAssociation(f: CdFilter[]) {
    this.postData = {
      ctx: 'Sys',
      m: 'InteRact',
      c: 'InteRactAssociationController',
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
