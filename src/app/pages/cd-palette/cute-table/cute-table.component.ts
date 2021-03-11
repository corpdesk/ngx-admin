import { Component, OnInit, Input } from '@angular/core';
import { TD } from '../cute-table/cute.table.model';


@Component({
  selector: 'ngx-cute-table',
  templateUrl: './cute-table.component.html',
  styleUrls: ['./cute-table.component.scss']
})
export class CuteTableComponent implements OnInit {

  @Input() cuteCols = [];
  @Input() tData = [];
  @Input() avatarDefault;
  avatar;

  constructor(
  ) { }

  ngOnInit(): void {
  }

  setAvatar(src,error) {
    if(error){
      this.avatar = this.avatarDefault;
    } else {
      this.avatar = src;
    }
    
  }

}
