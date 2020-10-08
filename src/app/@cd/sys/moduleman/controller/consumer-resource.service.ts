import { Injectable } from '@angular/core';
import { ServerService } from './server.service';
import { SessService } from '../../user/controllers/sess.service';

@Injectable({
  providedIn: 'root'
})
export class ConsumerResourceService {
  postData;
  consumerResources = [];
  constructor(
    private svServer: ServerService,
    private svSess: SessService
  ) { }

  registerConsumerResourceObsv(data) {
    console.log('starting registerConsumerResourceObsv(data)')
    console.log('data:', data);
    this.setEnvelopeRegConsumerResource(data);
    console.log('this.postData:', JSON.stringify(this.postData));
    return this.svServer.proc(this.postData);
  }

  setEnvelopeRegConsumerResource(regData) {
    this.postData = {
      ctx: 'Sys',
      m: 'Moduleman',
      c: 'ConsumerResourceController',
      a: 'actionCreate',
      dat: {
        f_vals: regData,
        docproc: {},
        token: this.svSess.token
      },
      args: null
    };
  }

  setRespRegConsumerResource(data) {
    console.log(data);
  }

  getAll() {
    this.setEnvelopeGetAll();
    this.svServer.proc(this.postData)
      .subscribe((res) => {
        console.log(res);
        this.setRespGetAll(res['data']);
      });
  }

  getAllObsv() {
    this.setEnvelopeGetAll();
    return this.svServer.proc(this.postData);
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
    this.consumerResources = data;
  }
}
