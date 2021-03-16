import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { InteRactAssociationService } from '../../../@cd/sys/inte-ract/controllers/inte-ract-association.service';

@Component({
  selector: 'ngx-cute-table',
  templateUrl: './cute-table.component.html',
  styleUrls: ['./cute-table.component.scss']
})
export class CuteTableComponent implements OnInit {

  @Input() cuteCols = [];
  @Input() tData = [];
  @Input() avatarDefault;
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
  ) { }

  ngOnInit(): void {
  }

  setClass(cuteCols, field) {
    return cuteCols[field].class;
  }

  getChecked() {
    const selected = [];
    const elemChecked = document.getElementsByClassName('i-checks') as HTMLCollection;
    for (var i = 0, len = elemChecked.length | 0; i < len; i = i + 1 | 0) {
      const elemID = elemChecked[i].id;
      console.log('elemID:', elemID);
      const elemValue = elemChecked[i]['checked'];
      console.log('elemValue:', elemValue);
      if(elemValue){
        selected.push({elID: elemID});
      }
    }
  }

  getSelectedAssociation(selAssociation) {
    console.log('selAssociation:', selAssociation);
    this.selectedAssociation = selAssociation;
    this.sendSelAssociation.emit(selAssociation);
  }

}
