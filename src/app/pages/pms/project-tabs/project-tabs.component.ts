import { Component, OnInit } from '@angular/core';
import { TabsService } from '../../../@cd/guig/tabs.service';
import { GuigTableConfig } from '../../../@cd/guig/models/guig-table-col.model';

@Component({
  selector: 'ngx-project-tabs',
  templateUrl: './project-tabs.component.html',
  styleUrls: ['./project-tabs.component.scss']
})
export class ProjectTabsComponent implements OnInit {

  constructor(
    public svTabs: TabsService,
  ) { }

  ngOnInit(): void {
  }

}
