import { Component, OnInit, AfterViewInit, ViewEncapsulation, ElementRef } from '@angular/core';
import { SessService } from '../../../@cd/sys/user/controllers/sess.service';
import { HtmlElemService } from '../../../@cd/guig/html-elem.service';
import { User } from '../../../@cd/sys/user/models/user-model';
import { CdRequest } from '../../../@cd/base/cd-envelop';

// interface User {
//   user_id: number;
//   username: string;
//   avatar: string;
// }

interface ActivityItem {
  class: string;
  badge: string;
  users: User[];
  usersLabel: string;
  docDate: string;
  msg: string;
  action: ActionItem[];
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
  activityLog: ActivityItem[] = [
    {
      class: 'stream',
      badge: 'fa fa-user-friends',
      users: [
        {
          user_id: 1010,
          avatar: '../../../../assets/cd/inspinia/img/a5.jpg',
          username: 'Frankline Musumi'
        }
      ],
      usersLabel: 'Frankline Musumi',
      docDate: 'Today at 01:32:40 am',
      msg: 'You have Pal request from <a href="#">Frankline Musumi</a>.<br>',
      action: [
        {
          icon: 'fa fa-thumbs-up',
          label: 'accept',
          name: 'acceptInvitation',
          actionID: 'a-00',
          actionO: {
            ctx: "Sys",
            m: "User",
            c: "GroupInvitationController",
            a: "actionAccept",
            dat: {
              f_vals: [
                {
                  data: {
                    group_invitation_guid: "9C5BF8C8-9575-35AB-FC40-6B8D89339996"
                  }
                }
              ],
              token: null
            },
            args: null
          }
        }
      ]
    },
    {
      class: 'stream',
      badge: 'fa fa-edit',
      users: [
        {
          user_id: 1010,
          avatar: '../../../../assets/cd/inspinia/img/a5.jpg',
          username: 'Frankline Musumi'
        }
      ],
      usersLabel: 'Frankline Musumi',
      docDate: 'Today at 01:32:40 am',
      msg: 'Add new note to the <a href="#">Martex</a>  project.',
      action: [
        {
          icon: 'fa fa-thumbs-up',
          label: 'Like this!',
          name: 'likePub',
          actionID: 'a-01',
          actionO: {
            ctx: "Sys",
            m: "User",
            c: "GroupInvitationController",
            a: "actionAccept",
            dat: {
              f_vals: [
                {
                  data: {
                    group_invitation_guid: "9C5BF8C8-9575-35AB-FC40-6B8D89339996"
                  }
                }
              ],
              token: null
            },
            args: null
          }
        },
        {
          icon: 'fa fa-comments',
          label: 'Comment',
          name: 'commentPub',
          actionID: 'a-02',
          actionO: {
            ctx: "Sys",
            m: "User",
            c: "GroupInvitationController",
            a: "actionAccept",
            dat: {
              f_vals: [
                {
                  data: {
                    group_invitation_guid: "9C5BF8C8-9575-35AB-FC40-6B8D89339996"
                  }
                }
              ],
              token: null
            },
            args: null
          }
        },
        {
          icon: 'fa fa-share',
          label: 'Share',
          name: 'sharePub',
          actionID: 'a-03',
          actionO: {
            ctx: "Sys",
            m: "User",
            c: "GroupInvitationController",
            a: "actionAccept",
            dat: {
              f_vals: [
                {
                  data: {
                    group_invitation_guid: "9C5BF8C8-9575-35AB-FC40-6B8D89339996"
                  }
                }
              ],
              token: null
            },
            args: null
          }
        }
      ]
    },
    {
      class: 'stream',
      badge: 'fa fa-comment',
      users: [
        {
          user_id: 1010,
          avatar: '../../../../assets/cd/inspinia/img/a4.jpg',
          username: 'George Ombado'
        }
      ],
      usersLabel: 'George Ombado',
      docDate: 'Yesterday at 10:00:20 am',
      msg: 'Commented on <a href="#">Ariana</a> profile.',
      action: null
    },
    {
      class: 'stream',
      badge: 'fa fa-circle',
      users: [
        {
          user_id: 1010,
          avatar: '../../../../assets/cd/inspinia/img/a2.jpg',
          username: 'George Ombado'
        },
        {
          user_id: 1010,
          avatar: '../../../../assets/cd/inspinia/img/a3.jpg',
          username: 'Joan Atuhura'
        },
        {
          user_id: 1010,
          avatar: '../../../../assets/cd/inspinia/img/a4.jpg',
          username: 'Grace Watsiera'
        }
      ],
      usersLabel: 'Bettyrose Akinyi, Maureen Njoroge and George Ombado',
      docDate: 'Yesterday at 02:13:20 am',
      msg: 'Changed status of third stage in the <a href="#">Vertex</a> project.',
      action: null
    }
  ];
  constructor(
    private el: ElementRef,
    private svSess: SessService,
    private svElem: HtmlElemService,
  ) {

  }

  ngOnInit(): void {
    this.renderLogs();
  }

  ngAfterViewInit() {
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

  public renderLogs() {
    // if (this.tD) {
    //   this.el.nativeElement.classList.add(this.tD.class);
    //   const htmlContent = this.content(this.tD.class, this.tD.data);
    //   this.svElem.appendHtml(this.el, '#' + this.tD.id, htmlContent);
    // }
    this.activityLog.forEach((al) => {
      let htmlContent = this.logsItemHtml(al);
      this.svElem.appendHtml(this.el, '#logsContainer', htmlContent);
    });
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
    if (a.name == 'acceptInvitation') {
      let env = a.actionO;
      env = this.setToken(env);
    }
  }

  setEnvData() {

  }

  setToken(env: any) {
    env.dat.token = this.svSess.getCdToken();
    return env;
  }

}
