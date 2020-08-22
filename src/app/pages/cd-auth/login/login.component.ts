import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,FormControl, Validators } from '@angular/forms';
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
  fg: FormGroup;
  
  constructor() { 
    this.fg = new FormGroup({
      username: new FormControl(),
      password: new FormControl()
   });
  }

  ngOnInit(): void {
  }

  login(fg){
    console.log('fg:',fg);
  }

  getConfigValue(attr){

  }

}

