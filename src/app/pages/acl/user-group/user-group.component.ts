import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User, UserData } from '../../../@cd/sys/user/models/user-model';
import { Group } from '../../../@cd/sys/user/models/group-model';
import { GroupMember } from '../../../@cd/sys/user/models/gruoup-member-model';
import { GroupService } from '../../../@cd/sys/user/controllers/group.service';
import { GroupMemberService } from '../../../@cd/sys/user/controllers/group-member.service';
import { UserService } from '../../../@cd/sys/user/controllers/user.service';

@Component({
  selector: 'ngx-user-group',
  templateUrl: './user-group.component.html',
  styleUrls: ['./user-group.component.scss']
})
export class UserGroupComponent implements OnInit {
  linearMode = true;
  frmSelUsers: FormGroup;
  // isInvalidSelUsers = true;
  successSelUsers = false;
  regDataModule = { module_name: '', is_sys_module: '' };
  newModule: any;
  regDataMenu: any;
  newMenu: any;
  regModuleAffectedRows: any;
  isInvalidRegMenu = true;
  successRegMenu = false;
  // frmJoinGroup: FormGroup;
  regMenuAffectedRows: any;
  currentMenu: any;
  groupMemberData: GroupMember[] = [];
  constructor(
    private fb: FormBuilder,
    public svUser: UserService,
    public svGroup: GroupService,
    private svGroupMember: GroupMemberService,
  ) { }

  ngOnInit(): void {
  }

  

  /* Handle form errors in Angular 8 */
  public errorHandling = (frm, control: string, error: string) => {
    return frm.controls[control].hasError(error);
  }

  get dataControls() {
    return this.frmSelUsers.controls;
  }

  

  menuParentId() {
    console.log('starting menuParentId()')
    const parentMenu = this.regModuleAffectedRows.filter(affrectedRow => affrectedRow.m == 'menu');
    return parentMenu[0].rowID;
  }

  getSelectedUsers() {
    console.log('starting getSelectedUsers()');
    console.log('selectedUsers:', this.svUser.selectedUsers);
  }

  // Format:
  //
  //   "data": {
  //       "user_id_member": "1010",
  //       "member_guid": "fe5b1a9d-df45-4fce-a181-65289c48ea00",
  //       "group_guid_parent": "D7FF9E61-B143-D083-6130-A51058AD9630",
  //       "cd_obj_type_id": "9"
  //   }
  private setGroupMemberData(parentGroup: Group) {
    this.svUser.selectedUsers.forEach((user) => {
      const groupMember: any = { data:{}};
      groupMember.data.user_id_member = user.user_id;
      groupMember.data.member_guid = user.user_guid;
      groupMember.data.group_guid_parent = parentGroup.group_guid;
      groupMember.data.cd_obj_type_id = 9;
      this.groupMemberData.push(groupMember);
    });
  }

  /**
   * if muliple groups are selected, 
   * build an array of groupMemberData
   */
  setGroupData() {
    this.groupMemberData = [];
    this.svGroup.selectedGroups.forEach((group: Group) => {
      this.setGroupMemberData(group);
    });
  }

  submitGroupMembers() {
    this.setGroupData();
    console.log('this.svUser.selectedUsers:', this.svUser.selectedUsers);
    console.log('this.svGroup.selectedGroups:', this.svGroup.selectedGroups);
    console.log('this.groupMemberData:', this.groupMemberData);
    this.svGroupMember.createObsv(this.groupMemberData).subscribe((resp) => {
      console.log('submitGroupMembers()/resp:', resp);
    });
  }

}
