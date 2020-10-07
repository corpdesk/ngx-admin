import { Component, OnInit } from '@angular/core';
import { ModulesService } from '../../../@cd/sys/moduleman/controller/modules.service';
import { TabsService } from '../../../@cd/guig/tabs.service';
// import { ModuleTabsService } from '../module-tabs.service';
// import { TabItem } from '../../../@cd/guig/models/tab-item';
// import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'ngx-module',
  templateUrl: './module.component.html',
  styleUrls: ['./module.component.scss']
})
export class ModuleComponent implements OnInit {

  // tabs: TabItem[];
  // tab0Index = 0;
  // tab1Index = 1;
  // tab2Index = 2;



  constructor(
    // private modTabService: ModuleTabsService,
    public svModule: ModulesService,
    public svTabs: TabsService,
    // public  toastr: ToastrService,
  ) {
    // this.tabs = this.modTabService.getTabs();
  }

  ngOnInit() {
    // this.toastr.success('Hello world!', 'Toastr fun!');
  }

  // tabActivate(id) {
  //   console.log('starting tabActivate(id)');
  //   console.log('id;', id);
  //   const tabElem = document.getElementsByClassName('nav-link active');
  //   tabElem[0].classList.remove('active');
  //   const tabPaneElem = document.getElementsByClassName('tab-pane active');
  //   tabPaneElem[0].classList.remove('active');

  //   const tabSelected = document.getElementById('tab_' + id);
  //   console.log('tabSelected;', tabSelected);
  //   const selItem = tabSelected.childNodes[0] as HTMLElement;
  //   selItem.classList.add('active');
  //   // tabSelected.classList.add('active');
  //   const tabPaneSelected = document.getElementById('tab-' + id);
  //   console.log('tabPaneSelected;', tabPaneSelected);
  //   tabPaneSelected.classList.add('active');
  // }

}
