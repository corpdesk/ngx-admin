import { Component, OnInit, ElementRef, AfterViewInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { CdSocialPost } from '../../../@cd/sys/comm/models/comm.model';
import { InteRactPubService } from '../../../@cd/sys/inte-ract/controllers/inte-ract-pub.service';
import { HtmlElemService } from '../../../@cd/guig/html-elem.service';
import { JsHelperService } from '../../../@cd/guig/js-helper.service';
import { CdFilter } from '../../../@cd/base/b.model';
import { UserService } from '../../../@cd/sys/user/controllers/user.service';
import { SocketIoService } from '../../../@cd/sys/cd-push/controllers/socket-io.service';
import { MyInteRactService } from './my-inte-ract.service';
import { InteRactComponent } from '../../cd-palette/inte-ract/inte-ract.component';
import { GroupMemberService } from '../../../@cd/sys/user/controllers/group-member.service';
import { GroupInvitationService } from '../../../@cd/sys/user/controllers/group-invitation.service';
import { U } from '@angular/cdk/keycodes';
import { GroupInvitation } from '../../../@cd/sys/user/models/group-invitation-model';

@Component({
    selector: 'ngx-my-inte-ract',
    templateUrl: './my-inte-ract.component.html',
    styleUrls: ['./my-inte-ract.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class MyInteRactComponent implements OnInit {
    @ViewChild(InteRactComponent) chldInteRact: InteRactComponent;
    /**
     * The filter is supplied by the 
     * consumer component depending on its design
     * and requirement
     */
    pubFilter = [];
    pubType = 'Post';
    pubScope = 'Group';
    Pubs = [];
    avatarDefault;

    cuteCols = {
        checkBox: {
            id: 'col-checkBox',
            class: 'check-mail',
            show: true,
        },
        Status: {
            id: 'col-Status',
            class: 'project-status',
            show: false,
        },
        Title: {
            id: 'col-Title',
            class: 'project-title',
            show: true,
        },
        Percentage: {
            id: 'col-Percentage',
            class: 'project-completion',
            show: false,
        },
        Avatar: {
            id: 'col-Avatar',
            class: 'project-people',
            show: true,
        },
        Action: {
            id: 'col-Actions',
            class: 'project-actions',
            show: true,
        }
    };
    cuteData = [];
    title = 'InteRact';
    breadcrumbs = ['MySpace', 'InteRact'];
    constructor(
        private elementRef: ElementRef,
        public svInteRactPub: InteRactPubService,
        public svHtml: HtmlElemService,
        private svUser: UserService,
        private svSocket: SocketIoService,
        public svMyInteRact: MyInteRactService,
        private svJsHelper: JsHelperService,
        public svGroupMember: GroupMemberService,
        private svGroupInvitation: GroupInvitationService,
    ) {

        this.avatarDefault = `${environment.USER_RESOURCES}/ooooooooo/avatar-01/a.jpg`;
        this.getConsumerUsers();

        this.svInteRactPub.getPubObsv(this.svMyInteRact.pubFilter()).subscribe((resp: any) => {
            console.log('InteRactComponent::construct/resp.data:', resp.data);
            this.Pubs = resp.data;
            let pubsTemp = this.Pubs;
            if (pubsTemp) {
                this.Pubs = pubsTemp.sort(function (a, b) {
                    return b.inte_ract_pub_id - a.inte_ract_pub_id;
                });
            }
        });
    }

    ngOnInit(): void {
        console.log('this.svSocket.listen(push-pub');
        this.svSocket.listen('push-pub').subscribe((data: any) => {
            console.log('MyInteRactComponent/Push pub received');
            console.log('data:', data);
            if (data.length > 0) {
                this.reloadPub(data[0]);
            }
        });

        this.svSocket.listen('push-react').subscribe((data: any) => {
            console.log('MyInteRactComponent/Push react received');
            console.log('data:', data);
            if (data.length > 0) {
                this.reloadReact(data[0]);
            }
        });
    }

    ngAfterViewInit() {
    }

    reloadPub(pub) {
        this.Pubs.push(pub);
        this.Pubs = this.svJsHelper.sort(this.Pubs, 'inte_ract_pub_id');
    }

    reloadReact(react) {
        const p = this.Pubs.map((p) => {
            if (p.inte_ract_pub_id == react.inte_ract_pub_id) {
                p.comments.push(react);
                p.comments = this.svJsHelper.sort(p.comments, 'inte_ract_react_id');
            }
            return p;
        });
        console.log('reloadReact(react)/p:', p);
        this.Pubs = p;
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
        console.log('starting MyInteRactComponent::getAvatar(pub)');
        const avatarStr = pub.avatar;
        const avatar = JSON.parse(avatarStr);
        return '${environment.HOST}/user-resources/fe5b1a9d-df45-4fce-a181-65289c48ea00/avatar-01/a.jpg';
    }

    getPubBody(pub, level) {
        // console.log('starting getPubBody(pub)');
        let ret;
        switch (level) {
            case 'pub':
                ret = pub.inte_ract_pub_description;
                break;
            case 'comment':
                ret = pub.inte_ract_react_description;
                break;
        }
        return ret;
    }

    getSelectedAssociation(e: any) {
        console.log('starting getSelectedAssociation(e: any)');
        console.log('e:', e);
        // switch (e.inte_ract_association_name) {
        //     case 'consumer_users':
        //         this.getConsumerUsers();
        //         break;
        //     case 'pals':
        //         this.getPals();
        //         break;
        //     case 'work_groups':
        //         this.getWorkGroups();
        //         break;
        //     case 'personal_groups':
        //         this.getPersonalGroups();
        //         break;
        // }

        if (e.group_name == 'consumer_users') {
            this.getConsumerUsers();
        }
        else if (e.group_name == 'pals') {
            this.getPals();
        }
        else if (e.group_type_id == 2) {
            this.getModuleUsers(e.group_guid);
        }
    }

    getPals() {
        console.log('starting getPals()')
        this.svGroupMember.getGetPalsObsv().subscribe((resp: any) => {
            console.log('getGetPalsObsv/resp:', resp);
            this.cuteData = resp.data.map((u: any) => {
                return this.cData(u);
            });
        });

    }

    getConsumerUsers() {
        console.log('starting getConsumerUsers()')
        this.svUser.getConsumerUsersObsv().subscribe((resp: any) => {
            console.log('getConsumerUsersObsv/resp:', resp);
            this.cuteData = resp.data.map((u: any) => {
                return this.cData(u);
            });
        });
        console.log('this.cuteData:', this.cuteData);
    }

    getUserName(username: string) {
        if (username) {
            if (username.length > 6) {
                return username.substring(0, 5) + '...';
            } else {
                return username;
            }
        } else {
            return 'null';
        }
    }

    getModuleUsers(groupGuidParent) {
        this.svUser.getGroupUsersObsv(groupGuidParent).subscribe((resp: any) => {
            console.log('getConsumerUsersObsv/resp:', resp);
            this.cuteData = resp.data.map((u: any) => {
                return this.cData(u);
            });
        });
    }

    cData(u) {
        const src = this.svUser.getAvatar(u);
        const uName = this.getUserName(u.username);
        console.log('src:', src);

        const ret = {
            checkBox: {
                id: u.user_id + '-checkBox',
                data: { val: false, inputClass: 'i-checks' }
            },
            Status: {
                id: u.user_id + '-Status',
                data: { status: 'Active' }
            },
            Title: {
                id: u.user_id + '-Title',
                data: { title: uName, date: u.doc_date }
            },
            Percentage: {
                id: u.user_id + '-Percentage',
                data: { percnt: '8' }
            },
            Avatar: {
                id: u.user_id + '-Avatar',
                data: [{ location: src }]
            },
            Action: {
                id: u.user_id + '-Action',
                data: [{ action: 'View' }]
            }
        }
        return ret;
    }

    getWorkGroups() {
    }

    getPersonalGroups() {
    }

}
