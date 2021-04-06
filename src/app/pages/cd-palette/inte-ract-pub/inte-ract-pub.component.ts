import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../../../@cd/sys/user/controllers/user.service';
import { InteRactPubService } from '../../../@cd/sys/inte-ract/controllers/inte-ract-pub.service';
import { InteRactReactService } from '../../../@cd/sys/inte-ract/controllers/inte-ract-react.service';
import { InteRactPubData, InteRactReactData } from '../../../@cd/sys/inte-ract/models/inte-ract.model';
import { HtmlElemService } from '../../../@cd/guig/html-elem.service';


@Component({
  selector: 'ngx-inte-ract-pub',
  templateUrl: './inte-ract-pub.component.html',
  styleUrls: ['./inte-ract-pub.component.scss']
})
export class InteRactPubComponent implements OnInit {

  /**
   * Type of publication
   * could be by publication/post or reaction/comment etc
   */
  @Input() pubType = 'Pub';

  /**
   * pulication scope of distribution
   * could be by group or individuals
   */
  @Input() pubScope = 'Group';

  /**
   * publication context:
   * used for filtering data for given component
   * and segmentation of data per topical concerns
   * as per module design and objectives
   * m = module
   * c = controller
   * domain = limit of distribution by given module traits
   * PMS my have domain by projectID and scheduleID
   */
  @Input() pubCtx = {
    m: 'pms',
    c: 'schedules',
    domain: {
      projectID: 3,
      scheduleID: 12
    }
  };

  /**
   * recepints set by the component client
   */
  @Input() pushRecepients;

  /**
   * The filter is supplied by the 
   * consumer component depending on its design
   * and requirement
   */
  @Input() pubFilter = [];

  /**
   * component consumers must be able
   * to query expected recepients and
   * send as input
   */
  @Input() pubRecepients = [];

  /**
   * if this.pubType == 'react',
   * the post is expected to have a pup_id
   * referred to as parentID
   */
  @Input() parentID = 0;
  @Input() msgHtmlID = '';



  cuidAvatar = '';
  pubPlaceholder = '';
  constructor(
    public svInteRactPub: InteRactPubService,
    public svInteRactReact: InteRactReactService,
    public svHtml: HtmlElemService,
    private svUser: UserService,
  ) {
    this.initData();
  }

  ngOnInit(): void {
    this.initUI();
  }

  // invoke all methods that do not have to wait for UI to be ready
  initData() {
    // console.log('InteRactPubComponent::initData():');
    // console.log('this.svUser.currentProfile:', this.svUser.currentProfile);
    this.cuidAvatar = this.svUser.currentProfile.picture;
  }

  // invoke methods that require UI to be ready first
  initUI() {
    this.setPlaceholder()
  }

  setPlaceholder() {
    console.log('this.pubType:', this.pubType);
    switch (this.pubType) {
      case 'Pub':
        this.pubPlaceholder = 'New Pub...';
        break;
      case 'React':
        this.pubPlaceholder = 'Post a comment...';
        break;
    }
  }

  create() {
    switch (this.pubType) {
      case 'Pub':
        this.createPub();
        break;
      case 'React':
        this.createReact();
        break;
    }
  }

  // avatar for current user
  // setCuidAvatar() {
  //   this.avatar = '../../../../assets/cd/inspinia/img/a3.jpg';
  // }

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
  //                     "inte_ract_pub_name": "pms/schedule?project_id=3&schedule_id=12",
  //                     "inte_ract_pub_description": "jgfl",
  //                     "inte_ract_pub_type_id": "1",
  //                     "inte_ract_pub_type_optval": "3",
  //                     "j_val": "{\"m\":\"pms\",\"c\":\"schedules\",\"projectID\":\"3\",\"scheduleID\":\"12\"}"
  //                 }
  //             }
  //         ],
  //         "token": "mT6blaIfqWhzNXQLG8ksVbc1VodSxRZ8lu5cMgda"
  //     },
  //     "args": null
  // }
  //  */
  createPub() {
    console.log('InteRactPubComponent::createPub()/this.svUser.pals:', this.svUser.pals);
    const txtID = 'msgPub';
    const msg = this.svHtml.getHTMLInputVal(txtID);
    const createPubData: InteRactPubData = {
      pubFilter: this.pubFilter,
      inte_ract_media: {
        inte_ract_media_name: "",
        inte_ract_media_description: "",
        inte_ract_media_type_id: null,
        location: "${environment.HOST}/xxx",
        inte_ract_pub_id: null
      },
      data: {
        inte_ract_pub_name: 'pms/schedule?project_id=3&schedule_id=12',
        inte_ract_pub_description: msg,
        inte_ract_pub_type_id: 1,
        j_val: JSON.stringify(this.pubCtx)
      }
    }

    console.log('createPub/this.pushRecepients:',this.pushRecepients);
    // pushRecepients
    this.svInteRactPub.createPubObsv(createPubData).subscribe((ret: any) => {
      console.log('InteRactPubComponent::createPub()/ret:', ret);
      const pushEnvelop = {
        pushRecepients: this.pushRecepients,
        emittEvent: 'push-pub',
        pushData: ret.data.pubs,
        req: this.svInteRactPub.setEnvelopeCreatePub(createPubData),
        resp: ret
      };
      console.log('InteRactPubComponent::createPub()/pushEnvelop:', pushEnvelop);
      this.svInteRactPub.pushData('send-pub', pushEnvelop);
      this.svHtml.setHTMLInputVal(txtID, '');
    })

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
  createReact() {
    console.log('InteRactPubComponent::createPub()/this.svUser.pals:', this.svUser.pals);
    console.log('this.parentID:', this.parentID);
    const txtID = 'msg-' + this.parentID;
    const msg = this.svHtml.getHTMLInputVal(txtID);
    console.log('createReact()/msg:', msg);
    const createReactData: InteRactReactData = {
      pubFilter: this.pubFilter,
      inte_ract_media: {
        inte_ract_media_name: '',
        inte_ract_media_description: '',
        inte_ract_media_type_id: 2,
        location: 'http:localhost/xxx'
      },
      data: {
        inte_ract_react_name: 'pms/schedule?project_id=3&schedule_id=12',
        inte_ract_react_description: msg,
        inte_ract_react_type_id: 1,
        inte_ract_react_type_optval: 3,
        j_val: '{\"m\":\"pms\",\"c\":\"schedules\",\"projectID\":\"3\",\"scheduleID\":\"12\"}',
        inte_ract_pub_id: this.parentID,
        parent_id: -1
      }
    }

    this.svInteRactReact.createReactObsv(createReactData).subscribe((ret: any) => {
      const pushEnvelop = {
        pushRecepients: this.pushRecepients,
        emittEvent: 'push-react',
        pushData: ret.data.react,
        req: this.svInteRactReact.setEnvelopeCreateReact(createReactData),
        resp: ret
      };
      console.log('InteRactReactComponent::createReact()/pushEnvelop:', pushEnvelop);
      this.svInteRactReact.pushData('send-react', pushEnvelop);
      this.svHtml.setHTMLInputVal(txtID, '');
    })

  }



}
