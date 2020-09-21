import { Injectable, OnChanges } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { map, filter } from 'rxjs/operators';
import { of,from, pipe } from 'rxjs';
import { CdResponse } from '../../../cd.model';
import { ServerService } from '../../moduleman/controller/server.service';
import { AppStateService } from '../../moduleman/controller/app-state.service';
import { MenuService } from '../../moduleman/controller/menu.service';
import { NotificationService } from '../../comm/controllers/notification.service';
import { SchedulerService } from '../../scheduler/controller/scheduler.service';
import { MessagesService } from '../../comm/controllers/messages.service';
import { environment } from '../../../../../environments/environment';
import { User, UserData } from '../models/user-model';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private postData;

  userData: User[] = [];
  userName = "";
  fullName = "";
  contacts = [];
  allUsers = [];
  currentUser = { name: 'Login/Register', picture: 'assets/cd/branding/coop/avatarCircle.svg' };
  public usersData$: Observable<UserData[]>;
  // CdResponse
  public userDataResp$: Observable<any>;

  constructor(
    private svAppState: AppStateService,
    private svServer: ServerService,
    private svMenu: MenuService,
    private svNotif: NotificationService,
    private svScheduler: SchedulerService,
    private svMessages: MessagesService
  ) { }

  /*
    set userData
    set contacts
    */
  init(res) {
    console.log('starting UserService::init()');
    if(res){
      console.log('UserService::init()/res:', res);
      // this.userData = res.data.user_data;
      // this.userName = this.userData[0].username;
      // this.fullName = this.userData[0].fname + ' ' + this.userData[0].lname;
    }
    
  }

  getUserData(loginResp) {
    console.log('starting UserService::getUserData()');
    console.log('UserService::getUserData()/loginResp:', loginResp);
    // this.setUserDataPost(loginResp);
    /*
    post login request to server
    */
    // this.svServer.proc(this.postData)
    //   .subscribe((res) => {
    //     console.log('UserService::getUserData()/subscribe/res>>');
    //     console.log(res);
    //     this.setUserData(res);
    //   });


    // ATTEMPT 2
    // this.usersData$ = this.getUserDataO(loginResp);
    
    
    // ATTEMPT 3
    this.setUserDataResp(loginResp);
    // TEST ATTEMPT 3
    // of(this.userDataResp$)
    //   .subscribe((res) => {
    //     console.log('UserService::getUserData()/subscribe/res>>');
    //     console.log(res);
    //     this.setUserData();
    //   });

  }

  // getUserDataO(loginResp): Observable<UserData[]> {
  //   console.log('starting UserService::getUserDataO()');
  //   this.userDataResp$ = of(this.setUserDataPost(loginResp));
    
  //   return this.userDataResp$
  //     .pipe(
  //       map((res: any) => {
  //         console.log('getUserDataO/res:', res);
  //         return res.data;
  //       }));
  // }

  setUserDataResp(loginResp){
    console.log('UserService::setUserDataResp()/loginResp:', loginResp);
    this.setUserDataPost(loginResp);
    this.userDataResp$ = this.svServer.proc(this.postData);
    this.setUserData(this.userDataResp$);
  }

  setUserDataPost(loginResp) {
    console.log('starting UserService::setUserDataPost()');
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
        token: loginResp['app_state']['sess']['cd_token']
      },
      args: null
    }
  }

  setUserData(userDataResp$: Observable<any>) {
    console.log('starting UserService::setUserData(res)');
    this.svMenu.init(userDataResp$);
    from(userDataResp$)
      .subscribe((res) => {
        console.log('UserService::setUserData()/subscribe/res>>');
        console.log(res);
        this.init(res);
        
        this.svNotif.init(res);
        this.svScheduler.init(res);
        this.svAppState.setMode('anon');
        this.svMessages.init(res);
        environment.consumer = res['data']['consumer'];
      });

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

  getConsumerUsers() {
    // console.log(data);
  }


}
