import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'ngx-header-two',
  templateUrl: './header-two.component.html',
  styleUrls: ['./header-two.component.scss'],
  // encapsulation: ViewEncapsulation.None
})
export class HeaderTwoComponent implements OnInit {
  @Input() title = 'Title';
  @Input() breadcrumbs = ['Home', 'MyAccount'];
  constructor() { }

  ngOnInit(): void {
  }

}
