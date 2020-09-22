import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map, filter } from 'rxjs/operators';
import { from } from 'rxjs';
import { MenuService } from '../@cd/sys/moduleman/controller/menu.service';
import { SessService } from '../@cd/sys/user/controllers/sess.service';
import { GuigContextService } from '../@cd/guig/guig-context';
import { environment } from '../../environments/environment';

import { MENU_ITEMS } from './pages-menu';

@Component({
  selector: 'ngx-pages',
  styleUrls: ['pages.component.scss'],
  template: `
    <ngx-one-column-layout>
      <nb-menu [items]="svMenu.menu"></nb-menu> 
      <!--
      <ng-material-multilevel-menu [configuration]='config' [items]='appitems' (selectedItem)="selectedItem($event)">
      </ng-material-multilevel-menu>
      -->
      <router-outlet></router-outlet> 
      
    </ngx-one-column-layout>
  `,
})
export class PagesComponent implements OnInit, AfterViewInit {

  templateMenu = MENU_ITEMS;
  menu: any;

  constructor(
    private gc: GuigContextService,
    public svMenu: MenuService,
    private svSess: SessService,
  ) {
    console.log('PagesComponent::constructor()/svMenu.menuData', this.svMenu.menuData);
    // this.svMenu.getGetAll(environment.clientAppId);
  }

  ngOnInit() {
    console.log('PagesComponent::OnInit()/svMenu.menuData', this.svMenu.menuData);
    console.log('this.svSess.token:', this.svSess.token);
    if (!this.svSess.token) {
      this.svMenu.getGetAnon(environment.clientAppId);
    }
  }

  ngAfterViewInit() {
    console.log('PagesComponent::ngAfterViewInit()/svMenu.menuData', this.svMenu.menuData);
  }

  // processMenu() {
  //   console.log('starting processMenu()');
  //   console.log('PagesComponent::processMenu()/svMenu.menuData', this.svMenu.menuData);
  //   /**
  //    * set the menu as per @cd/guig/guig-context setting
  //    * - allowing us to run the project in different modes
  //    * eg orgiginal setting as ngx-admin, other custom modes
  //    */
  //   const menu = {};
  //   this.svMenu.testMapMenu();
  //   let activeMenu;
  //   let filteredMenu;
  //   let menuFeed;
  //   let ctx = this.gc.getMode().name;
  //   switch (ctx) {
  //     case 'ngx-admin-original':
  //       activeMenu = this.svMenu.ngxMenuOrig() as any; //use original template menu by ngx-admin
  //       break;
  //     case 'ngx-admin-mod1':
  //       menuFeed = this.svMenu.ngxMenu() as any;
  //       //filter menu and submenu items for enabled/disabled
  //       filteredMenu = menuFeed.filter(m => m.enabled == true);
  //       filteredMenu.forEach(function (menu: ModuleMenu, i) {
  //         if ('children' in menu) {
  //           menu.children = menu.children.filter(sm => sm.enabled == true);
  //           filteredMenu[i].children = menu.children;
  //         }
  //       });
  //       console.log('filteredMenu', filteredMenu);
  //       activeMenu = filteredMenu; // usc filterable menu
  //       break;
  //     case 'cd-demo':
  //       if (this.svMenu.userDataResp$) {
  //         from(this.svMenu.userDataResp$).subscribe((res: any) => {
  //           menuFeed = res.data.menu_data;
  //           // menuFeed = this.svMenu.menuData as any;
  //           console.log('processMenu()/menuFeed:', menuFeed);
  //           //filter menu and submenu items for enabled/disabled
  //           // filteredMenu = menuFeed.filter(m => m.enabled == true);
  //           // filteredMenu.forEach(function (menu: ModuleMenu, i) {
  //           //   if ('children' in menu) {
  //           //     menu.children = menu.children.filter(sm => sm.enabled == true);
  //           //     filteredMenu[i].children = menu.children;
  //           //   }
  //           // });
  //           // console.log('filteredMenu', filteredMenu);
  //           if (menuFeed.length > 0) {
  //             console.log('menuFeed1:', menuFeed);
  //             activeMenu = menuFeed; // usc filterable menu
  //           } else {
  //             console.log('menuFeed2:', menuFeed);
  //             activeMenu = this.svMenu.ngxMenuOrig() as any;
  //           }
  //         });
  //       }
  //       else {
  //         menuFeed = this.svMenu.ngxMenu() as any;
  //         //filter menu and submenu items for enabled/disabled
  //         filteredMenu = menuFeed.filter(m => m.enabled == true);
  //         filteredMenu.forEach(function (menu: ModuleMenu, i) {
  //           if ('children' in menu) {
  //             menu.children = menu.children.filter(sm => sm.enabled == true);
  //             filteredMenu[i].children = menu.children;
  //           }
  //         });
  //         console.log('filteredMenu', filteredMenu);
  //         activeMenu = filteredMenu; // usc filterable menu
  //       }

  //       break;
  //   }

  //   // console.log('activeMenu:', JSON.stringify(activeMenu));
  //   this.menu = activeMenu;
  //   // return this.menu;
  // }

  selectedItem(e) {
    console.log('e:', e);
  }

  workAreaIsClicked() {
    console.log('workAreaIsClicked()');
  }

}
