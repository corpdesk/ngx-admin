import { Injectable } from '@angular/core';
import { UserService } from '../../../@cd/sys/user/controllers/user.service';
import { CdFilter } from '../../../@cd/base/b.model';
import { User } from '../../../@cd/sys/user/models/user-model';

@Injectable({
  providedIn: 'root'
})
export class PmsInteRactService {
  project_id = null;
  schedule_id = null;
  pubCtx = {
    m: 'pms',
    c: null,
    domain: {
      project_id: null,
      group_invitation_type_id: 1315,
      schedule_id: null,
      group: null
    }
  };
  users: User[];
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
    if (this.users) {
      // set filter to fetch pubs for all 'pals'
      filter = this.users.map((p: any) => {
        // console.log('p:', p);
        // const id = p.Action.id;
        // const user_id = Number(id.replace("-Action", ""));
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
    return filter;
  }

  pubFilterExt(g): CdFilter[][] {
    const ret = [
      [
        {
          fieldType: 'json',
          jField: 'j_val',
          jPath: '$.m',
          operator: '=',
          jVal: 'pms'
        },
        {
          fieldType: 'json',
          jField: 'j_val',
          jPath: '$.domain.group_invitation_type_id',
          operator: '=',
          jVal: 1315
        }
      ]
    ];

    if(g){
      ret[0].push({
        fieldType: 'json',
        jField: 'j_val',
        jPath: '$.domain.group.group_id',
        operator: '=',
        jVal: g.group_id
      });
    }

    return ret;

  }

  setPubCtx(projectID, scheduleID,g){
    this.pubCtx = {
      m: 'pms',
      c: null,
      domain: {
        project_id: projectID,
        group_invitation_type_id: 1315,
        schedule_id: scheduleID,
        group: g
      }
    };
  }

  getPubCtx(){
    return this.pubCtx;
  }
}
