import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { SessService } from '../../@cd/sys/user/controllers/sess.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(public router: Router, private svSess: SessService) {}

  async canActivate() {
    if (!await this.svSess.isActive) {
      await this.router.navigate(['pages/cd-auth/login']);
      return false;
    }
    return true;
  }

}
