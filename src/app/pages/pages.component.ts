import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map, filter } from 'rxjs/operators';
import { from } from 'rxjs';
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
      <router-outlet></router-outlet>
    </ngx-one-column-layout>
  `,
})
export class PagesComponent implements OnInit {

  templateMenu = MENU_ITEMS;
  menu: any;
  private subMenu: Observable<SubMenu[]>;

  constructor(private gc: GuigContextService) {

  }

  ngOnInit() {
    const MENU_ITEMS: any = [
      {
        title: 'Home',
        icon: 'lock-outline',
        enabled: true,
        link: '/pages/home/news-feed',
        home: true,
        children: [
          {
            title: 'News',
            link: '/pages/home/news-feed',
            enabled: true
          },
          {
            title: 'about',
            link: '/pages/home/about',
            enabled: true
          },
          {
            title: 'Events',
            link: '/pages/home/events',
            enabled: false
          },
          {
            title: 'Products',
            link: '/pages/home/products',
            enabled: false
          },
          {
            title: 'Resources',
            link: '/pages/home/resources',
            enabled: false
          },
          {
            title: 'Services',
            link: '/pages/home/services',
            enabled: false
          }
        ],
      },
      {
        title: 'My Space',
        icon: 'lock-outline',
        enabled: true,
        home: false,
        children: [
          {
            title: 'dashboard',
            link: '/pages/my-account/dashboard',
            enabled: true
          },
          {
            title: 'inteRact',
            link: '/pages/my-account/inte-ract',
            enabled: true
          },
          {
            title: 'Personal Info',
            link: '/pages/my-account/personal-data',
            enabled: true
          },
          {
            title: 'Activity',
            link: '/pages/my-account/activity',
            enabled: true
          },
          {
            title: 'Calendar',
            link: '/pages/my-account/calendar',
            enabled: false
          },
          {
            title: 'Planner',
            link: '/pages/my-account/planner',
            enabled: true
          },
          {
            title: 'Memo',
            link: '/pages/my-account/cd-memo',
            enabled: false
          },
          {
            title: 'InTray',
            link: '/pages/my-account/in-tray',
            enabled: false
          },
          {
            title: 'ReadDoc',
            link: '/pages/my-account/read-doc',
            enabled: false
          },
          {
            title: 'ComposeDoc',
            link: '/pages/my-account/compose-doc',
            enabled: false
          },
          {
            title: 'DocTray',
            link: '/pages/my-account/doc-tray',
            enabled: true
          },
          {
            title: 'Contacts',
            link: '/pages/my-account/contacts',
            enabled: false
          }
        ],
      },
      {
        title: 'IoT Dashboard',
        icon: 'home-outline',
        link: '/pages/iot-dashboard',
        enabled: false,
      },
      {
        title: 'CD-APPS',
        group: true,
        enabled: true,
      },
      {
        title: 'Coops',
        icon: 'lock-outline',
        enabled: false,
        home: false,
        children: [
          {
            title: 'home',
            link: '/pages/coops/home',
            enabled: true
          },
          {
            title: 'compliance',
            link: '/pages/coops/compliance',
            enabled: true
          },
          {
            title: 'events',
            link: '/pages/coops/events',
            enabled: true
          },
          {
            title: 'forums',
            link: '/pages/coops/forums',
            enabled: true
          },
          {
            title: 'capacity-building',
            link: '/pages/coops/capacity-building',
            enabled: true
          }
        ],
      },
      {
        title: 'Services',
        icon: 'lock-outline',
        enabled: true,
        home: false,
        children: [
          {
            title: 'service-cards',
            link: '/pages/cd-kiosk/product-cards',
            enabled: true
          },
          {
            title: 'service-list',
            link: '/pages/cd-kiosk/product-list',
            enabled: true
          },
          {
            title: 'service-info',
            link: '/pages/cd-kiosk/product-info',
            enabled: true
          },
          {
            title: 'service-manager',
            link: '/pages/cd-kiosk/product-manager',
            enabled: true
          },
          {
            title: 'wish-list',
            link: '/pages/cd-kiosk/wish-list',
            enabled: true
          },
          {
            title: 'orders',
            link: '/pages/cd-kiosk/orders',
            enabled: true
          },
          {
            title: 'online-payment',
            link: '/pages/cd-kiosk/online-payment',
            enabled: true
          }
        ],
      },
      {
        title: 'PMS',
        icon: 'lock-outline',
        enabled: true,
        home: false,
        children: [
          {
            title: 'dashboard',
            link: '/pages/pms/dashboard',
            enabled: true
          },
          {
            title: 'Gantt',
            link: '/pages/pms/gantt',
            enabled: true
          },
          {
            title: 'Projects',
            link: '/pages/pms/projects',
            enabled: true
          },
          {
            title: 'Scheduler',
            link: '/pages/pms/scheduler',
            enabled: true
          },
          {
            title: 'activity',
            link: '/pages/pms/activity',
            enabled: true
          }
        ],
      },
      {
        title: 'HRM',
        icon: 'lock-outline',
        enabled: true,
        home: false,
        children: [
          {
            title: 'dashboard',
            link: '/pages/hrm/dashboard',
            enabled: true
          },
          {
            title: 'Accts',
            link: '/pages/hrm/accts',
            enabled: true
          },
          {
            title: 'Capacity Building',
            link: '/pages/hrm/capacity-building',
            enabled: true
          },
          {
            title: 'Deduction',
            link: '/pages/hrm/deduction',
            enabled: true
          },
          {
            title: 'Designation',
            link: '/pages/hrm/designation',
            enabled: true
          },
          {
            title: 'Grade',
            link: '/pages/hrm/grade',
            enabled: true
          },
          {
            title: 'Organogram',
            link: '/pages/hrm/organogram',
            enabled: true
          },
          {
            title: 'Payments',
            link: '/pages/hrm/payments',
            enabled: true
          },
          {
            title: 'Recruit',
            link: '/pages/hrm/recruit',
            enabled: true
          },
          {
            title: 'Staff',
            link: '/pages/hrm/staff',
            enabled: true
          }
        ],
      },
      {
        title: 'Accts',
        icon: 'lock-outline',
        enabled: true,
        home: false,
        children: [
          {
            title: 'dashboard',
            link: '/pages/accts/dashboard',
            enabled: true
          },
          {
            title: 'Accounts',
            link: '/pages/accts/accounts',
            enabled: true
          },
          {
            title: 'Activity',
            link: '/pages/accts/activity',
            enabled: true
          },
          {
            title: 'Bank',
            link: '/pages/accts/bank',
            enabled: true
          },
          {
            title: 'Budget',
            link: '/pages/accts/budget',
            enabled: true
          },
          {
            title: 'COA',
            link: '/pages/accts/coa',
            enabled: true
          },
          {
            title: 'Currency',
            link: '/pages/accts/currency',
            enabled: true
          },
          {
            title: 'Deductions',
            link: '/pages/accts/deductions',
            enabled: true
          },
          {
            title: 'Delivery',
            link: '/pages/accts/delivery',
            enabled: true
          },
          {
            title: 'ExtInvoice',
            link: '/pages/accts/ext-invoice',
            enabled: true
          },
          {
            title: 'ExtQuote',
            link: '/pages/accts/ext-quote',
            enabled: true
          },
          {
            title: 'IntInvoice',
            link: '/pages/accts/int-invoice',
            enabled: true
          },
          {
            title: 'IntQuote',
            link: '/pages/accts/int-quote',
            enabled: true
          },
          {
            title: 'Grades',
            link: '/pages/accts/grades',
            enabled: true
          },
          {
            title: 'HRM',
            link: '/pages/accts/hrm',
            enabled: true
          },
          {
            title: 'Inventory',
            link: '/pages/accts/inventory',
            enabled: true
          },
          {
            title: 'Payment',
            link: '/pages/accts/payment',
            enabled: true
          },
          {
            title: 'Payroll',
            link: '/pages/accts/payroll',
            enabled: true
          },
          {
            title: 'Procurement',
            link: '/pages/accts/procurement',
            enabled: true
          },
          {
            title: 'Report',
            link: '/pages/accts/report',
            enabled: true
          },
          {
            title: 'Requisition',
            link: '/pages/accts/requisition',
            enabled: true
          },
          {
            title: 'Sale',
            link: '/pages/accts/sale',
            enabled: true
          },
          {
            title: 'Product',
            link: '/pages/accts/product',
            enabled: true
          },
          {
            title: 'Service',
            link: '/pages/accts/service',
            enabled: true
          },
          {
            title: 'Store',
            link: '/pages/accts/store',
            enabled: true
          },
          {
            title: 'Tax',
            link: '/pages/accts/tax',
            enabled: true
          },
          {
            title: 'Transact',
            link: '/pages/accts/transact',
            enabled: true
          }
        ],
      },
      {
        title: 'Pub',
        icon: 'lock-outline',
        enabled: true,
        home: false,
        children: [
          {
            title: 'dashboard',
            link: '/pages/cd-pub/dashboard',
            enabled: true
          }, {
            title: 'article',
            link: '/pages/cd-pub/article',
            enabled: true
          },
          {
            title: 'forms',
            link: '/pages/cd-pub/forms',
            enabled: true
          }
        ],
      },
      {
        title: 'NEB-TEMPLATES',
        group: true,
        enabled: false,
      },
      {
        title: 'E-commerce',
        icon: 'shopping-cart-outline',
        link: '/pages/dashboard',
        enabled: false,

      },
      {
        title: 'Layout',
        icon: 'layout-outline',
        enabled: false,
        children: [
          {
            title: 'Stepper',
            link: '/pages/layout/stepper',
            enabled: true
          },
          {
            title: 'List',
            link: '/pages/layout/list',
            enabled: true
          },
          {
            title: 'Infinite List',
            link: '/pages/layout/infinite-list',
            enabled: true
          },
          {
            title: 'Accordion',
            link: '/pages/layout/accordion',
            enabled: true
          },
          {
            title: 'Tabs',
            pathMatch: 'prefix',
            link: '/pages/layout/tabs',
            enabled: true
          },
        ],
      },
      {
        title: 'cd-Auth',
        icon: 'lock-outline',
        enabled: false,
        home: true,
        children: [
          {
            title: 'Login',
            link: '/pages/cd-auth/login',
            enabled: true
          },
          {
            title: 'Register',
            link: '/pages/cd-auth/register',
            enabled: true
          }
        ],
      },
      {
        title: 'Forms',
        icon: 'edit-2-outline',
        enabled: false,
        children: [
          {
            title: 'Form Inputs',
            link: '/pages/forms/inputs',
            enabled: true
          },
          {
            title: 'Form Layouts',
            link: '/pages/forms/layouts',
            enabled: true
          },
          {
            title: 'Buttons',
            link: '/pages/forms/buttons',
            enabled: true
          },
          {
            title: 'Datepicker',
            link: '/pages/forms/datepicker',
            enabled: true
          },
        ],
      },
      {
        title: 'UI Features',
        icon: 'keypad-outline',
        link: '/pages/ui-features',
        enabled: false,
        children: [
          {
            title: 'Grid',
            link: '/pages/ui-features/grid',
            enabled: true
          },
          {
            title: 'Icons',
            link: '/pages/ui-features/icons',
            enabled: true
          },
          {
            title: 'Typography',
            link: '/pages/ui-features/typography',
            enabled: true
          },
          {
            title: 'Animated Searches',
            link: '/pages/ui-features/search-fields',
            enabled: true
          },
        ],
      },
      {
        title: 'Modal & Overlays',
        icon: 'browser-outline',
        enabled: false,
        children: [
          {
            title: 'Dialog',
            link: '/pages/modal-overlays/dialog',
            enabled: true
          },
          {
            title: 'Window',
            link: '/pages/modal-overlays/window',
            enabled: true
          },
          {
            title: 'Popover',
            link: '/pages/modal-overlays/popover',
            enabled: true
          },
          {
            title: 'Toastr',
            link: '/pages/modal-overlays/toastr',
            enabled: true
          },
          {
            title: 'Tooltip',
            link: '/pages/modal-overlays/tooltip',
            enabled: true
          },
        ],
      },
      {
        title: 'Extra Components',
        icon: 'message-circle-outline',
        enabled: false,
        children: [
          {
            title: 'Calendar',
            link: '/pages/extra-components/calendar',
            enabled: true
          },
          {
            title: 'Progress Bar',
            link: '/pages/extra-components/progress-bar',
            enabled: true
          },
          {
            title: 'Spinner',
            link: '/pages/extra-components/spinner',
            enabled: true
          },
          {
            title: 'Alert',
            link: '/pages/extra-components/alert',
            enabled: true
          },
          {
            title: 'Calendar Kit',
            link: '/pages/extra-components/calendar-kit',
            enabled: true
          },
          {
            title: 'Chat',
            link: '/pages/extra-components/chat',
            enabled: true
          },
        ],
      },
      {
        title: 'Maps',
        icon: 'map-outline',
        enabled: false,
        children: [
          {
            title: 'Google Maps',
            link: '/pages/maps/gmaps',
            enabled: true
          },
          {
            title: 'Leaflet Maps',
            link: '/pages/maps/leaflet',
            enabled: true
          },
          {
            title: 'Bubble Maps',
            link: '/pages/maps/bubble',
            enabled: true
          },
          {
            title: 'Search Maps',
            link: '/pages/maps/searchmap',
            enabled: true
          },
        ],
      },
      {
        title: 'Charts',
        icon: 'pie-chart-outline',
        enabled: false,
        children: [
          {
            title: 'Echarts',
            link: '/pages/charts/echarts',
            enabled: true
          },
          {
            title: 'Charts.js',
            link: '/pages/charts/chartjs',
            enabled: true
          },
          {
            title: 'D3',
            link: '/pages/charts/d3',
            enabled: true
          },
        ],
      },
      {
        title: 'Editors',
        icon: 'text-outline',
        enabled: false,
        children: [
          {
            title: 'TinyMCE',
            link: '/pages/editors/tinymce',
            enabled: true
          },
          {
            title: 'CKEditor',
            link: '/pages/editors/ckeditor',
            enabled: true
          },
        ],
      },
      {
        title: 'Tables & Data',
        icon: 'grid-outline',
        enabled: false,
        children: [
          {
            title: 'Smart Table',
            link: '/pages/tables/smart-table',
            enabled: true
          },
          {
            title: 'Tree Grid',
            link: '/pages/tables/tree-grid',
            enabled: true
          },
        ],
      },
      {
        title: 'Miscellaneous',
        icon: 'shuffle-2-outline',
        enabled: false,
        children: [
          {
            title: '404',
            link: '/pages/miscellaneous/404',
            enabled: true
          },
        ],
      },
      {
        title: 'Auth',
        icon: 'lock-outline',
        enabled: false,
        children: [
          {
            title: 'Login',
            link: '/auth/login',
            enabled: true
          },
          {
            title: 'Register',
            link: '/auth/register',
            enabled: true
          },
          {
            title: 'Request Password',
            link: '/auth/request-password',
            enabled: true
          },
          {
            title: 'Reset Password',
            link: '/auth/reset-password',
            enabled: true
          },
        ],
      },
    ];
    this.processMenu(MENU_ITEMS);
  }

  processMenu(menuFeed: any){
    let filteredMenu = menuFeed.filter(m => m.enabled == true);
    filteredMenu.forEach(function(menu: ModuleMenu,i) {
      if('children' in menu){
        menu.children = menu.children.filter(sm => sm.enabled == true);
        filteredMenu[i].children = menu.children;
      } 
    });
    console.log('filteredMenu',filteredMenu);

    /**
     * set the menu as per guig mode setting
     */
    let activeMenu;
    let ctx = this.gc.getMode().name;
    switch (ctx) {
      case 'ngx-admin-original':
        activeMenu = MENU_ITEMS; //use original template menu by ngx-admin
        break;
      case 'ngx-admin-mod1':
        activeMenu = filteredMenu; // usc filterable menu
        break;
    }

    // console.log('activeMenu:', JSON.stringify(activeMenu));
    this.menu = activeMenu;
    // return this.menu;
  }

  workAreaIsClicked(){
    console.log('workAreaIsClicked()');
  }

}
