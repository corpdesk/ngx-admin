import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthData } from '../../../@cd/sys/user/models/user-model';
import { ServerService } from '../../../@cd/sys/moduleman/controllers/server.service';
import { SessService } from '../../../@cd/sys/user/controllers/sess.service';
import { UserService } from '../../../@cd/sys/user/controllers/user.service';
import { FormsService } from '../../../@cd/guig/forms.service';
import { NavService } from '../../../@cd/guig/nav.service';
import { LoginModel } from '../../../@cd/sys/user/models/user-model';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginInvalid = false;
  rememberMe = true;
  submitted = false;
  fg: FormGroup;
  postData;
  errMsg;

  constructor(private svServer: ServerService,
    public svSess: SessService,
    private svUser: UserService,
    private svNav: NavService,
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

  // login(fg) {
  //   let data: AuthData = fg.value;
  //   const valid = fg.valid;
  //   this.submitted = true;
  //   const consumerGuid = { consumer_guid: environment.consumerToken };
  //   data = Object.assign({}, data, consumerGuid); // merge data with consumer object
  //   console.log('login(fg)/authData:', data);
  //   try {
  //     if (valid) {
  //       this.Submit(data);
  //     }
  //   } catch (err) {
  //     this.errMsg = "Something went wrong!!"
  //     this.loginInvalid = true;
  //   }
  // }

  login(fg) {
    let authData: AuthData = fg.value;
    const valid = fg.valid;
    this.submitted = true;
    const consumerGuid = { consumer_guid: environment.consumerToken };
    authData = Object.assign({}, authData, consumerGuid); // merge data with consumer object
    console.log('login(fg)/authData:', authData);
    try {
      if (valid) {
        this.initSession(authData);
      }
    } catch (err) {
      this.errMsg = "Something went wrong!!"
      this.loginInvalid = true;
    }
  }

  initSession(authData: AuthData) {
    this.svUser.authObsv(authData).subscribe((res: any) => {
      if (res.app_state.success === 1) {
        /*
        create a session on successfull authentication.
        For subsequeng successull request to the server,
        use renewSess(res);
        */
        if (res.app_state.sess.cd_token !== null) {
          this.svSess.createSess(res, this.svUser);
          console.log('login_res:', res);
          this.svUser.currentUser = { name: `${res.data[0].username}`, picture: `http://localhost/user-resources/${res.data[0].user_guid}/avatar-01/a.jpg` };
          this.svNav.userMenu = [
            { title: 'Profile', link: '/pages/cd-auth/register' },
            { title: 'Log out', link: '/pages/cd-auth/logout' }
          ];
          this.route.navigate(['/pages/dashboard']);
        }
        

      } else {
        this.errMsg = "The username and password were not valid"
        this.loginInvalid = true;
        this.svSess.logout();
      }
    });

  }

  // Submit(data) {
  //   this.setAuthPost(data);
  //   /*
  //   post login request to server
  //   */
  //  console.log('Submit()/this.postData:', JSON.stringify(this.postData))
  //   this.svUser.auth(data).subscribe((res: any) => {
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

  // setAuthPost(d: LoginModel) {
  //   /*
  //   set post data
  //   */
  //   this.postData = {
  //     ctx: 'Sys',
  //     m: 'User',
  //     c: 'UserController',
  //     a: 'Login',
  //     dat: {
  //       data: d
  //     },
  //     args: null
  //   };
  // }

  onFocus() {
    this.errMsg = "";
    // this.loginInvalid = false;
  }

}

