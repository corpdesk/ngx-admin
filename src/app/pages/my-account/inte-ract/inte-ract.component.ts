import { Component, OnInit, ElementRef } from '@angular/core';
import { CdSocialPost } from '../../../@cd/sys/comm/models/comm.model';
import { InteRactPubService } from '../../../@cd/sys/inte-ract/controllers/inte-ract-pub.service';


@Component({
  selector: 'ngx-inte-ract',
  templateUrl: './inte-ract.component.html',
  styleUrls: ['./inte-ract.component.scss']
})
export class InteRactComponent implements OnInit {
  // Pubs;
  constructor(
    private elementRef: ElementRef,
    public svInteRactPub:InteRactPubService,
    ) {
    this.svInteRactPub.Pubs = this.getPubs();
  }

  ngOnInit(): void {
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
    // pubsContainer.insertAdjacentHTML('beforeend', this.htmlPub());

    const newElement = document.createElement('div');
    newElement.innerHTML = this.htmlPub();
    pubsContainer.appendChild(newElement);
  }

  // renderPubs() {
  //   console.log('starting setGanttEvents()');
  //   this.clearPubs();
  //   const cdGanttEvents = this.elementRef.nativeElement.querySelector('#cdGanttEvents') as HTMLElement;
  //   let htmlHeader = '';
  //   this.svSchedule.schedule.forEach((task) => {
  //     const left = (Number(task.divGanttEvent.startDay) + 1) * this.cellWidthUnit;
  //     console.log('left:', left);
  //     console.log('task.divGanttEvent.startDay:', task.divGanttEvent.startDay);
  //     const width = Number(task.taskGanttEventBlock.noOfDays) * this.cellWidthUnit;
  //     console.log('task.taskGanttEventBlock.noOfDays:', task.taskGanttEventBlock.noOfDays);
  //     const taskName = this.getTaskName(task, width);
  //     const taskIcon = this.getTaskIcon(task);
  //     const taskLink = this.getTaskLink(task);
  //     const taskCost = this.getTaskCost(task);
  //     const taskDesc = this.taskDesc(task);
  //     htmlHeader += `<div id="${task.taskGanttEventRow.id}" class="gantt-event-row" style="height: ${this.taskUnitHeight}px;">
  //       <div id="${task.divGanttEvent.id}" ngxCdTooltip [tooltipTitle]="displayToolTip(${task})" placement="left" delay="500"
  //         class="gantt-event" style="left: ${left}px;">
  //         <a 
  //           id="${task.taskGanttEventBlock.id}" 
  //           class="gantt-event-block tourFly"
  //           style="width: ${width}px; line-height: 10px;" 
  //           ${taskLink}
  //           target="_blank">${taskName}</a>
  //         <div class="gantt-event-icon">
  //           ${taskIcon}
  //         </div>
  //         <div class="gantt-event-price">${taskCost}</div>
  //         <div class="gantt-event-desc">${taskDesc}</div>
  //       </div>
  //     </div>`;
  //   });
  //   cdGanttEvents.style.width = `${this.totalCellsWidth}px`;
  //   cdGanttEvents.insertAdjacentHTML('afterbegin', htmlHeader);

  //   this.svSchedule.schedule.forEach((task) => {
  //     this.elementRef.nativeElement.querySelector(`#${task.taskGanttEventBlock.id}`)
  //       .addEventListener('click', this.taskOnClick.bind(this));
  //   });

  // }

  clearPubs() {

  }

  getAvatar(pub) {
    const avatarStr = pub.avatar;
    const avatar = JSON.parse(avatarStr);
    return avatar.small;

  }

  getPubBody(pub) {
    return pub.inte_ract_pub_description;
  }

  addPub() {
    const newPub = {
      "inte_ract_pub_id": 12,
      "inte_ract_pub_guid": "8739D430-B9ED-553D-66B6-0E51CBB44EED",
      "inte_ract_pub_name": "pms/schedule?project_id=3&schedule_id=12",
      "inte_ract_pub_description": "guyhw",
      "doc_id": 10396,
      "inte_ract_pub_type_id": null,
      "public": 0,
      "location": "http://localhost/xxx",
      "doc_from": 1010,
      "doc_date": "2020-12-10 21:09:37",
      "mobile": "895909",
      "gender": 1,
      "dateobirth": "1976-03-10 09:53:37",
      "fname": "Karl",
      "mname": "D",
      "lname": "Lulu",
      "Trusted": 1,
      "username": "karl",
      "user_id": 1010,
      "fullname": "Karl D Lulu X",
      "avatar": "{\"large\": \"\", \"small\": \"/assets/images/avatar-1.jpg\"}",
      "comments": []
    };
    this.svInteRactPub.Pubs.push(newPub);
  }

  getPubs() {
    return [
      {
        "inte_ract_pub_id": 7,
        "inte_ract_pub_guid": "781CEE4B-6F3E-B1F9-B7BD-876EB59E8456",
        "inte_ract_pub_name": null,
        "inte_ract_pub_description": "<p>I’ve been having various discussion with stakeholders at different levels over the last number of months; techies, CEOs, operational people - all sorts. I think we’re missing a single ‘goto’ place for discussions, and maybe this is the place. Any thoughts on whether we should just be encouraging anyone related to co-ops to sign up here, or creating a new forum with Cotech as a category within it?<p>",
        "doc_id": 10389,
        "inte_ract_pub_type_id": null,
        "public": 0,
        "location": null,
        "doc_from": 1010,
        "doc_date": "2020-12-09 20:06:29",
        "mobile": "895909",
        "gender": 1,
        "dateobirth": "1976-03-10 09:53:37",
        "fname": "Karl",
        "mname": "D",
        "lname": "Lulu",
        "Trusted": 1,
        "username": "karl",
        "user_id": 1010,
        "fullname": "Karl D Lulu",
        "avatar": "{\"large\": \"\", \"small\": \"/assets/images/avatar-1.jpg\"}",
        "comments": [
          {
            "inte_ract_react_id": 6,
            "inte_ract_react_guid": "81832EC8-09C6-1620-A208-FD4C937781E2",
            "inte_ract_react_name": "pms/schedule?project_id=3&schedule_id=12",
            "inte_ract_react_description": "<p>I had several similar conversations at OPEN, but consensus seemed to be that the CoTech forum is working as it has a focus. CUK host several other ‘thematic’ forums (such as the Community Shares Practitioner and Community Energy networks) and have found the focus of these to be the key to generating good content/engagement.</p>",
            "inte_ract_react_type_id": 1,
            "inte_ract_pub_id": 7,
            "parent_id": null,
            "doc_id": 10401,
            "location": "",
            "doc_from": 1010,
            "doc_date": "2020-12-10 21:39:31",
            "mobile": "895909",
            "gender": 1,
            "dateobirth": "1976-03-10 09:53:37",
            "fname": "Karl",
            "mname": "D",
            "lname": "Lulu",
            "Trusted": 1,
            "username": "karl",
            "user_id": 1010,
            "avatar": "{\"large\": \"\", \"small\": \"../../../../assets/cd/inspinia/img/a1.jpg\"}",
            "fullname": "Karl D Lulu",
            "replies": []
          },
          {
            "inte_ract_react_id": 7,
            "inte_ract_react_guid": "81832EC8-09C6-1620-A208-FD4C937781E3",
            "inte_ract_react_name": "pms/schedule?project_id=3&schedule_id=12",
            "inte_ract_react_description": "<p>I had several similar conversations at OPEN, but consensus seemed to be that the CoTech forum is working as it has a focus. CUK host several other ‘thematic’ forums (such as the Community Shares Practitioner and Community Energy networks) and have found the focus of these to be the key to generating good content/engagement.</p>",
            "inte_ract_react_type_id": 1,
            "inte_ract_pub_id": 7,
            "parent_id": null,
            "doc_id": 10401,
            "location": "",
            "doc_from": 1010,
            "doc_date": "2020-12-10 21:50:31",
            "mobile": "895909",
            "gender": 1,
            "dateobirth": "1976-03-10 09:53:37",
            "fname": "Karl",
            "mname": "D",
            "lname": "Lulu",
            "Trusted": 1,
            "username": "karl",
            "user_id": 1010,
            "avatar": "{\"large\": \"\", \"small\": \"../../../../assets/cd/inspinia/img/a1.jpg\"}",
            "fullname": "Karl D Lulu",
            "replies": []
          }
        ]
      },
      {
        "inte_ract_pub_id": 8,
        "inte_ract_pub_guid": "1156A4B9-247B-4017-DD0D-30227EDAF039",
        "inte_ract_pub_name": null,
        "inte_ract_pub_description": "<p>There is need to develop curriculum that builds capacity for SACCO managers on Open Membership versus Closed Membership. There are many variations of structure within the cooperative business model. One important structural issues is the choice of organizing a cooperative as a open membership or closed membership cooperative. Open membership and closed membership cooperative have different structures for admitting potential members. They also have very different structures of obtaining and managing equity and vary in terms of the member’s commitment to use the cooperative and the basis for pricing.</p><p>Most traditional input supply and commodity marketing cooperatives are organized under the open membership model. Under this structure the member can join at any time by purchasing a share of membership stock, often a nominal fee.</p> ",
        "doc_id": 10391,
        "inte_ract_pub_type_id": null,
        "public": 0,
        "location": "../../../../assets/cd/inspinia/img/gallery/11.jpg",
        "doc_from": 1010,
        "doc_date": "2020-12-09 20:30:14",
        "mobile": "895909",
        "gender": 1,
        "dateobirth": "1976-03-10 09:53:37",
        "fname": "Karl",
        "mname": "D",
        "lname": "Lulu",
        "Trusted": 1,
        "username": "karl",
        "user_id": 1010,
        "fullname": "Karl D Lulu",
        "avatar": "{\"large\": \"\", \"small\": \"/assets/images/avatar-1.jpg\"}",
        "comments": []
      },
      {
        "inte_ract_pub_id": 9,
        "inte_ract_pub_guid": "81FF1442-5F1C-AAFA-AF8B-8C0420DD9490",
        "inte_ract_pub_name": "pms/schedule?project_id=3&schedule_id=12",
        "inte_ract_pub_description": "<p>The open membership structure can be a disadvantage for a start up cooperative that is trying to raise sufficient risk capital to fund the initial infrastructure. Open membership cooperatives typically have low threshold for membership investment. Additionally, since there is no penalty for joining at a later date and no possibility of equity appreciation potential members have an incentive to delay membership until the cooperative has proven successful. In the open membership cooperative model a member’s investment is often not proportional to their use of the cooperative.</p>",
        "doc_id": 10393,
        "inte_ract_pub_type_id": null,
        "public": 0,
        "location": "http://localhost/xxx",
        "doc_from": 1010,
        "doc_date": "2020-12-10 18:47:44",
        "mobile": "895909",
        "gender": 1,
        "dateobirth": "1976-03-10 09:53:37",
        "fname": "Karl",
        "mname": "D",
        "lname": "Lulu",
        "Trusted": 1,
        "username": "karl",
        "user_id": 1010,
        "fullname": "Karl D Lulu",
        "avatar": "{\"large\": \"\", \"small\": \"/assets/images/avatar-1.jpg\"}",
        "comments": []
      },
      {
        "inte_ract_pub_id": 10,
        "inte_ract_pub_guid": "8739D430-B9ED-553D-66B6-0E51CBB44EED",
        "inte_ract_pub_name": "pms/schedule?project_id=3&schedule_id=12",
        "inte_ract_pub_description": "jgfl",
        "doc_id": 10395,
        "inte_ract_pub_type_id": null,
        "public": 0,
        "location": "http://localhost/xxx",
        "doc_from": 1010,
        "doc_date": "2020-12-10 21:09:37",
        "mobile": "895909",
        "gender": 1,
        "dateobirth": "1976-03-10 09:53:37",
        "fname": "Karl",
        "mname": "D",
        "lname": "Lulu",
        "Trusted": 1,
        "username": "karl",
        "user_id": 1010,
        "fullname": "Karl D Lulu",
        "avatar": "{\"large\": \"\", \"small\": \"/assets/images/avatar-1.jpg\"}",
        "comments": []
      }
    ];
  }

}
