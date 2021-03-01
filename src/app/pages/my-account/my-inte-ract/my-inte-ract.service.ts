import { Injectable } from '@angular/core';
import { UserService } from '../../../@cd/sys/user/controllers/user.service';

@Injectable({
  providedIn: 'root'
})
export class MyInteRactService {

  constructor(
    private svUser: UserService,
  ) { }

  /**
     * different inteReact consumers are expected
     * to set their own pubFilter. 
     * Here we get pub by all pals to make the
     * required pubs
     */
    pubFilter(){
      let filter = null;
      if (this.svUser.pals) {
          // set filter to fetch pubs for all 'pals'
          filter = this.svUser.pals.map((p: any) => {
              return {
                  field: 'user_id',
                  operator: '=',
                  val: p.user_id,
                  filterType: 'or'
              }
          });
      } else {
          // set filter to fetch pubs for only the current user
          filter = [
              {
                  field: 'user_id',
                  operator: '=',
                  val: this.svUser.cuid
              }
          ];
      }
      return filter;
  }
}
