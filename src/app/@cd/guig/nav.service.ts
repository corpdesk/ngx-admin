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
  currentMenuItem = {};
  menuContext = {};
  constructor(private rout: Router) { }

  nav(path){
    this.rout.navigateByUrl(path);
  }

  /**
   * deduce the module and controller from path
   */
  navModule(){
    const items = this.currentMenuItem['link'].substring(1); // remove the preceeding '/'
    const itemArr = items.split('/');
    console.log(itemArr);
    this.menuContext = {
      m:itemArr[1],
      c:itemArr[2]
    }
  };
}
