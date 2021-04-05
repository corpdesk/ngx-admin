import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UserService } from '../../../@cd/sys/user/controllers/user.service';
import { InteRactAssociationService } from '../../../@cd/sys/inte-ract/controllers/inte-ract-association.service';
import { GroupInvitation, GroupInvitationTypes } from '../../../@cd/sys/user/models/group-invitation-model';
import { GroupInvitationService } from '../../../@cd/sys/user/controllers/group-invitation.service';

@Component({
  selector: 'ngx-cute-table',
  templateUrl: './cute-table.component.html',
  styleUrls: ['./cute-table.component.scss']
})
export class CuteTableComponent implements OnInit {

  @Input() cuteCols = [];
  @Input() tData = [];
  @Input() avatarDefault;
  @Input() groupInvitationTypeID;
  @Output() sendSelAssociation = new EventEmitter(); // used to sync sel items to consumer
  avatar;

  //association selector:
  fetchAssociationData = 'getAssociationsObsv'; // server method for fetching
  isInvalidSelAssociation = true;
  selectedAssociation = [];
  Associations = [{}];
  associationNameField = 'group_name';
  associationIdField = 'group_id';
  AssociationsData;


  constructor(
    public svAssociation: InteRactAssociationService,
    private svGroupInvitation: GroupInvitationService,
    private svUser: UserService,
  ) { }

  ngOnInit(): void {
  }

  setClass(cuteCols, field) {
    return cuteCols[field].class;
  }

  invitePals() {
    const selected = [];
    const elemChecked = document.getElementsByClassName('i-checks') as HTMLCollection;
    for (var i = 0, len = elemChecked.length | 0; i < len; i = i + 1 | 0) {
      const elemID = elemChecked[i].id;
      console.log('elemID:', elemID);
      let guestID = elemID.replace('input-', '').replace('-checkBox','');
      const elemValue = elemChecked[i]['checked'];
      console.log('elemValue:', elemValue);
      if(elemValue){
        selected.push({elID: elemID});
        const i: GroupInvitation = {
          guestUser: Number(guestID),
          hostUser: this.svUser.cuid,
          group_invitation_type_id: this.groupInvitationTypeID
        };
        this.svGroupInvitation.createObsv(i).subscribe((resp) => {
          console.log('resp:', resp);
        });
      }
    }
  }

  

  getSelectedAssociation(selAssociation) {
    console.log('selAssociation:', selAssociation);
    this.selectedAssociation = selAssociation;
    this.sendSelAssociation.emit(selAssociation);
  }

}
