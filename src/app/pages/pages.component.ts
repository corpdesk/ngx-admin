import { Component, OnInit } from '@angular/core';
import { NbMenuItem } from '@nebular/theme';
import { GuigContextService } from '../@cd/guig/guig-context';

import { MENU_ITEMS } from './pages-menu';


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

  constructor(private gc: GuigContextService) {

  }

  ngOnInit() {
    const MENU_ITEMS: any = [
      {
        title: 'E-commerce',
        icon: 'shopping-cart-outline',
        link: '/pages/dashboard',
        enabled: true,

      },
      {
        title: 'IoT Dashboard',
        icon: 'home-outline',
        link: '/pages/iot-dashboard',
        enabled: false,
      },
      {
        title: 'FEATURES',
        group: true,
        enabled: true,
      },
      {
        title: 'Layout',
        icon: 'layout-outline',
        enabled: false,
        children: [
          {
            title: 'Stepper',
            link: '/pages/layout/stepper',
          },
          {
            title: 'List',
            link: '/pages/layout/list',
          },
          {
            title: 'Infinite List',
            link: '/pages/layout/infinite-list',
          },
          {
            title: 'Accordion',
            link: '/pages/layout/accordion',
          },
          {
            title: 'Tabs',
            pathMatch: 'prefix',
            link: '/pages/layout/tabs',
          },
        ],
      },
      {
        title: 'cd-Auth',
        icon: 'lock-outline',
        enabled: true,
        home: true,
        children: [
          {
            title: 'Login',
            link: '/pages/cd-auth/login',
          },
          {
            title: 'Register',
            link: '/pages/cd-auth/register',
          }
        ],
      },
      {
        title: 'Forms',
        icon: 'edit-2-outline',
        enabled: true,
        children: [
          {
            title: 'Form Inputs',
            link: '/pages/forms/inputs',
          },
          {
            title: 'Form Layouts',
            link: '/pages/forms/layouts',
          },
          {
            title: 'Buttons',
            link: '/pages/forms/buttons',
          },
          {
            title: 'Datepicker',
            link: '/pages/forms/datepicker',
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
          },
          {
            title: 'Icons',
            link: '/pages/ui-features/icons',
          },
          {
            title: 'Typography',
            link: '/pages/ui-features/typography',
          },
          {
            title: 'Animated Searches',
            link: '/pages/ui-features/search-fields',
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
          },
          {
            title: 'Window',
            link: '/pages/modal-overlays/window',
          },
          {
            title: 'Popover',
            link: '/pages/modal-overlays/popover',
          },
          {
            title: 'Toastr',
            link: '/pages/modal-overlays/toastr',
          },
          {
            title: 'Tooltip',
            link: '/pages/modal-overlays/tooltip',
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
          },
          {
            title: 'Progress Bar',
            link: '/pages/extra-components/progress-bar',
          },
          {
            title: 'Spinner',
            link: '/pages/extra-components/spinner',
          },
          {
            title: 'Alert',
            link: '/pages/extra-components/alert',
          },
          {
            title: 'Calendar Kit',
            link: '/pages/extra-components/calendar-kit',
          },
          {
            title: 'Chat',
            link: '/pages/extra-components/chat',
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
          },
          {
            title: 'Leaflet Maps',
            link: '/pages/maps/leaflet',
          },
          {
            title: 'Bubble Maps',
            link: '/pages/maps/bubble',
          },
          {
            title: 'Search Maps',
            link: '/pages/maps/searchmap',
          },
        ],
      },
      {
        title: 'Charts',
        icon: 'pie-chart-outline',
        enabled: true,
        children: [
          {
            title: 'Echarts',
            link: '/pages/charts/echarts',
          },
          {
            title: 'Charts.js',
            link: '/pages/charts/chartjs',
          },
          {
            title: 'D3',
            link: '/pages/charts/d3',
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
          },
          {
            title: 'CKEditor',
            link: '/pages/editors/ckeditor',
          },
        ],
      },
      {
        title: 'Tables & Data',
        icon: 'grid-outline',
        enabled: true,
        children: [
          {
            title: 'Smart Table',
            link: '/pages/tables/smart-table',
          },
          {
            title: 'Tree Grid',
            link: '/pages/tables/tree-grid',
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
          },
          {
            title: 'Register',
            link: '/auth/register',
          },
          {
            title: 'Request Password',
            link: '/auth/request-password',
          },
          {
            title: 'Reset Password',
            link: '/auth/reset-password',
          },
        ],
      },
    ];
    this.processMenu(MENU_ITEMS);
  }

  processMenu(menuFeed: any): NbMenuItem {

    let filteredMenu = menuFeed.filter(function (m, index) {
      /**
       * act on 'enabled' property only if it is available
       */
      if ('enabled' in m) {
        /**
         * do not return menus that are not enabled
         */
        if (m.enabled == false) {
          return false;
        }
      };

      /**
       * remove properties that are not compliant with nebular menu data
       * eg: 'enabled'
       */
      delete m.enabled;
      return true;
    });

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

    console.log('activeMenu:', JSON.stringify(activeMenu));
    this.menu = activeMenu;
    return this.menu;
  }

}
