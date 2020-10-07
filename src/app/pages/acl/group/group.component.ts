import { Component, OnInit } from '@angular/core';
import { TabsService } from '../../../@cd/guig/tabs.service';

@Component({
  selector: 'ngx-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent implements OnInit {

  constructor(
    public svTabs: TabsService,
  ) { }

  ngOnInit(): void {
  }

}
