import { Component, OnInit, ElementRef, AfterViewInit, ViewEncapsulation } from '@angular/core';
import { CdSocialPost } from '../../../@cd/sys/comm/models/comm.model';
import { InteRactPubService } from '../../../@cd/sys/inte-ract/controllers/inte-ract-pub.service';
import { HtmlElemService } from '../../../@cd/guig/html-elem.service';
import { CdFilter } from '../../../@cd/base/b.model';
import { UserService } from '../../../@cd/sys/user/controllers/user.service';


@Component({
  selector: 'ngx-inte-ract',
  templateUrl: './inte-ract.component.html',
  styleUrls: ['./inte-ract.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class InteRactComponent implements OnInit, AfterViewInit {
  pubType = 'Post';
  pubScope = 'Group';
  constructor(
    private elementRef: ElementRef,
    public svInteRactPub: InteRactPubService,
    public svHtml: HtmlElemService,
    private svUser: UserService,
  ) {
    const f: CdFilter[] = [
      {
        field: 'user_id',
        operator: '=',
        val: this.svUser.cuid
      }
    //   {
    //     field: 'j_val->projectID', // laravel query builder syntax for mysql json colum (https://laravel.com/docs/8.x/queries#json-where-clauses)
    //     operator: '=',
    //     val: 4 // based on id of the selected project
    //   }
    ];
    console.log('this.svUser.cuid:', this.svUser.cuid);
    this.svInteRactPub.getPubObsv(f).subscribe((resp: any) => {
      console.log('InteRactComponent::construct/resp.data:', resp.data);
      this.svInteRactPub.Pubs = resp.data;
      let pubsTemp = this.svInteRactPub.Pubs;
      this.svInteRactPub.Pubs = pubsTemp.sort(function (a, b) {
        return b.inte_ract_pub_id - a.inte_ract_pub_id;
      });
    });

  }

  ngOnInit(): void {

  }

  ngAfterViewInit() {
  }

  htmlPub() {
    const ret = `<div class="social-feed-box">

                      <div class="float-right social-action dropdown">
                          <button data-toggle="dropdown" class="dropdown-toggle btn-white">
                          </button>
                          <ul class="dropdown-menu m-t-xs">
                              <li><a href="#">Config</a></li>
                          </ul>
                      </div>
                      <div class="social-avatar">
                          <a href="" class="float-left">
                              <img alt="image" src="../../../../assets/cd/inspinia/img/a1.jpg">
                          </a>
                          <div class="media-body">
                              <a href="#">
                                  Joan Atuhura
                              </a>
                              <small class="text-muted">Today 4:21 pm - 12.06.2019</small>
                          </div>
                      </div>
                      <div class="social-body">
                          <p>
                              I’ve been having various discussion with stakeholders at different levels 
                              over the last number of months; techies, CEOs, operational people - all sorts. 
                              I think we’re missing a single ‘goto’ place for discussions, and maybe this is the place. 
                              Any thoughts on whether we should just be encouraging anyone related to co-ops to sign up here, 
                              or creating a new forum with Cotech as a category within it?
                          </p>

                          <div class="btn-group">
                              <button class="btn btn-white btn-xs"><i class="fa fa-thumbs-up"></i> Like this!</button>
                              <button class="btn btn-white btn-xs"><i class="fa fa-comments"></i> Comment</button>
                              <button class="btn btn-white btn-xs"><i class="fa fa-share"></i> Share</button>
                          </div>
                      </div>
                      <div class="social-footer">
                          <div class="social-comment">
                              <a href="" class="float-left">
                                  <img alt="image" src="../../../../assets/cd/inspinia/img/a2.jpg">
                              </a>
                              <div class="media-body">
                                  <a href="#">
                                      Bettyrose Akinyi
                                  </a>
                                  I had several similar conversations at OPEN, but consensus seemed to be that the CoTech forum is 
                                  working as it has a focus. CUK host several other ‘thematic’ forums (such as the Community Shares 
                                  Practitioner and Community Energy networks) and have found the focus of these to be the key to generating 
                                  good content/engagement.
                                  <br/>
                                  <a href="#" class="small"><i class="fa fa-thumbs-up"></i> 26 Like this!</a> -
                                  <small class="text-muted">12.06.2019</small>
                                  
                                  <div class="comment-reply">
                                      <div class="social-comment">
                                          <a href="" class="float-left">
                                              <img alt="image" src="../../../../assets/cd/inspinia/img/a2.jpg">
                                          </a>
                                          <div class="media-body">
                                              <a href="#">
                                                  Bettyrose Akinyi
                                              </a>
                                              I had several similar conversations at OPEN, but consensus seemed to be that the CoTech forum is 
                                              working as it has a focus. CUK host several other ‘thematic’ forums (such as the Community Shares 
                                              Practitioner and Community Energy networks) and have found the focus of these to be the key to generating 
                                              good content/engagement.
                                              <br/>
                                              <a href="#" class="small"><i class="fa fa-thumbs-up"></i> 26 Like this!</a> -
                                              <small class="text-muted">12.06.2019</small>
                                          </div>
                                      </div>
                                      <div class="social-comment">
                                          <a href="" class="float-left">
                                              <img alt="image" src="../../../../assets/cd/inspinia/img/a2.jpg">
                                          </a>
                                          <div class="media-body">
                                              <a href="#">
                                                  Bettyrose Akinyi
                                              </a>
                                              I had several similar conversations at OPEN, but consensus seemed to be that the CoTech forum is 
                                              working as it has a focus. CUK host several other ‘thematic’ forums (such as the Community Shares 
                                              Practitioner and Community Energy networks) and have found the focus of these to be the key to generating 
                                              good content/engagement.
                                              <br/>
                                              <a href="#" class="small"><i class="fa fa-thumbs-up"></i> 26 Like this!</a> -
                                              <small class="text-muted">12.06.2019</small>
                                          </div>
                                      </div>
                                  </div>
                              </div>
                          </div>

                          <div class="social-comment">
                              <a href="" class="float-left">
                                  <img alt="image" src="../../../../assets/cd/inspinia/img/a1.jpg">
                              </a>
                              <div class="media-body">
                                  <a href="#">
                                      Joan Atuhura
                                  </a>
                                  I think it is something that should be given good level of priority.
                                  <br/>
                                  <a href="#" class="small"><i class="fa fa-thumbs-up"></i> 11 Like this!</a> -
                                  <small class="text-muted">10.07.2019</small>
                              </div>
                          </div>

                          <div class="social-comment">
                              <a href="" class="float-left">
                                  <img alt="image" src="../../../../assets/cd/inspinia/img/a3.jpg">
                              </a>
                              <div class="media-body">
                                  <textarea class="form-control" placeholder="Write comment..."></textarea>
                                  <div class="btn-group-container">
                                      <div class="btn-group">
                                          <button data-toggle="tooltip" data-placement="top" title="Upload image" class="btn btn-white btn-xs"><i class="fas fa-file-image"></i></button>
                                          <button data-toggle="tooltip" data-placement="top" title="Upload audio" class="btn btn-white btn-xs"><i class="fas fa-file-audio"></i> </button>
                                          <button data-toggle="tooltip" data-placement="top" title="Upload video" class="btn btn-white btn-xs"><i class="far fa-file-video"></i> </button>
                                          <button data-toggle="tooltip" data-placement="top" title="Upload pdf" class="btn btn-white btn-xs"><i class="fas fa-file-pdf"></i> </button>
                                          <button data-toggle="tooltip" data-placement="top" title="insert link" class="btn btn-white btn-xs"><i class="fas fa-link"></i> </button>
                                      </div>
                                  </div>
                                  
                              </div>
                          </div>

                      </div>

                  </div>`;
    return ret;
  }

  renderPub() {
    const pubsContainer = this.elementRef.nativeElement.querySelector('#pubs-container') as HTMLElement;
    const newElement = document.createElement('div');
    newElement.innerHTML = this.htmlPub();
    pubsContainer.appendChild(newElement);
  }

  clearPubs() {

  }

  getAvatar(pub) {
    const avatarStr = pub.avatar;
    const avatar = JSON.parse(avatarStr);
    // http://localhost/user-resources/fe5b1a9d-df45-4fce-a181-65289c48ea00/avatar-01/a.jpg
    // return avatar.small;
    return 'http://localhost/user-resources/fe5b1a9d-df45-4fce-a181-65289c48ea00/avatar-01/a.jpg';
  }

  getPubBody(pub, level) {
    // console.log('starting getPubBody(pub)');
    let ret;
    switch (level) {
      case 'pub':
        // console.log('pub', pub.inte_ract_react_description);
        ret = pub.inte_ract_pub_description;
        break;
      case 'comment':
        // console.log('pub', pub.inte_ract_react_description);
        ret = pub.inte_ract_react_description;
        break;
    }
    return ret;
  }

  // getPubs() {
  //   return [
  //     {
  //       "inte_ract_pub_id": 11,
  //       "inte_ract_pub_guid": "DE1FC4D9-21A6-97B2-539B-2D6D0E6E8D90",
  //       "inte_ract_pub_name": "pms/schedule?project_id=3&schedule_id=12",
  //       "inte_ract_pub_description": "This is a inteRact message testing",
  //       "doc_id": 10467,
  //       "inte_ract_pub_type_id": null,
  //       "public": 0,
  //       "location": "http:localhost/xxx",
  //       "doc_from": 1010,
  //       "doc_date": "2021-01-16 15:22:49",
  //       "mobile": "895909",
  //       "gender": 1,
  //       "dateobirth": "1976-03-10 09:53:37",
  //       "fname": "Karl",
  //       "mname": "D",
  //       "lname": "Lulu",
  //       "Trusted": 1,
  //       "username": "karl",
  //       "user_id": 1010,
  //       "user_guid": "fe5b1a9d-df45-4fce-a181-65289c48ea00",
  //       "avatar": "{\"large\": \"\", \"small\": \"/assets/images/avatar-1.jpg\"}",
  //       "fullname": "Karl D Lulu",
  //       "comments": [
  //         {
  //           "inte_ract_react_id": 25,
  //           "inte_ract_react_guid": "2D2A887D-B898-B722-1BA4-F4F255BBF295",
  //           "inte_ract_react_name": "pms/schedule?project_id=3&schedule_id=12",
  //           "inte_ract_react_description": "jgfl",
  //           "inte_ract_react_type_id": 1,
  //           "inte_ract_pub_id": 11,
  //           "parent_id": -1,
  //           "doc_id": 10490,
  //           "location": "http:localhost/xxx",
  //           "doc_from": 1010,
  //           "doc_date": "2021-01-26 17:48:36",
  //           "mobile": "895909",
  //           "gender": 1,
  //           "dateobirth": "1976-03-10 09:53:37",
  //           "fname": "Karl",
  //           "mname": "D",
  //           "lname": "Lulu",
  //           "Trusted": 1,
  //           "username": "karl",
  //           "user_id": 1010,
  //           "user_guid": "fe5b1a9d-df45-4fce-a181-65289c48ea00",
  //           "avatar": "{\"large\": \"\", \"small\": \"/assets/images/avatar-1.jpg\"}",
  //           "fullname": "Karl D Lulu"
  //         },
  //         {
  //           "inte_ract_react_id": 26,
  //           "inte_ract_react_guid": "52EFDBBC-3F7F-CAF7-340D-C1442BE59900",
  //           "inte_ract_react_name": "pms/schedule?project_id=3&schedule_id=12",
  //           "inte_ract_react_description": "jgfl",
  //           "inte_ract_react_type_id": 1,
  //           "inte_ract_pub_id": 11,
  //           "parent_id": -1,
  //           "doc_id": 10492,
  //           "location": "http:localhost/xxx",
  //           "doc_from": 1010,
  //           "doc_date": "2021-01-26 17:52:08",
  //           "mobile": "895909",
  //           "gender": 1,
  //           "dateobirth": "1976-03-10 09:53:37",
  //           "fname": "Karl",
  //           "mname": "D",
  //           "lname": "Lulu",
  //           "Trusted": 1,
  //           "username": "karl",
  //           "user_id": 1010,
  //           "user_guid": "fe5b1a9d-df45-4fce-a181-65289c48ea00",
  //           "avatar": "{\"large\": \"\", \"small\": \"/assets/images/avatar-1.jpg\"}",
  //           "fullname": "Karl D Lulu"
  //         },
  //         {
  //           "inte_ract_react_id": 27,
  //           "inte_ract_react_guid": "9403F8DF-6551-63A9-4991-BA0DF7590E6F",
  //           "inte_ract_react_name": "pms/schedule?project_id=3&schedule_id=12",
  //           "inte_ract_react_description": "jgfl",
  //           "inte_ract_react_type_id": 1,
  //           "inte_ract_pub_id": 11,
  //           "parent_id": -1,
  //           "doc_id": 10494,
  //           "location": "http:localhost/xxx",
  //           "doc_from": 1010,
  //           "doc_date": "2021-01-26 17:54:08",
  //           "mobile": "895909",
  //           "gender": 1,
  //           "dateobirth": "1976-03-10 09:53:37",
  //           "fname": "Karl",
  //           "mname": "D",
  //           "lname": "Lulu",
  //           "Trusted": 1,
  //           "username": "karl",
  //           "user_id": 1010,
  //           "user_guid": "fe5b1a9d-df45-4fce-a181-65289c48ea00",
  //           "avatar": "{\"large\": \"\", \"small\": \"/assets/images/avatar-1.jpg\"}",
  //           "fullname": "Karl D Lulu"
  //         }
  //       ]
  //     },
  //     {
  //       "inte_ract_pub_id": 10,
  //       "inte_ract_pub_guid": "8739D430-B9ED-553D-66B6-0E51CBB44EED",
  //       "inte_ract_pub_name": "pms/schedule?project_id=3&schedule_id=12",
  //       "inte_ract_pub_description": "jgfl",
  //       "doc_id": 10395,
  //       "inte_ract_pub_type_id": null,
  //       "public": 0,
  //       "location": "http://localhost/xxx",
  //       "doc_from": 1010,
  //       "doc_date": "2020-12-10 21:09:37",
  //       "mobile": "895909",
  //       "gender": 1,
  //       "dateobirth": "1976-03-10 09:53:37",
  //       "fname": "Karl",
  //       "mname": "D",
  //       "lname": "Lulu",
  //       "Trusted": 1,
  //       "username": "karl",
  //       "user_id": 1010,
  //       "user_guid": "fe5b1a9d-df45-4fce-a181-65289c48ea00",
  //       "avatar": "{\"large\": \"\", \"small\": \"/assets/images/avatar-1.jpg\"}",
  //       "fullname": "Karl D Lulu",
  //       "comments": []
  //     },
  //     {
  //       "inte_ract_pub_id": 9,
  //       "inte_ract_pub_guid": "81FF1442-5F1C-AAFA-AF8B-8C0420DD9490",
  //       "inte_ract_pub_name": "pms/schedule?project_id=3&schedule_id=12",
  //       "inte_ract_pub_description": "jgfl",
  //       "doc_id": 10393,
  //       "inte_ract_pub_type_id": null,
  //       "public": 0,
  //       "location": "http://localhost/xxx",
  //       "doc_from": 1010,
  //       "doc_date": "2020-12-10 18:47:44",
  //       "mobile": "895909",
  //       "gender": 1,
  //       "dateobirth": "1976-03-10 09:53:37",
  //       "fname": "Karl",
  //       "mname": "D",
  //       "lname": "Lulu",
  //       "Trusted": 1,
  //       "username": "karl",
  //       "user_id": 1010,
  //       "user_guid": "fe5b1a9d-df45-4fce-a181-65289c48ea00",
  //       "avatar": "{\"large\": \"\", \"small\": \"/assets/images/avatar-1.jpg\"}",
  //       "fullname": "Karl D Lulu",
  //       "comments": []
  //     },
  //     {
  //       "inte_ract_pub_id": 8,
  //       "inte_ract_pub_guid": "1156A4B9-247B-4017-DD0D-30227EDAF039",
  //       "inte_ract_pub_name": null,
  //       "inte_ract_pub_description": "jgfl",
  //       "doc_id": 10391,
  //       "inte_ract_pub_type_id": null,
  //       "public": 0,
  //       "location": "http://localhost/xxx",
  //       "doc_from": 1010,
  //       "doc_date": "2020-12-09 20:30:14",
  //       "mobile": "895909",
  //       "gender": 1,
  //       "dateobirth": "1976-03-10 09:53:37",
  //       "fname": "Karl",
  //       "mname": "D",
  //       "lname": "Lulu",
  //       "Trusted": 1,
  //       "username": "karl",
  //       "user_id": 1010,
  //       "user_guid": "fe5b1a9d-df45-4fce-a181-65289c48ea00",
  //       "avatar": "{\"large\": \"\", \"small\": \"/assets/images/avatar-1.jpg\"}",
  //       "fullname": "Karl D Lulu",
  //       "comments": []
  //     },
  //     {
  //       "inte_ract_pub_id": 7,
  //       "inte_ract_pub_guid": "781CEE4B-6F3E-B1F9-B7BD-876EB59E8456",
  //       "inte_ract_pub_name": null,
  //       "inte_ract_pub_description": "jgfl",
  //       "doc_id": 10389,
  //       "inte_ract_pub_type_id": null,
  //       "public": 0,
  //       "location": "http://localhost/xxx",
  //       "doc_from": 1010,
  //       "doc_date": "2020-12-09 20:06:29",
  //       "mobile": "895909",
  //       "gender": 1,
  //       "dateobirth": "1976-03-10 09:53:37",
  //       "fname": "Karl",
  //       "mname": "D",
  //       "lname": "Lulu",
  //       "Trusted": 1,
  //       "username": "karl",
  //       "user_id": 1010,
  //       "user_guid": "fe5b1a9d-df45-4fce-a181-65289c48ea00",
  //       "avatar": "{\"large\": \"\", \"small\": \"/assets/images/avatar-1.jpg\"}",
  //       "fullname": "Karl D Lulu",
  //       "comments": []
  //     }
  //   ];
  // }

}
