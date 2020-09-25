import { Component, Input, OnInit, AfterViewInit, AfterContentChecked, ViewChild, ComponentFactoryResolver, OnDestroy } from '@angular/core';

import { TabDirective } from '../../../@cd/guig/directives/tab.directive';
import { TabItem } from '../../../@cd/guig/models/tab-item';
import { TabComponent } from '../../../@cd/guig/models/tab.component';


@Component({
  selector: 'ngx-tab-loader',
  templateUrl: './tab-loader.component.html',
  styleUrls: ['./tab-loader.component.scss']
})
export class TabLoaderComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() tabs: TabItem[];
  @Input() tabIndex: number;
  // currentAdIndex = -1;
  currentTabIndex = 0;
  @ViewChild(TabDirective, { static: true }) tabHost: TabDirective;
  interval: any;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) {

  }

  ngOnInit() {
    console.log('starting TabLoaderComponent::ngOnInit()')
    console.log('this.tabIndex:', this.tabIndex);
    this.currentTabIndex = this.tabIndex;
    // this.loadComponent();
  }

  ngAfterViewInit() {
    // this.loadComponent();
    setTimeout(() => {
      this.loadComponent();
    }, 2);
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }

  loadComponent() {
    // this.currentAdIndex = (this.currentAdIndex + 1) % this.ads.length;
    const tabItem = this.tabs[this.currentTabIndex];

    console.log('tabItem:', tabItem);

    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(tabItem.component);
    console.log('this.tabHost:', this.tabHost);
    const viewContainerRef = this.tabHost.viewContainerRef;
    viewContainerRef.clear();

    const componentRef = viewContainerRef.createComponent<TabComponent>(componentFactory);
    componentRef.instance.data = tabItem.data;
  }

  // getAds() {
  //   this.interval = setInterval(() => {
  //     this.loadComponent();
  //   }, 3000);
  // }

}
