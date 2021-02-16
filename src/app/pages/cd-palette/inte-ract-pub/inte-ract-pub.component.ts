import { Component, OnInit, Input } from '@angular/core';
import { InteRactPubService } from '../../../@cd/sys/inte-ract/controllers/inte-ract-pub.service';
import { InteRactData } from '../../../@cd/sys/inte-ract/models/inte-ract.model';
import { HtmlElemService } from '../../../@cd/guig/html-elem.service';

@Component({
  selector: 'ngx-inte-ract-pub',
  templateUrl: './inte-ract-pub.component.html',
  styleUrls: ['./inte-ract-pub.component.scss']
})
export class InteRactPubComponent implements OnInit {
  @Input() pubType = 'Pub';
  @Input() pubScope = 'Group';
  pubPlaceholder = '';
  avatar;
  constructor(
    public svInteRactPub: InteRactPubService,
    public svHtml: HtmlElemService,
  ) {
    this.initData();
  }

  ngOnInit(): void {
    this.initUI();
  }

  // invoke all methods that do not have to wait for UI to be ready
  initData() {
    this.setCuidAvatar()
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

  // avatar for current user
  setCuidAvatar() {
    this.avatar = '../../../../assets/cd/inspinia/img/a3.jpg';
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
    const msg = this.svHtml.getHTMLInputVal('msgNew');
    // console.log('msg:', msg);
    // const newPub = {
    //   "inte_ract_pub_id": 12,
    //   "inte_ract_pub_guid": "8739D430-B9ED-553D-66B6-0E51CBB44EED",
    //   "inte_ract_pub_name": "pms/schedule?project_id=3&schedule_id=12",
    //   "inte_ract_pub_description": msg,
    //   "doc_id": 10396,
    //   "inte_ract_pub_type_id": null,
    //   "public": 0,
    //   "location": "http://localhost/xxx",
    //   "doc_from": 1010,
    //   "doc_date": "2020-12-10 21:09:37",
    //   "mobile": "895909",
    //   "gender": 1,
    //   "dateobirth": "1976-03-10 09:53:37",
    //   "fname": "Karl",
    //   "mname": "D",
    //   "lname": "Lulu",
    //   "Trusted": 1,
    //   "username": "karl",
    //   "user_id": 1010,
    //   "fullname": "Karl D Lulu X",
    //   "avatar": "{\"large\": \"\", \"small\": \"../../../../assets/cd/inspinia/img/a3.jpg\"}",
    //   "comments": []
    // };
    // const pubsTemp = this.svInteRactPub.Pubs;
    // pubsTemp.push(newPub);
    // this.svInteRactPub.Pubs = pubsTemp.sort(function (a, b) {
    //   return b.inte_ract_pub_id - a.inte_ract_pub_id;
    // });
    // console.log('this.svInteRactPub.Pubs:', this.svInteRactPub.Pubs);

    const createPubData: InteRactData = {
      inte_ract_media: {
        inte_ract_media_name: "",
        inte_ract_media_description: "",
        inte_ract_media_type_id: null,
        location: "http://localhost/xxx",
        inte_ract_pub_id: null
      },
      data: {
        inte_ract_pub_name: "pms/schedule?project_id=3&schedule_id=12",
        inte_ract_pub_description: msg,
        inte_ract_pub_type_id: 1,
        j_val: "{\"m\":\"pms\",\"c\":\"schedules\",\"projectID\":\"3\",\"scheduleID\":\"12\"}"
      }
    }

    this.svInteRactPub.createPubObsv(createPubData).subscribe((resp) => {
      console.log('resp:', resp)
    })

  }

}
