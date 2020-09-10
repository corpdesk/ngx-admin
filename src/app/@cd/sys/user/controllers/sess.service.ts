import { Injectable, HostListener } from '@angular/core';
import { Observable, fromEvent } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import * as moment from 'moment';

// import {environment} from '../../environments/environment';
import { ServerService } from '../../moduleman/controller/server.service';
import { AppStateService } from '../../moduleman/controller/app-state.service';
// import { UserService } from '../../../../@core/mock/users.service';
import { UserService } from './user.service';

interface Menu {
  items: any;
};

@Injectable({
  providedIn: 'root'
})
export class SessService {
  token;
  consumerToken = '';
  countdown;
  distance;
  subscription;
  maxDistance;
  countDownDate;
  endTime;
  postData;
  config = {
    countdown: false
  };
  isActive = false;
  activeModules$: Observable<Menu>;

  constructor(
    private svAppState: AppStateService,
    private svServer: ServerService,
    // private svUser: UserService,
  ) {

  }

  /*
  Every time successfull response come from server,
  it needs to update the client session to extend the Expiration time
  NB: svUseris not injected here but input as an argument
  ...otherwise cyclic error will be thrown
  */
  createSess(res,svUser: UserService) {
    this.setSess(res);
    svUser.getUserData(res);
    this.token = res.app_state.sess.cd_token;
    this.svServer.token = res.app_state.sess.cd_token;
    this.isActive = true;
    this.setModulesData();
  }

  setSess(res) {
    const sess = res.app_state.sess;
    const ttl = sess.ttl;
    this.maxDistance = Number(ttl) * 1000;
    localStorage.setItem('maxDistance', this.maxDistance);
    localStorage.setItem('sess', JSON.stringify(sess));
    localStorage.setItem('ExprTime', this.getExprTime(ttl));

    if (this.config.countdown) {
      this.countDown(this.getExprTime(ttl));
    }

  }

  resetExprTime(ttl) {
    console.log('starting resetExprTime(ttl)');
    const exprTime = moment().add(ttl, 'seconds');
    localStorage.setItem('ExprTime', exprTime.toString());
  }

  getExprTime(ttl) {
    console.log('starting getExprTime(ttl)');
    const exprTime = moment().add(ttl, 'seconds');
    console.log(exprTime.toString());
    return moment().add(ttl, 'seconds').toString();
  }

  logout() {
    console.log('starting logout()');
    this.killSess();
    // set gui to loged out state
    this.svAppState.setMode('login');
  }

  killSess() {
    console.log('starting killSess()');
    localStorage.removeItem('sess');
    localStorage.removeItem('ExprTime');
    clearTimeout(this.countdown);
    this.killSessServer();
  }

  async killSessServer() {
    const data = {
      action: 'kill',
      dat: null
    }
    this.setSessPost(data);
    /*
    post login request to server
    */
    this.svServer.proc(this.postData).subscribe((res) => {
      console.log(res);
    });

  }

  async renewSessServer() {
    const data = {
      action: 'renew',
      dat: null
    }
    this.setSessPost(data);
    /*
    post login request to server
    */
    this.svServer.proc(this.postData).subscribe((res) => {
      console.log(res);
    });

  }

  setSessPost(data) {
    /*
    set post data
    */
    this.postData = {
      ctx: 'Sys',
      m: 'User',
      c: 'SessionController',
      a: data.action,
      dat: data.dat,
      args: null
    };
  }

  public isLoggedIn() {
    // const ret = moment().isBefore(this.getExpiration());
    // return ret;
    return this.isActive;
  }

  isLoggedOut() {
    // console.log('starting isLoggedOut()');
    return !this.isLoggedIn();
  }

  getExpiration() {
    // console.log('starting getExpiration()');
    const expiration = localStorage.getItem('ExprTime');
    // console.dir(expiration);
    // return moment(expiration);
    const ret = new Date(expiration);
    // console.log('ret>>');
    // console.log(ret);
    return ret;
  }

  getSessData() {
    console.log('starting getSessData()');
    const expiration = localStorage.getItem('sess');
    return JSON.parse(expiration);
  }

  getCdToken() {
    console.log('starting getCdToken()');
    return this.getSessData().cd_token;
  }

  getJWToken() {
    console.log('starting getJWToken()');
    return this.getSessData().jwt;
  }

  getTtl() {
    console.log('starting getTtl()');
    return this.getSessData().ttl;
  }

  /*
  Every time successfull response come from server, 
  it needs to update the client session to extend the Expiration time
  */
  renewSess(res) {
    console.log('starting renewSess(res)');
    this.setSess(res);
  }

  countDown(endTime) {
    this.endTime = endTime;
    // Set the date we're counting down to
    // const countDownDate = new Date('Jan 5, 2021 15:37:25').getTime();
    this.countDownDate = new Date(endTime).getTime();

    // Update the count down every 1 second
    this.countdown = setInterval(() => {

      // Get today's date and time
      const now = new Date().getTime();

      console.log('this.countDownDate:');
      console.log(this.countDownDate);
      console.log('now:');
      console.log(now);
      // Find the distance between now and the count down date
      this.distance = this.countDownDate - now;
      console.log('distance:');
      console.log(this.distance);

      // Time calculations for days, hours, minutes and seconds
      const days = Math.floor(this.distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((this.distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((this.distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((this.distance % (1000 * 60)) / 1000);

      // Display the result in the element with id="demo"
      // document.getElementById('demo').innerHTML = days + 'd ' + hours + 'h ' + minutes + 'm ' + seconds + 's ';
      console.log(days + 'd ' + hours + 'h ' + minutes + 'm ' + seconds + 's ');

      // If the count down is finished, write some text
      if (this.distance < 0) {
        clearInterval(this.countdown);
        // document.getElementById('demo').innerHTML = 'EXPIRED';
        console.log('session expired');
        this.logout();
      }
      if (this.distance == this.maxDistance) {
        // let subRet;
        // this.subscription =
        //   fromEvent(document, 'mousemove')
        //     .subscribe( e => {
        //       // console.log(e);
        //       if (this.isLoggedIn()) {
        //         console.log('loggedin == ture')
        //         subRet = new Date(endTime).getTime();
        //         console.log('subRet>>');
        //         console.dir(subRet);
        //         this.countDownDate = subRet;
        //       }
        //     });


      }
    }, 4000);
  }

  resetCountDown() {
    clearTimeout(this.countdown);
    const ttl = this.getTtl;
    // this.resetExprTime(ttl);
    // this.distance += (Number(ttl) * 1000);
    this.countDown(ttl);
  }

  setModulesData() {
    console.log('starting fetchModules()');
    this.svServer.setParams({
      ctx: 'Sys',
      m: 'Moduleman',
      c: 'ModulesController',
      a: 'actionGetMenu',
      dat: {
        token: this.token
        // token: 'i02I0phd2T0Z6UIfuvv417aL3jis5RoMKq81mBKe'
      },
      args: null
    });
    console.log('token>>', this.svServer.token);
    this.svServer.proc(this.svServer.params)

      .pipe(

        // extract data (addOn modules) from response
        map(resp => resp['data']),

        // combine the native sysModules and addOn modules
        map(addOns => this.getSysModules().concat(addOns)),

        // filter only enabled modules
        map(modules => modules.filter(Module => Module['registered'] == true))

        /**
         * ToDo: sorting compostition needed here
         * The sorting should be done against 'order' field.
         */
      )

      // eventually subscribe...
      .subscribe(
        (enabledModules: any) => {
          console.log('setModulesData/dat:', enabledModules);
          this.activeModules$ = enabledModules;
        }
      );
  }

  getSysModules() {
    const modules = [{
      menuOrder: 11,
      path: './dashboard',
      moduleTypeID: 1,
      description: 'dashboard',
      registered: false,
      label: 'Home',
      icon: 'home',
      children: [{
        path: 'dashboard',
        label: 'dashboard'
      }, {
        path: 'styles',
        label: 'styles'
      }, {
        path: 'messages',
        label: 'messages'
      }, {
        path: 'reservation',
        label: 'reservation'
      }, {
        path: 'calendar1',
        label: 'calendar1'
      }, {
        path: 'calendar2',
        label: 'calendar2'
      }]
    }, {
      menuOrder: 11,
      path: './admin',
      moduleTypeID: 1,
      description: 'admin',
      registered: false,
      label: 'admin',
      icon: 'cog',
      children: [{
        path: 'admin/admin-dashboard',
        label: 'dashboard'
      }, {
        path: 'admin/cdobj',
        label: 'cdobj'
      }, {
        path: 'admin/company',
        label: 'company'
      }, {
        path: 'admin/grus',
        label: 'groups & users'
      }, {
        path: 'admin/menu',
        label: 'menu'
      }, {
        path: 'admin/modman',
        label: 'modman'
      }]
    }, {
      menuOrder: 11,
      path: 'stats',
      moduleTypeID: 1,
      description: 'stats',
      registered: false,
      label: 'stats',
      icon: 'cog',
      children: [{
        path: 'stats/xy',
        label: 'xy-chart'
      }, {
        path: 'stats/pie',
        label: 'pie'
      }, {
        path: 'stats/micro-chart',
        label: 'micro-chart'
      }]
    }, {
      menuOrder: 12,
      path: 'coop',
      moduleTypeID: 1,
      description: 'coop module',
      registered: false,
      label: 'coop',
      icon: 'cog',
      children: [{
        path: 'coop/index',
        label: 'home'
      }, {
        path: 'coop/directory',
        label: 'directory'
      }]
    }, {
      menuOrder: 11,
      path: 'booking',
      moduleTypeID: 1,
      description: 'booking',
      registered: false,
      label: 'booking',
      icon: 'cog',
      children: [{
        path: 'booking/directory',
        label: 'directory'
      },
      {
        path: 'booking/reservation',
        label: 'reservation'
      }]
    }, {
      menuOrder: 11,
      path: './modtst',
      moduleTypeID: 1,
      description: 'modtst',
      registered: false,
      label: 'modtst',
      icon: 'cog',
      children: [{
        path: 'modtst/index',
        label: 'home'
      },
      {
        path: 'modtst/dashboard',
        label: 'dashboard'
      }]
    }];
    return modules;
  }

}
