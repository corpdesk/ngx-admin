import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { SessService } from '../../@cd/sys/user/controllers/sess.service';
import { NavService } from '../../@cd/guig/nav.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(
    public router: Router, 
    private svSess: SessService,
    private svNav: NavService
    ) {

    }

  async canActivate() {
    // !await this.svSess.isActive <-- should be replaced with:
    // !await this.svSess.hasAccess(moduleName)...via preloaded modules
    // Otherwise isActive will only guarantee that one is logged in.  One may be logged in but not authorised to a given route
    // A polite notification should also be triggered
    console.log('AuthGuardService/currentMenuItem:', this.svNav.currentMenuItem);
    this.svNav.navModule();
    //use this.svNav.menuContext.m as current module
    console.log('menuContext:', this.svNav.menuContext);
    if (!await this.svSess.isActive) {
      await this.router.navigate(['pages/cd-auth/login']);
    }
    return true;
  }

}
