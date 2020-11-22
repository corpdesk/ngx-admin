import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ServerService } from '../../../@cd/sys/moduleman/controllers/server.service';
import { SessService } from '../../../@cd/sys/user/controllers/sess.service';
import { UserService } from '../../../@cd/sys/user/controllers/user.service';
import { FormsService } from '../../../@cd/guig/forms.service';
import { NavService } from '../../../@cd/guig/nav.service';
import { LoginModel } from '../../../@cd/sys/user/models/user-model';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'ngx-new-schedule',
  templateUrl: './new-schedule.component.html',
  styleUrls: ['./new-schedule.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NewScheduleComponent implements OnInit {
  selMin = 0;
  Min = '00';
  selDays = 0;
  Days = '00';
  minutes = [];
  loginInvalid = false;
  rememberMe = true;
  submitted = false;
  frmNewSchedule: FormGroup;
  postData;
  errMsg;

  constructor(private svServer: ServerService,
    private svSess: SessService,
    private svUser: UserService,
    private svNav: NavService,
    private route: Router,
  ) {
    let index = 0;
    while(index < 60){
      let value = String(index);
      if(index < 10){
        value = '0' + value;
      }
      const min = {i: index, val: value};
      this.minutes.push(min);
      index++;
    }
    console.log('this.minutes:', this.minutes);
    this.frmNewSchedule = new FormGroup({
      schedule_name: new FormControl(),
      commence_date: new FormControl(),
      durationMin: new FormControl(),
      duration: new FormControl(),
    });
  }

  ngOnInit(): void {
    this.frmNewSchedule.controls.durationMin.setValue(this.Min);
  }

  // async login(fg) {
  //   let data = fg.value;
  //   const valid = fg.valid;
  //   this.submitted = true;
  //   const consumerGuid = { consumer_guid: environment.consumerToken };
  //   data = Object.assign({}, data, consumerGuid); // merge data with consumer object
  //   try {
  //     if (valid) {
  //       this.setAuthPost(data);
  //       this.Submit();
  //     }
  //   } catch (err) {
  //     this.errMsg = "Something went wrong!!"
  //     this.loginInvalid = true;
  //   }
  // }

  // async Submit() {
  //   /*
  //   post login request to server
  //   */
  //   this.svServer.proc(this.postData).subscribe((res: any) => {
  //     if (res.app_state.success === 1) {
  //       /*
  //       create a session on successfull authentication.
  //       For subsequeng successull request to the server,
  //       use renewSess(res);
  //       */
  //       if (this.postData.a === 'Login' && res.app_state.sess.cd_token !== null) {
  //         this.svSess.createSess(res, this.svUser);
  //         // this.svUser.getUserData(res);
  //         console.log('login_res:', res);
  //         this.svUser.currentUser = { name: `${res.data[0].username}`, picture: `http://localhost/user-resources/${res.data[0].user_guid}/avatar-01/a.jpg` };
  //         this.svNav.userMenu = [
  //           { title: 'Profile', link: '/pages/cd-auth/register' },
  //           { title: 'Log out', link: '/pages/cd-auth/logout' }
  //         ];
  //         this.route.navigate(['/pages/dashboard']);
  //       }


  //     } else {
  //       this.errMsg = "The username and password were not valid"
  //       this.loginInvalid = true;
  //       this.svSess.logout();
  //     }
  //   });

  // }

  // setAuthPost(data: LoginModel) {
  //   /*
  //   set post data
  //   */
  //   this.postData = {
  //     ctx: 'Sys',
  //     m: 'User',
  //     c: 'UserController',
  //     a: 'Login',
  //     dat: {
  //       data
  //     },
  //     args: null
  //   };
  // }

  // onFocus() {
  //   this.errMsg = "";
  //   // this.loginInvalid = false;
  // }

  increment(unit) {
    console.log('increment/this.selMin:', this.selMin);
    switch (unit) {
      case 'min':
        if (this.selMin >= 0 && this.selMin < 58) {
          this.selMin++;
          this.Min = this.minutes[this.selMin].val;
          this.frmNewSchedule.controls.durationMin.setValue(this.Min);
        }
        break;
    }
  }

  decrement(unit) {
    console.log('decrement/this.selMin:', this.selMin);
    switch (unit) {
      case 'min':
        if (this.selMin >= 1 && this.selMin < 60) {
          this.selMin--;
          this.Min = this.minutes[this.selMin].val;
          this.frmNewSchedule.controls.durationMin.setValue(this.Min);
        }
        break;
    }
  }

  async changeMin(){
    console.log(this.frmNewSchedule.controls.durationMin.value);
    const newVal = this.frmNewSchedule.controls.durationMin.value;
    console.log('changeMin/newVal:', newVal);
    const validated = await this.validateMin(newVal);
    console.log('changeMin/validated:', validated);
    this.selMin = validated;
    this.Min = await this.minutes[this.selMin].val;
    this.frmNewSchedule.controls.durationMin.setValue(this.Min);
    console.log('changeMin/this.selMin:', this.selMin);
  }

  validateMin(val){
    console.log('validateMin/val:', val);
    let ret = 0;
    if(this.isInt(val)){
      console.log('validateMin/1:');
      if(Number(val) > 59){
        console.log('validateMin/2:');
        ret = 59;
      }
      console.log('validateMin/3:');
      if(Number(val) < 0){
        console.log('validateMin/4:');
        ret = 0;
      }
      console.log('validateMin/5:');
      if(Number(val) >= 0 && Number(val) < 60){
        console.log('validateMin/6:');
        ret = Number(val);
      }
      return ret;
    } else {
      console.log('validateMin/ret:', ret);
      return ret;
    }
    
  }

  isInt(value) {
    if (isNaN(value)) {
      return false;
    }
    var x = parseFloat(value);
    return (x | 0) === x;
  }

  registerSchedule(frm: FormGroup) {
    console.log(frm);
  }

}
