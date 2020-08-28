import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'ngx-profile-accordion',
  templateUrl: './profile-accordion.component.html',
  styleUrls: ['./profile-accordion.component.scss']
})
export class ProfileAccordionComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @ViewChild('item', { static: true }) accordion;

  toggle() {
    this.accordion.toggle();
  }

}
