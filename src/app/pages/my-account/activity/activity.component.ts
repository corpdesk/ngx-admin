import { Component, OnInit, AfterViewInit, ViewEncapsulation, ElementRef } from '@angular/core';
import { ServerService } from '../../../@cd/sys/moduleman/controllers/server.service';
import { SessService } from '../../../@cd/sys/user/controllers/sess.service';
import { HtmlElemService } from '../../../@cd/guig/html-elem.service';
import { UserService } from '../../../@cd/sys/user/controllers/user.service';
import { User } from '../../../@cd/sys/user/models/user-model';
import { CdRequest } from '../../../@cd/base/cd-envelop';
import { NotificationService } from '../../../@cd/sys/comm/controllers/notification.service';
import { array } from '@amcharts/amcharts4/core';

// interface User {
//   user_id: number;
//   username: string;
//   avatar: string;
// }

interface ActivityItem {
  class?: string;
  action?: ActionItem[];
  active?: boolean;
  attachment_guid?: string;
  attended?: null
  badge?: string;
  company_id?: number;
  disposed?: boolean;
  docDate?: string;
  doc_date?: string;
  doc_from?: number;
  doc_guid?: string;
  doc_id?: number;
  doc_to?: number;
  doc_to_gid?: number;
  doc_type?: number;
  doctyp_id?: number;
  expire_date?: number;
  message?: string;
  msg?: string;
  notification_guid?: string;
  notification_id?: number;
  notification_type_id?: number;
  seen?: boolean;
  snoozed?: boolean;
  starred?: boolean;
  subject?: string;
  target_user?: object;
  user_id?: number;
  users?: User[];
  usersLabel?: string;
}

// interface ActionObject {
//   m: string;
//   c: string;
//   a: string;
// }

interface ActionItem {
  icon: string;
  label: string;
  name: string;
  actionID: string;
  actionO: CdRequest;
}

@Component({
  selector: 'ngx-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ActivityComponent implements OnInit, AfterViewInit {
  // postData;
  notifications;
  activityLog: ActivityItem[]=[];
  // activityLog: ActivityItem[] = [
  //   {
  //     class: 'stream',
  //     badge: 'fa fa-user-friends',
  //     users: [
  //       {
  //         user_id: 1010,
  //         avatar: '../../../../assets/cd/inspinia/img/a5.jpg',
  //         username: 'Frankline Musumi'
  //       }
  //     ],
  //     usersLabel: 'Frankline Musumi',
  //     docDate: 'Today at 01:32:40 am',
  //     msg: 'You have Pal request from <a href="#">Frankline Musumi</a>.<br>',
  //     action: [
  //       {
  //         icon: 'fa fa-thumbs-up',
  //         label: 'accept',
  //         name: 'acceptInvitation',
  //         actionID: 'a-00',
  //         actionO: {
  //           ctx: "Sys",
  //           m: "User",
  //           c: "GroupInvitationController",
  //           a: "actionAccept",
  //           dat: {
  //             f_vals: [
  //               {
  //                 data: {
  //                   group_invitation_guid: "9C5BF8C8-9575-35AB-FC40-6B8D89339996"
  //                 }
  //               }
  //             ],
  //             token: null
  //           },
  //           args: null
  //         }
  //       }
  //     ]
  //   },
  //   {
  //     class: 'stream',
  //     badge: 'fa fa-edit',
  //     users: [
  //       {
  //         user_id: 1010,
  //         avatar: '../../../../assets/cd/inspinia/img/a5.jpg',
  //         username: 'Frankline Musumi'
  //       }
  //     ],
  //     usersLabel: 'Frankline Musumi',
  //     docDate: 'Today at 01:32:40 am',
  //     msg: 'Add new note to the <a href="#">Martex</a>  project.',
  //     action: [
  //       {
  //         icon: 'fa fa-thumbs-up',
  //         label: 'Like this!',
  //         name: 'likePub',
  //         actionID: 'a-01',
  //         actionO: {
  //           ctx: "Sys",
  //           m: "User",
  //           c: "GroupInvitationController",
  //           a: "actionAccept",
  //           dat: {
  //             f_vals: [
  //               {
  //                 data: {
  //                   group_invitation_guid: "9C5BF8C8-9575-35AB-FC40-6B8D89339996"
  //                 }
  //               }
  //             ],
  //             token: null
  //           },
  //           args: null
  //         }
  //       },
  //       {
  //         icon: 'fa fa-comments',
  //         label: 'Comment',
  //         name: 'commentPub',
  //         actionID: 'a-02',
  //         actionO: {
  //           ctx: "Sys",
  //           m: "User",
  //           c: "GroupInvitationController",
  //           a: "actionAccept",
  //           dat: {
  //             f_vals: [
  //               {
  //                 data: {
  //                   group_invitation_guid: "9C5BF8C8-9575-35AB-FC40-6B8D89339996"
  //                 }
  //               }
  //             ],
  //             token: null
  //           },
  //           args: null
  //         }
  //       },
  //       {
  //         icon: 'fa fa-share',
  //         label: 'Share',
  //         name: 'sharePub',
  //         actionID: 'a-03',
  //         actionO: {
  //           ctx: "Sys",
  //           m: "User",
  //           c: "GroupInvitationController",
  //           a: "actionAccept",
  //           dat: {
  //             f_vals: [
  //               {
  //                 data: {
  //                   group_invitation_guid: "9C5BF8C8-9575-35AB-FC40-6B8D89339996"
  //                 }
  //               }
  //             ],
  //             token: null
  //           },
  //           args: null
  //         }
  //       }
  //     ]
  //   },
  //   {
  //     class: 'stream',
  //     badge: 'fa fa-comment',
  //     users: [
  //       {
  //         user_id: 1010,
  //         avatar: '../../../../assets/cd/inspinia/img/a4.jpg',
  //         username: 'George Ombado'
  //       }
  //     ],
  //     usersLabel: 'George Ombado',
  //     docDate: 'Yesterday at 10:00:20 am',
  //     msg: 'Commented on <a href="#">Ariana</a> profile.',
  //     action: null
  //   },
  //   {
  //     class: 'stream',
  //     badge: 'fa fa-circle',
  //     users: [
  //       {
  //         user_id: 1010,
  //         avatar: '../../../../assets/cd/inspinia/img/a2.jpg',
  //         username: 'George Ombado'
  //       },
  //       {
  //         user_id: 1010,
  //         avatar: '../../../../assets/cd/inspinia/img/a3.jpg',
  //         username: 'Joan Atuhura'
  //       },
  //       {
  //         user_id: 1010,
  //         avatar: '../../../../assets/cd/inspinia/img/a4.jpg',
  //         username: 'Grace Watsiera'
  //       }
  //     ],
  //     usersLabel: 'Bettyrose Akinyi, Maureen Njoroge and George Ombado',
  //     docDate: 'Yesterday at 02:13:20 am',
  //     msg: 'Changed status of third stage in the <a href="#">Vertex</a> project.',
  //     action: null
  //   }
  // ];
  constructor(
    private el: ElementRef,
    private svServer: ServerService,
    private svSess: SessService,
    public svUser: UserService,
    private svElem: HtmlElemService,
    private svNotif: NotificationService,
  ) {

  }

  ngOnInit(): void {
    
  }

  ngAfterViewInit() {
    this.getNotifications();
  }

  getNotifications(){
    
    this.svNotif.getByUserObsv(this.svUser).subscribe((resp: any) => {
      console.log(JSON.stringify(resp.data));
      this.notifications = resp.data.map((n) => {
        // target_user is in string form. change to json
        n.target_user = JSON.parse(n.target_user);
        // create 'users' array from 'target_user'
        n.users = [];
        n.users.push(n.target_user);
        n.usersLabel = n.target_user.fullname;
        n.docDate = n.doc_date;
        n.msg = n.message;
        n.action = JSON.parse(n.actions);
        n.action = n.action;
        n.class = 'stream';
        return n;
      });

      this.activityLog = [];
      this.notifications.forEach((n) => {
        this.activityLog.push(n);
      });

      console.log('this.activityLog:', this.activityLog);
      this.renderLogs(); 

    });
  }

  public renderLogs() {
    // if (this.tD) {
    //   this.el.nativeElement.classList.add(this.tD.class);
    //   const htmlContent = this.content(this.tD.class, this.tD.data);
    //   this.svElem.appendHtml(this.el, '#' + this.tD.id, htmlContent);
    // }
    document.getElementById('logsContainer').innerHTML = "";
    this.activityLog.forEach((al, i) => {
      let htmlContent = this.logsItemHtml(al);
      console.log('i:', i);
      this.svElem.appendHtml(this.el, '#logsContainer', htmlContent);
    });

    this.btnListen();
  }

  logsItemHtml(activity: ActivityItem) {
    return `<div class="stream">
              <div class="stream-badge">
                  <i class="${activity.badge}"></i>
              </div>
              <!-- start stream-panel -->
              <div class="stream-panel">
              ${this.streamPanel(activity)}
              </div>
              <!-- end stream-panel -->
          </div> `;
  }

  setUserLabels(users: User[]) {
    let userLabel = users.map((u) => {
      return u.username;
    });
    return userLabel.slice(0, -1) + '.';
  }

  setAvatars(users: User[]) {
    let avatars = users.map((u) => {
      return `<img src="${u.avatar}" />`;
    }).join('');
    return avatars;
  }

  streamPanel(activity: ActivityItem) {
    return `<div class="stream-info">
                <a href="#">
                      ${this.setAvatars(activity.users)}
                    <span>${this.setUserLabels(activity.users)}</span>
                    <span class="date">${activity.docDate}</span>
                </a>
            </div>
            <!-- activity message -->
            ${activity.msg}<br>
            ${this.setAction(activity.action)}`;
  }

  setAction(action: ActionItem[]) {
    if (action) {
      let actionButtons = action.map((a) => {
        return `<button id="${a.actionID}"  class="btn btn-white btn-xs"><i class="${a.icon}"></i> ${a.label}</button>`;
      }).join('');
      return `<div class="btn-group">
                ${actionButtons}
              </div>`;
    } else {
      return '';
    }

  }

  btnAction(a: ActionItem) {
    console.log('ActionItem:', a);
    let env;
    // if (a.name == 'acceptInvitation' || 'actionRemoveNotif') {
      env = a.actionO;
      env = this.setToken(env);
      console.log('env:', env);
      this.svServer.proc(env)
        .subscribe((res) => {
          console.log('ActivityComponent::btnAction()/subscribe/res>>');
          console.log(res);
          this.getNotifications();
        });
    //}

  }

  btnListen() {
    this.activityLog.forEach((al) => {
      if (al.action) {
        console.log('al.action:', al.action);
        al.action.forEach((a: ActionItem) => {
          let btn = document.getElementById(a.actionID);
          if (btn) {
            btn.addEventListener('click', (e: Event) => this.btnAction(a));
          }
        });
      }
    });
  }

  setEnvData() {

  }

  setToken(env: any) {
    env.dat.token = this.svSess.getCdToken();
    return env;
  }

}
