import { Component, OnInit } from '@angular/core';

import { ModuleTabsService } from '../module-tabs.service';
import { TabItem } from '../../../@cd/guig/models/tab-item';

@Component({
  selector: 'ngx-module',
  templateUrl: './module.component.html',
  styleUrls: ['./module.component.scss']
})
export class ModuleComponent implements OnInit {

  tabs: TabItem[];
  tab0Index = 0;
  tab1Index = 1;
  tab2Index = 2;
  


  constructor(private modTabService: ModuleTabsService) {
    this.tabs = this.modTabService.getTabs();
  }

  ngOnInit() {

  }

}
