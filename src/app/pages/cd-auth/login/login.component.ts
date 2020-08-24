import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ServerService } from '../../../@cd/sys/moduleman/controller/server.service';
import { SessService } from '../../../@cd/sys/user/controllers/sess.service';
import { FormsService } from '../../../@cd/guig/forms.service';
import { LoginModel } from '../../../@cd/sys/user/models/user-model';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent
  implements OnInit {
  loginInvalid = false;
  rememberMe = true;
  submitted = false;
  fg: FormGroup;
  postData;
  errMsg;

  constructor(private svServer: ServerService,
    private svSess: SessService,
    private route: Router,
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
    this.submitted = true;
    const consumerGuid = { consumer_guid: environment.consumerToken };
    data = Object.assign({}, data, consumerGuid); // merge data with consumer object
    try {
      if (valid) {
        this.setAuthPost(data);
        this.Submit();
      }
    } catch (err) {
      this.errMsg = "Something went wrong!!"
      this.loginInvalid = true;
    }
  }

  async Submit() {
    /*
    post login request to server
    */
    this.svServer.proc(this.postData).subscribe((res: any) => {
      if (res.app_state.success === 1) {
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
        this.errMsg = "The username and password were not valid"
        this.loginInvalid = true;
        this.svSess.logout();
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

  onFocus() {
    this.errMsg = "";
    // this.loginInvalid = false;
  }

}

