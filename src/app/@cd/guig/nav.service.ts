import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NavService {
  userMenu = [
    { title: 'Login' },
    { title: 'Register' }
  ];
  constructor(private rout: Router) { }

  nav(path){
    this.rout.navigateByUrl(path);
  }
}
