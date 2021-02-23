
import { CdRequest, CdResponse }from '../../../base/cd-envelop';
// data structure for sending data to push server for dispatch
export interface CdPushEnvelop{ 
    pushRecepients: any;
    triggerEvent: string; 
    emittEvent: string; 
    req: CdRequest;
    resp: CdResponse;
}