import { Component, OnInit } from '@angular/core';
// import { NbLoginComponent } from '@nebular/auth';

@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent  
// extends NbLoginComponent  
implements OnInit {
  loginInvalid = false;
  user;
  rememberMe;
  submitted;
  submit;
  
  // constructor() { }

  ngOnInit(): void {
  }

  login(){
    // console.log('f:',f);
  }

  getConfigValue(attr){

  }

}

