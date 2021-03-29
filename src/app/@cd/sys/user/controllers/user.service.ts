import { Injectable, OnChanges } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { map, filter } from 'rxjs/operators';
import { of, from, pipe } from 'rxjs';
import { CdResponse } from '../../../cd.model';
import { CdPushEnvelop } from '../../../sys/cd-push/models/cd-push.model';
import { CdFilter } from '../../../base/b.model';
import { AuthData } from '../models/user-model';
import { ServerService } from '../../moduleman/controllers/server.service';
import { SessService } from './sess.service';
import { AppStateService } from '../../moduleman/controllers/app-state.service';
import { MenuService } from '../../moduleman/controllers/menu.service';
import { NotificationService } from '../../comm/controllers/notification.service';
import { MessagesService } from '../../comm/controllers/messages.service';
import { environment } from '../../../../../environments/environment';
import { User, UserData } from '../models/user-model';
import { SocketIoService } from '../../cd-push/controllers/socket-io.service';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private postData;
  cd_token: string;
  userData: User[] = [];
  cuid;
  userName = "";
  fullName = "";
  contacts = [];
  allUsers = [];
  cuidAvatar;
  currentUser: any;
  currentProfile: any = { name: 'Login/Register', picture: 'assets/cd/branding/coop/avatarCircle.svg' };
  pals;
  public usersData$: Observable<UserData[]>;
  // CdResponse
  public userDataResp$: Observable<any>;
  isInvalidSelUsers = true;
  selectedUsers: User[] = [];

  constructor(
    private svAppState: AppStateService,
    private svServer: ServerService,
    private svMenu: MenuService,
    private svNotif: NotificationService,
    private svMessages: MessagesService,
    public svSocket: SocketIoService,
  ) {
    // this.currentProfile.name = 'Login/Register';
    // this.currentProfile.picture = 'assets/cd/branding/coop/avatarCircle.svg';
  }

  /*
    set userData
    set contacts
    */
  init(res) {
    console.log('starting UserService::init()');
    if (res) {
      console.log('UserService::init()/res:', res);
      this.cd_token = res.app_state.sess.cd_token;
      // { name: 'Login/Register', picture: 'assets/cd/branding/coop/avatarCircle.svg' }
      this.currentUser = res.data;
      // this.currentUser.name = 'Login/Register';
      this.currentProfile.name = res.data.user_data[0].username;
      this.cuid = res.data.user_data[0].user_id;
      this.pals = res.data.pals;
      // this.currentUser.picture = 'assets/cd/branding/coop/avatarCircle.svg';
      const avatarUrl = `${environment.HOST}/user-resources/${res.data.user_data[0].user_guid}/avatar-01/a.jpg`;
      console.log('avatarUrl:', avatarUrl);
      this.currentProfile.picture = avatarUrl;
    }

  }

  // auth(authData: AuthData, svSess: SessService){
  //   console.log('authObsv(authData: AuthData)');
  //   this.setEnvelopeAuth(authData);
  //   /*
  //   post login request to server
  //   */
  //  console.log('Submit()/this.postData:', JSON.stringify(this.postData))
  //   this.svServer.proc(this.postData).subscribe((res: any) => {
  //     if (res.app_state.success === 1) {
  //       /*
  //       create a session on successfull authentication.
  //       For subsequeng successull request to the server,
  //       use renewSess(res);
  //       */
  //       if (this.postData.a === 'Login' && res.app_state.sess.cd_token !== null) {
  //         svSess.createSess(res, this);
  //         // this.svUser.getUserData(res);
  //         console.log('login_res:', res);
  //         this.currentUser = { name: `${res.data[0].username}`, picture: `${environment.HOST}/user-resources/${res.data[0].user_guid}/avatar-01/a.jpg` };
  //         this.svNav.userMenu = [
  //           { title: 'Profile', link: '/pages/cd-auth/register' },
  //           { title: 'Log out', link: '/pages/cd-auth/logout' }
  //         ];
  //         this.route.navigate(['/pages/dashboard']);
  //       }


  //     } else {
  //       this.errMsg = "The username and password were not valid"
  //       this.loginInvalid = true;
  //       svSess.logout();
  //     }
  //   });
  // }

  authObsv(authData: AuthData) {
    console.log('authObsv(authData: AuthData)');
    this.setEnvelopeAuth(authData);
    /*
    post login request to server
    */
    console.log('Submit()/this.postData:', JSON.stringify(this.postData))
    return this.svServer.proc(this.postData);
  }

  setEnvelopeAuth(authData: AuthData) {
    this.postData = {
      ctx: 'Sys',
      m: 'User',
      c: 'UserController',
      a: 'Login',
      dat: {
        data: authData
      },
      args: null
    };
  }

  // getUserDataObsv(authData: AuthData) {
  //   console.log('authObsv(authData: AuthData)');
  //   this.setEnvelopeAuth(authData);
  //   /*
  //   post login request to server
  //   */
  //   console.log('Submit()/this.postData:', JSON.stringify(this.postData))
  //   return this.svServer.proc(this.postData);
  // }

  // setEnvelopeGetUserData(authData: AuthData) {
  //   this.postData = {
  //     ctx: 'Sys',
  //     m: 'User',
  //     c: 'UserController',
  //     a: 'Login',
  //     dat: {
  //       data: authData
  //     },
  //     args: null
  //   };
  // }

  // getUserDataObsv(loginResp: CdResponse) {
  //   this.setUserDataPost(loginResp);
  //   this.svServer.proc(this.postData).subscribe((resp) => {
  //     this.setUserData(resp);
  //   });
  // }

  getUserData(loginResp: CdResponse) {
    console.log('starting UserService::getUserData()');
    console.log('UserService::getUserData()/loginResp:', loginResp);
    this.setUserData(loginResp);
  }

  setUserData(loginResp) {
    console.log('starting UserService::setUserData(loginResp)');
    console.log('UserService::setUserData(res)/loginResp:', loginResp);
    this.setEnvelopUserDataPost(loginResp);
    console.log('UserService::setUserData(res)/this.postData:', JSON.stringify(this.postData));
    this.svServer.proc(this.postData).subscribe((userDataResp: any) => {
      console.log('UserService::setUserData(res)/userDataResp:', userDataResp);
      this.svMenu.init(userDataResp);
      this.init(userDataResp);
      this.svNotif.init(userDataResp);
      this.svAppState.setMode('anon');
      this.svMessages.init(userDataResp);
      environment.consumer = userDataResp['data']['consumer'];
      // const cdEnvelop = { req: this.postData, resp: loginResp };

      /**
       * emittEvent is null because the purpose here is to
       * register user socket on successfull login.
       * At the time of this note, no broadcast event is set
       */
      const pushEnvelop: CdPushEnvelop = {
        pushRecepients: null,
        emittEvent: null,
        triggerEvent: 'login',
        req: null,
        resp: userDataResp
      };
      this.emitLogin(pushEnvelop);
    });
  }

  setEnvelopUserDataPost(loginResp: CdResponse) {
    console.log('starting UserService::setUserDataPost()');
    console.log('setEnvelopUserDataPost/loginResp:', loginResp.app_state)
    /*
    set post data
    */
    this.postData = {
      ctx: 'Sys',
      m: 'Moduleman',
      c: 'ModulesController',
      a: 'GetModuleUserData',
      dat: {
        fields: null,
        token: loginResp.app_state.sess['cd_token']
      },
      args: null
    }
  }

  // setUserDataResp(loginResp: CdResponse) {
  //   console.log('UserService::setUserDataResp()/loginResp:', loginResp);
  //   this.setEnvelopUserDataPost(loginResp);
  //   console.log('setUserDataResp(loginResp)/this.postData:', this.postData)
  //   this.userDataResp$ = this.svServer.proc(this.postData);
  //   this.setUserData(this.userDataResp$);
  // }



  // setUserData(userDataResp$: Observable<any>) {
  //   console.log('starting UserService::setUserData(res)');
  //   this.svMenu.init(userDataResp$);
  //   from(userDataResp$)
  //     .subscribe((res) => {
  //       console.log('UserService::setUserData()/subscribe/res>>');
  //       console.log(res);
  //       this.init(res);

  //       this.svNotif.init(res);
  //       this.svAppState.setMode('anon');
  //       this.svMessages.init(res);
  //       environment.consumer = res['data']['consumer'];
  //       // const cdEnvelop = { req: null, resp: res };
  //       // this.emitLogin(cdEnvelop);
  //     });

  // }



  getUsersObsv(f: CdFilter[]) {
    console.log('starting getUsersObsv()');
    this.setEnvelopeUsers(f);
    console.log('this.postData:', JSON.stringify(this.postData));
    /*
    post request to server and return observable
    */
    return this.svServer.proc(this.postData);
  }

  setEnvelopeUsers(f: CdFilter[]) {
    let flt;
    if (f) {
      flt = [
        {
          filter: f
        }
      ]
    } else {
      flt = null;
    }
    this.postData = {
      ctx: 'Sys',
      m: 'User',
      c: 'UserController',
      a: 'actionGet',
      dat: {
        f_vals: flt,
        token: this.cd_token
      },
      args: null
    };
  }

  registerUser(data) {
    console.log(data);
    console.log(data.is_sys_module);
    this.setEnvelopeRegUser(data);
    /*
    post login request to server
    */
    this.svServer.proc(this.postData)
      .subscribe((res) => {
        console.log(res);
        this.setRespRegUser(res['data']);
      });
  }

  /**
   * 
   * @param data 
   * {
          "ctx": "Sys",
          "m": "Moduleman",
          "c": "ModulesController",
          "a": "actionRegisterModule",
          "dat": {
              "f_vals": [
                  {
                      "data": {
                          "module_name": "FooModule",
                          "is_sys_module": false,
                          "module_type_id": 1
                      }
                  }
              ],
              "token": "mT6blaIfqWhzNXQLG8ksVbc1VodSxRZ8lu5cMgda"
          },
          "args": null
      }
   */
  setEnvelopeRegUser(regData) {
    this.postData = {
      ctx: 'Sys',
      m: 'Moduleman',
      c: 'ModulesController',
      a: 'actionRegisterModule',
      dat: {
        f_vals: [
          {
            data: regData
          }
        ],
        docproc: {},
        token: this.svServer.token
      },
      args: null
    };
  }

  setRespRegUser(data) {
    console.log(data);
  }

  getAllUsers() {
    this.setEnvelopeAllUsers();
    /*
    post login request to server
    */
    this.svServer.proc(this.postData)
      .subscribe((res) => {
        console.log('UserService::getAllUsers()/subscribe/res>>');
        console.log(res);
        this.setRespAllUsers(res);
      });
  }

  /**
   * {
            "ctx": "Sys",
            "m": "User",
            "c": "UserController",
            "a": "actionJoinGroup",
            "dat": {
                "f_vals": [
                    {
                        "data": {
                            "user_id": 1010,
                            "group_guid_parent": "25E5D480-1F1E-166B-F1CD-0BA2BD86DC22"
                        }
                    }
                ],
                "token": "mT6blaIfqWhzNXQLG8ksVbc1VodSxRZ8lu5cMgda"
            },
            "args": null
        }
   */
  setEnvelopeAllUsers() {
    this.postData = {
      ctx: 'Sys',
      m: 'User',
      c: 'UserController',
      a: 'actionGetAll',
      dat: {
        f_vals: [],
        docproc: {},
        token: this.svServer.token
      },
      args: null
    };
  }

  setRespAllUsers(res) {
    console.log(res);
    this.allUsers = res['data'];
  }

  emitLogin(cdEnvelop) {
    this.svSocket.emit('login', cdEnvelop);
  }

  /**
   * The above is to effect switching to default image when user has not
   * set avatar.
   * Desired method is to use a directive.
   * Attempted sample: <project-dir>/src/app/pages/cd-palette/directives/default-image.directive.ts
   */
  getAvatar(User) {
    let src;
    if (User.done_avatar) {
      src = `${environment.USER_RESOURCES}/${User.user_guid}/avatar-01/a.jpg`;
    } else {
      src = `${environment.USER_RESOURCES}/ooooooooo/avatar-01/a.jpg`;
    }
    return src;
  }

  /**
   * get users registered under a given consumer
   * For demo purpose, we are just pulling all the users
   * However, yet to be implemented is registration of
   * <consumer_guig>-users where all the registered users will be kept.
   */
  getConsumerUsersObsv() {
    return this.getUsersObsv(null);
  }

  getGroupUsersObsv(groupGuidParent) {
    this.setEnvelopeGetGroupUsers(groupGuidParent);
    return this.svServer.proc(this.postData);
  }
  /**
   * {
          "ctx": "Sys",
          "m": "User",
          "c": "GroupMemberController",
          "a": "actionGetGroupUsers",
          "dat": {
              "f_vals": [
                  {
                      "data": {
                          "group_guid_parent": "08E30801-A7C0-E6A0-3FB1-394E7A71B456"
                      }
                  }
              ],
              "token": "15910E2B-5491-679D-3028-C99CE64CAC53"
          },
          "args": null
      }
   */
  setEnvelopeGetGroupUsers(groupGuidParent) {
    this.postData = {
      ctx: 'Sys',
      m: 'User',
      c: 'GroupMemberController',
      a: 'actionGetGroupUsers',
      dat: {
        f_vals: [
          {
            data: {
              group_guid_parent: groupGuidParent
            }
          }
        ],
        docproc: {},
        token: this.svServer.token
      },
      args: null
    };
  }

  // setEnvelopeUsers() {
  //   this.postData = {
  //     ctx: 'Sys',
  //     m: 'User',
  //     c: 'UserController',
  //     a: 'actionGetAll',
  //     dat: {
  //       f_vals: [],
  //       docproc: {},
  //       token: this.svServer.token
  //     },
  //     args: null
  //   };
  // }

  list() {

  }

  joinGroup(user) {

  }

  getUserGroups() {

  }

}
