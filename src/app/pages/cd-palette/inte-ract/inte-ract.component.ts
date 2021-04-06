import { Component, OnInit, Input, ElementRef, AfterViewInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { CdSocialPost } from '../../../@cd/sys/comm/models/comm.model';
import { environment } from '../../../../environments/environment';
import { GroupMemberService } from '../../../@cd/sys/user/controllers/group-member.service';
import { InteRactPubService } from '../../../@cd/sys/inte-ract/controllers/inte-ract-pub.service';
import { InteRactPubComponent } from '../inte-ract-pub/inte-ract-pub.component';
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
    /**
     * The filter is for setting up the
     * inte-ract_pub.component input
     */
    @Input() pubFilter = [];
    /**
     * Pubs is filled via the consumer component
     * for populatng content based on the 
     * module that generated it
     */
    @Input() Pubs = [];

    /**
     * Pub contenct is saved with
     * the context pubCtx.
     * This is used for filtering based
     * on where it was created. Eg Pals, or pms or project specific.
     * Can be defined by a module developer
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

    pubType = 'Post';
    pubScope = 'Group';
    cuidAvatar;
    @ViewChild(InteRactPubComponent) chldInteRactPub:InteRactPubComponent;
    constructor(
        private elementRef: ElementRef,
        public svInteRactPub: InteRactPubService,
        public svHtml: HtmlElemService,
        private svUser: UserService,
        private svGroupMember: GroupMemberService,
    ) {

    }

    ngOnInit(): void {
        this.initData();
    }

    initData() {
        console.log('starting InteRactComponent::initData()');
        // this.svInteRactPub.getPubObsv(this.pubFilter).subscribe((resp: any) => {
        //     this.Pubs = resp.data;
        // });
    }

    ngAfterViewInit() {
    }

    // ngOnChanges() {
    //     // console.log(this.Pubs);
    // }

    // htmlPub() {
    //     const ret = `<div class="social-feed-box">

    //                   <div class="float-right social-action dropdown">
    //                       <button data-toggle="dropdown" class="dropdown-toggle btn-white">
    //                       </button>
    //                       <ul class="dropdown-menu m-t-xs">
    //                           <li><a href="#">Config</a></li>
    //                       </ul>
    //                   </div>
    //                   <div class="social-avatar">
    //                       <a href="" class="float-left">
    //                           <img alt="image" src="../../../../assets/cd/inspinia/img/a1.jpg">
    //                       </a>
    //                       <div class="media-body">
    //                           <a href="#">
    //                               Joan Atuhura
    //                           </a>
    //                           <small class="text-muted">Today 4:21 pm - 12.06.2019</small>
    //                       </div>
    //                   </div>
    //                   <div class="social-body">
    //                       <p>
    //                           I’ve been having various discussion with stakeholders at different levels 
    //                           over the last number of months; techies, CEOs, operational people - all sorts. 
    //                           I think we’re missing a single ‘goto’ place for discussions, and maybe this is the place. 
    //                           Any thoughts on whether we should just be encouraging anyone related to co-ops to sign up here, 
    //                           or creating a new forum with Cotech as a category within it?
    //                       </p>

    //                       <div class="btn-group">
    //                           <button class="btn btn-white btn-xs"><i class="fa fa-thumbs-up"></i> Like this!</button>
    //                           <button class="btn btn-white btn-xs"><i class="fa fa-comments"></i> Comment</button>
    //                           <button class="btn btn-white btn-xs"><i class="fa fa-share"></i> Share</button>
    //                       </div>
    //                   </div>
    //                   <div class="social-footer">
    //                       <div class="social-comment">
    //                           <a href="" class="float-left">
    //                               <img alt="image" src="../../../../assets/cd/inspinia/img/a2.jpg">
    //                           </a>
    //                           <div class="media-body">
    //                               <a href="#">
    //                                   Bettyrose Akinyi
    //                               </a>
    //                               I had several similar conversations at OPEN, but consensus seemed to be that the CoTech forum is 
    //                               working as it has a focus. CUK host several other ‘thematic’ forums (such as the Community Shares 
    //                               Practitioner and Community Energy networks) and have found the focus of these to be the key to generating 
    //                               good content/engagement.
    //                               <br/>
    //                               <a href="#" class="small"><i class="fa fa-thumbs-up"></i> 26 Like this!</a> -
    //                               <small class="text-muted">12.06.2019</small>

    //                               <div class="comment-reply">
    //                                   <div class="social-comment">
    //                                       <a href="" class="float-left">
    //                                           <img alt="image" src="../../../../assets/cd/inspinia/img/a2.jpg">
    //                                       </a>
    //                                       <div class="media-body">
    //                                           <a href="#">
    //                                               Bettyrose Akinyi
    //                                           </a>
    //                                           I had several similar conversations at OPEN, but consensus seemed to be that the CoTech forum is 
    //                                           working as it has a focus. CUK host several other ‘thematic’ forums (such as the Community Shares 
    //                                           Practitioner and Community Energy networks) and have found the focus of these to be the key to generating 
    //                                           good content/engagement.
    //                                           <br/>
    //                                           <a href="#" class="small"><i class="fa fa-thumbs-up"></i> 26 Like this!</a> -
    //                                           <small class="text-muted">12.06.2019</small>
    //                                       </div>
    //                                   </div>
    //                                   <div class="social-comment">
    //                                       <a href="" class="float-left">
    //                                           <img alt="image" src="../../../../assets/cd/inspinia/img/a2.jpg">
    //                                       </a>
    //                                       <div class="media-body">
    //                                           <a href="#">
    //                                               Bettyrose Akinyi
    //                                           </a>
    //                                           I had several similar conversations at OPEN, but consensus seemed to be that the CoTech forum is 
    //                                           working as it has a focus. CUK host several other ‘thematic’ forums (such as the Community Shares 
    //                                           Practitioner and Community Energy networks) and have found the focus of these to be the key to generating 
    //                                           good content/engagement.
    //                                           <br/>
    //                                           <a href="#" class="small"><i class="fa fa-thumbs-up"></i> 26 Like this!</a> -
    //                                           <small class="text-muted">12.06.2019</small>
    //                                       </div>
    //                                   </div>
    //                               </div>
    //                           </div>
    //                       </div>

    //                       <div class="social-comment">
    //                           <a href="" class="float-left">
    //                               <img alt="image" src="../../../../assets/cd/inspinia/img/a1.jpg">
    //                           </a>
    //                           <div class="media-body">
    //                               <a href="#">
    //                                   Joan Atuhura
    //                               </a>
    //                               I think it is something that should be given good level of priority.
    //                               <br/>
    //                               <a href="#" class="small"><i class="fa fa-thumbs-up"></i> 11 Like this!</a> -
    //                               <small class="text-muted">10.07.2019</small>
    //                           </div>
    //                       </div>

    //                       <div class="social-comment">
    //                           <a href="" class="float-left">
    //                               <img alt="image" src="../../../../assets/cd/inspinia/img/a3.jpg">
    //                           </a>
    //                           <div class="media-body">
    //                               <textarea class="form-control" placeholder="Write comment..."></textarea>
    //                               <div class="btn-group-container">
    //                                   <div class="btn-group">
    //                                       <button data-toggle="tooltip" data-placement="top" title="Upload image" class="btn btn-white btn-xs"><i class="fas fa-file-image"></i></button>
    //                                       <button data-toggle="tooltip" data-placement="top" title="Upload audio" class="btn btn-white btn-xs"><i class="fas fa-file-audio"></i> </button>
    //                                       <button data-toggle="tooltip" data-placement="top" title="Upload video" class="btn btn-white btn-xs"><i class="far fa-file-video"></i> </button>
    //                                       <button data-toggle="tooltip" data-placement="top" title="Upload pdf" class="btn btn-white btn-xs"><i class="fas fa-file-pdf"></i> </button>
    //                                       <button data-toggle="tooltip" data-placement="top" title="insert link" class="btn btn-white btn-xs"><i class="fas fa-link"></i> </button>
    //                                   </div>
    //                               </div>

    //                           </div>
    //                       </div>

    //                   </div>

    //               </div>`;
    //     return ret;
    // }

    htmlPub(pub) {
        const avatar = this.getAvatar(pub);
        const ret = `<!--  start pub -->
        <div class="social-feed-box">
        
            <div class="float-right social-action dropdown">
                <button data-toggle="dropdown" class="dropdown-toggle btn-white">
                </button>
                <ul class="dropdown-menu m-t-xs">
                    <li><a href="#">Config</a></li>
                </ul>
            </div>
            <div class="social-avatar">
                <a href="" class="float-left">
                    <img alt="image" src="${avatar}">
                </a>
                <div class="media-body">
                    <a href="#">
                        ${pub.fullname}
                    </a>
                    <small class="text-muted">${pub.doc_date}</small>
                </div>
            </div>
            <div class="social-body">
            ${pub.inte_ract_pub_description}
                <br>
                <div class="btn-group">
                    <button class="btn btn-white btn-xs"><i class="fa fa-thumbs-up"></i> Like this!</button>
                    <button class="btn btn-white btn-xs"><i class="fa fa-comments"></i> Comment</button>
                    <button class="btn btn-white btn-xs"><i class="fa fa-share"></i> Share</button>
                </div>
            </div>
            ${this.htmlReactions(pub.comments)}
        
        </div>
        <!--  end pub -->
        `;
        return ret;
    }

    htmlReactions(reactions) {
        const ret = `<!--  start reactions -->
        <div class="social-footer">
            <!-- start react -->
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
                    <br />
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
                                <br />
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
                                <br />
                                <a href="#" class="small"><i class="fa fa-thumbs-up"></i> 26 Like this!</a> -
                                <small class="text-muted">12.06.2019</small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- start react -->
            
    
        </div>
        <!--  end reactions -->`;
        if (reactions.length > 0) {
            return ret;
        } else {
            return '';
        }
    }

    renderPub(pub) {
        console.log('renderPub()');
        console.log('pub:', pub);
        // const pubsContainer = this.elementRef.nativeElement.querySelector('#pubs-container') as HTMLElement;
        // pubsContainer.insertAdjacentHTML('afterbegin', this.htmlPub());
        this.svHtml.appendHtml(this.elementRef, '#pubs-container', this.htmlPub(pub))
    }

    clearPubs() {

    }

    getAvatar(pub) {
        // console.log('starting InteRactComponent::getAvatar(pub)');
        // console.log('InteRactComponent::getAvatar(pub)/pub:', pub);
        return `${environment.HOST}/user-resources/${pub.user_guid}/avatar-01/a.jpg`;
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

    setUshRecepients(pushRecepients){
        this.pushRecepients = pushRecepients;
        this.chldInteRactPub.pushRecepients = pushRecepients;
    }

}
