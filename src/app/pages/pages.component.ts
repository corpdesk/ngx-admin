import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map, filter } from 'rxjs/operators';
import { from } from 'rxjs';
import { MenuService } from '../@cd/sys/moduleman/controller/menu.service';
import { GuigContextService } from '../@cd/guig/guig-context';

import { MENU_ITEMS } from './pages-menu';

interface SubMenu {
  title: string;
  link: string;
  enabled?: boolean;
}

interface ModuleMenu {
  title: string;
  icon: string;
  enabled?: boolean;
  home: boolean;
  children: SubMenu[]
}

@Component({
  selector: 'ngx-pages',
  styleUrls: ['pages.component.scss'],
  template: `
    <ngx-one-column-layout>
      <nb-menu [items]="menu"></nb-menu> 
      <!--
      <ng-material-multilevel-menu [configuration]='config' [items]='appitems' (selectedItem)="selectedItem($event)">
      </ng-material-multilevel-menu>
      -->
      <router-outlet></router-outlet> 
      
    </ngx-one-column-layout>
  `,
})
export class PagesComponent implements OnInit {

  templateMenu = MENU_ITEMS;
  menu: any;
  // appitems = [
  //   {
  //     label: 'Item 1 (with Font awesome icon)',
  //     faIcon: 'fab fa-500px',
  //     items: [
  //       {
  //         label: 'Item 1.1',
  //         link: '/item-1-1',
  //         faIcon: 'fab fa-accusoft'
  //       },
  //       {
  //         label: 'Item 1.2',
  //         faIcon: 'fab fa-accessible-icon',
  //         items: [
  //           {
  //             label: 'Item 1.2.1',
  //             link: '/item-1-2-1',
  //             faIcon: 'fas fa-allergies'
  //           },
  //           {
  //             label: 'Item 1.2.2',
  //             faIcon: 'fas fa-ambulance',
  //             items: [
  //               {
  //                 label: 'Item 1.2.2.1',
  //                 link: 'item-1-2-2-1',
  //                 faIcon: 'fas fa-anchor'
  //               }
  //             ]
  //           }
  //         ]
  //       }
  //     ]
  //   },
  //   {
  //     label: 'Item 2',
  //     icon: 'alarm',
  //     items: [
  //       {
  //         label: 'Item 2.1',
  //         link: '/item-2-1',
  //         icon: 'favorite'
  //       },
  //       {
  //         label: 'Item 2.2',
  //         link: '/item-2-2',
  //         icon: 'favorite_border'
  //       }
  //     ]
  //   },
  //   {
  //     label: 'Item 3',
  //     link: '/item-3',
  //     icon: 'offline_pin'
  //   },
  //   {
  //     label: 'Item 4',
  //     link: '/item-4',
  //     icon: 'star_rate',
  //     hidden: true
  //   }
  // ];

  // config = {
  //   paddingAtStart: true,
  //   classname: 'my-custom-class',
  //   listBackgroundColor: 'rgb(208, 241, 239)',
  //   fontColor: 'rgb(8, 54, 71)',
  //   backgroundColor: 'rgb(208, 241, 239)',
  //   selectedListFontColor: 'red',
  // };
  // private subMenu: Observable<SubMenu[]>;

  constructor(
    private gc: GuigContextService,
    private svMenu: MenuService,
  ) {

  }

  ngOnInit() {
    this.processMenu();
  }

  processMenu() {
    /**
     * set the menu as per @cd/guig/guig-context setting
     * - allowing us to run the project in different modes
     * eg orgiginal setting as ngx-admin, other custom modes
     */
    const menu = {};
    this.svMenu.testMapMenu();
    let activeMenu;
    let filteredMenu;
    let menuFeed;
    let ctx = this.gc.getMode().name;
    switch (ctx) {
      case 'ngx-admin-original':
        activeMenu = this.svMenu.ngxMenuOrig() as any; //use original template menu by ngx-admin
        break;
      case 'ngx-admin-mod1':
        menuFeed = this.svMenu.ngxMenu() as any;
        //filter menu and submenu items for enabled/disabled
        filteredMenu = menuFeed.filter(m => m.enabled == true);
        filteredMenu.forEach(function (menu: ModuleMenu, i) {
          if ('children' in menu) {
            menu.children = menu.children.filter(sm => sm.enabled == true);
            filteredMenu[i].children = menu.children;
          }
        });
        console.log('filteredMenu', filteredMenu);
        activeMenu = filteredMenu; // usc filterable menu
        break;
      case 'cd-demo':
        menuFeed = this.svMenu.cdDemoMenu() as any;
        console.log('menuFeed:', menuFeed);
        //filter menu and submenu items for enabled/disabled
        // filteredMenu = menuFeed.filter(m => m.enabled == true);
        // filteredMenu.forEach(function (menu: ModuleMenu, i) {
        //   if ('children' in menu) {
        //     menu.children = menu.children.filter(sm => sm.enabled == true);
        //     filteredMenu[i].children = menu.children;
        //   }
        // });
        console.log('filteredMenu', filteredMenu);
        activeMenu = filteredMenu; // usc filterable menu
        break;
    }

    // console.log('activeMenu:', JSON.stringify(activeMenu));
    this.menu = activeMenu;
    // return this.menu;
  }

  selectedItem(e){
    console.log('e:', e);
  }

  workAreaIsClicked() {
    console.log('workAreaIsClicked()');
  }

}
