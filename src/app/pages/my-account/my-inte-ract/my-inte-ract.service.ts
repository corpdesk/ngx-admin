import { Injectable } from '@angular/core';
import { UserService } from '../../../@cd/sys/user/controllers/user.service';
import { CdFilter } from '../../../@cd/base/b.model';

@Injectable({
  providedIn: 'root'
})
export class MyInteRactService {
  pubCtx = {
    m: 'user',
    c: null,
    domain: {
      group_invitation_type_id: 1313,
      group_guid: null
    }
  };
  constructor(
    private svUser: UserService,
  ) { }

  /**
  * different inteReact consumers are expected
  * to set their own pubFilter. 
  * Here we get pub by all pals to make the
  * required pubs
  */
  pubFilter(): CdFilter[] {
    let filter: CdFilter[] = [
      {
        field: 'user_id',
        operator: '=',
        val: this.svUser.cuid
      }
    ];
    if (this.svUser.pals.length > 0) {
      // set filter to fetch pubs for all 'pals'
      filter = this.svUser.pals.map((p: any) => {
        return {
          field: 'user_id',
          operator: '=',
          val: p.user_id,
          conjType: 'or'
        }
      });
    }
    else {
      // set filter to fetch pubs for only the current user
      filter = [
        {
          field: 'user_id',
          operator: '=',
          val: this.svUser.cuid
        }
      ];
    }

    filter.push({
      fieldType: 'json',
      jField: 'j_val',
      jPath: '$.m',
      operator: '=',
      jVal: 'user'
    });

    filter.push({
      fieldType: 'json',
      jField: 'j_val',
      jPath: '$.domain.group_invitation_type_id',
      operator: '=',
      jVal: 1313
    });

    return filter;
  }

  pubFilterExt(): CdFilter[][] {
    return [
      [
        {
          fieldType: 'json',
          jField: 'j_val',
          jPath: '$.m',
          operator: '=',
          jVal: 'user'
        },
        {
          fieldType: 'json',
          jField: 'j_val',
          jPath: '$.domain.group_invitation_type_id',
          operator: '=',
          jVal: 1313
        }
      ]
    ]
  }
}
