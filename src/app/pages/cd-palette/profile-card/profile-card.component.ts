import { Component, Input, OnInit, AfterViewInit } from '@angular/core';

@Component({
  selector: 'ngx-profile-card',
  templateUrl: './profile-card.component.html',
  styleUrls: ['./profile-card.component.scss']
})
export class ProfileCardComponent implements OnInit, AfterViewInit {
  @Input() ProfileData;
  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(){
    
  }

}
