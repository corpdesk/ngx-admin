import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-check-box',
  templateUrl: './check-box.component.html',
  styleUrls: ['./check-box.component.scss']
})
export class CheckBoxComponent implements OnInit {
  checked = false;
  enabled = false;
  constructor() { }

  ngOnInit(): void {
  }

  setChecked(val) {
    if(this.enabled){
      this.checked = val;
    } else {
      console.log('control is disabled');
    } 
  }

  getChecked() {
    return this.checked;
  }

}
