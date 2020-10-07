import { Component, OnInit } from '@angular/core';
import { TabsService } from '../../../@cd/guig/tabs.service';

@Component({
  selector: 'ngx-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  constructor(
    public svTabs: TabsService,
  ) { }

  ngOnInit(): void {
  }

}
