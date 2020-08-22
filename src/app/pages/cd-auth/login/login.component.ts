import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, CanActivate, ActivatedRoute, ParamMap } from '@angular/router';
import { ServerService } from '../../../@cd/sys/moduleman/controller/server.service';
import { SessService } from '../../../@cd/sys/user/controllers/sess.service';
import { ConsumerService } from '../../../@cd/sys/moduleman/controller/consumer.service';
import { AlertsService } from '../../../@cd/sys/comm/controllers/alerts.service';
import { FormsService } from '../../../@cd/guig/forms.service';
import { User, LoginModel, RegModel, Resp } from '../../../@cd/sys/user/models/user-model';
import { AuthGuardService } from '../auth-guard.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent
  // extends NbLoginComponent  
  implements OnInit {
  // loginInvalid = false;
  // user;
  // rememberMe = true;
  // submitted = false;
  // submit;
  fg: FormGroup;
  err = {
    msg: 'err-msg', // text on the alert
    elemID: 'login-alert-text', // the id of the element holding the text message
    state: 'warning', // state of the message: options: success, warning, danger, info
    iconWrapID: 'login-icon-wrap' // the id of icon wrapper element.
  };
  postData;
  registerMode = false;

  constructor(private svServer: ServerService,
    private svSess: SessService,
    private svAlert: AlertsService,
    private svConsumer: ConsumerService,
    private route: Router,
    private svFrm: FormsService,
    private svGuard: AuthGuardService
    ) {
    this.fg = new FormGroup({
      username: new FormControl(),
      password: new FormControl(),
      rememberMe: new FormControl()
    });
  }

  ngOnInit(): void {
  }
  async login(fg) {
    let data = fg.value;
    const valid = fg.valid;
    console.log('login clicked', data);
    console.log(valid);
    const consumerGuid = { consumer_guid: environment.consumerToken };
    data = Object.assign({}, data, consumerGuid); // merge data with consumer object
    console.log(data);
    try {
      if (valid) {
        this.setAuthPost(data);
        this.Submit();
      } else {
        this.err.msg = this.svFrm.getFrmErr(); // get all error messages
        this.err.state = 'danger';
        this.svAlert.showError(this.err);
      }
    } catch (err) {
      console.log('catch err>>');
      console.log(err);
      this.err.msg = 'login error:';
      this.err.state = 'danger';
      this.svAlert.showError(this.err);
    }
  }

  async Submit() {
    this.err.msg = 'connecting to server...';
    this.err.state = 'info';
    this.svAlert.showError(this.err);
    /*
    post login request to server
    */
    this.svServer.proc(this.postData).subscribe((res: any) => {
      console.log('starting this.svServer.proc()...response:');
      console.log(res);
      console.log('error_msg:', res.app_state.info.messages);
      if (res.app_state.success === 1) {
        this.err.msg = res.app_state.info.messages;
        this.err.state = 'success';
        this.svAlert.showError(this.err);
        /*
        create a session on successfull authentication.
        For subsequeng successull request to the server,
        use renewSess(res);
        */
        if (this.postData.a === 'Login' && res.app_state.sess.cd_token !== null) {
          this.svSess.createSess(res);
        }
        this.route.navigate(['/pages/dashboard']);

      } else {
        if (this.registerMode) {
          this.registerMode = false;
          this.err.msg = res.app_state.info.messages;
          this.err.state = 'danger';
          this.svAlert.showError(this.err);
        } else {
          this.err.msg = res.app_state.info.messages;
          this.err.state = 'danger';
          this.svAlert.showError(this.err);
          // show error in form
          this.svSess.logout();
        }
      }
    });

  }

  setAuthPost(data: LoginModel) {
    /*
    set post data
    */
    this.postData = {
      ctx: 'Sys',
      m: 'User',
      c: 'UserController',
      a: 'Login',
      dat: {
        data
      },
      args: null
    };
  }

}

