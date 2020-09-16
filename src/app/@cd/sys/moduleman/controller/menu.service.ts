import { Injectable } from '@angular/core';

import { remapKeys } from 'curry-remap-keys';

import { ServerService } from './server.service';
import { SessService } from '../../user/controllers/sess.service';

interface CdMenu {
  title?: string;
  menu_id?: number;
  label?: string;
  icon?: string;
  menu_guid?: string;
  registered?: boolean;
  location?: string,
  menu_action_id?: number;
  doc_id?: number;
  menu_parent_id?: number;
  menuOrder?: number;
  path?: string;
  description?: string;
  module_id?: number;
  moduleTypeID?: number;
  module_guid?: string;
  module_name?: string;
  moduleName?: string;
  is_public?: boolean;
  is_sys_module?: number;
  children?: CdMenu[],
  menu_action?: {
    module?: string;
    controller?: string;
    action?: string;
    fields?: [],
    f_vals?: [],
    args?: string;
    menu_url?: null,
    privileged_groups?: string[]
  },
  cd_obj_id?: number;
  cd_obj_name?: string;
  last_sync_date?: null,
  cd_obj_disp_name?: null,
  cd_obj_guid?: string;
  cd_obj_type_guid?: string;
  last_modification_date?: null,
  parent_module_guid?: string;
  parent_class_guid?: null,
  parent_obj?: null,
  show_name?: null,
  obJicon?: null,
  show_icon?: null,
  curr_val?: null,
  enabled?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private postData;
  menuData = [];
  menuList = [];
  successNewMenu = false;
  menuConfigData;
  constructor(
    private svServer: ServerService,
    private svSess: SessService,
  ) { }

  /*
  invoked following svUser::getUserData() when all menu items are fetched
  */
  init(res: any) {
    this.setMenuData(res.data.menu_data);
  }

  setMenuData(menuData) {
    this.menuData = menuData;
  }

  // register menu
  registerMenu(data) {
    console.log(data);
    console.log(data.is_sys_module);
    data = this.cleanRegData(data);
    this.setEnvelopeRegMenu(data);
    /*
    post request to server
    */
    this.svServer.proc(this.postData)
      .subscribe((res: any) => {
        console.log(res);
        res.app_state.success = Number(res.app_state.success);
        if (res.app_state.success === 1) {
          this.successNewMenu = true;
        }
        this.setRespRegMenu(res.data);
      });
  }

  cleanRegData(data) {
    data.is_sys_module = Number(data.is_sys_module);
    if (data.is_sys_module === 1) {
      data.is_sys_module = true;
    } else {
      data.is_sys_module = false;
    }
    data.module_type_id = Number(data.module_type_id);
    return data;
  }

  // /**
  //  * {
  //         'ctx': 'Sys',
  //         'm': 'Moduleman',
  //         'c': 'MenuController',
  //         'a': 'actionCreate',
  //         'dat': {
  //             f_vals: [{
  //                 'cd_obj': {
  //                     cd_obj_name: 'reservation-component-menu-link',
  //                     cd_obj_type_guid: 'f5df4494-5cc9-4463-8e8e-c5861703280e',
  //                     parent_module_guid: 'a06f881e-41f1-45b9-87f4-8475fef7fcba'
  //                 },
  //                 'data': {
  //                     'menu_name': 'reservation',
  //                     'menu_closet_file': '',
  //                     menu_parent_id: '982',
  //                     module_id: '258',
  //                     'menu_order': '11',
  //                     path: 'reservation',
  //                     'menu_description': 'reservation',
  //                     'menu_lable': 'reservation',
  //                     'menu_icon': 'cog',
  //                     'active': true
  //                 }
  //             }],
  //             'token': 'mT6blaIfqWhzNXQLG8ksVbc1VodSxRZ8lu5cMgda'
  //         },
  //         args: null
  //     }
  //  */
  setEnvelopeRegMenu(regData) {
    this.postData = {
      ctx: 'Sys',
      m: 'Moduleman',
      c: 'MenuController',
      a: 'actionCreate',
      dat: {
        f_vals: [{
          cd_obj: regData.cd_obj,
          data: regData.data
        }],
        docproc: {},
        token: this.svSess.token
      },
      args: null
    };
  }

  setRespRegMenu(data) {
    console.log(data);
  }

  // register menu
  getGetAll() {
    this.setEnvelopeGetAll();
    /*
    post request to server
    */
    this.svServer.proc(this.postData)
      .subscribe((res: any) => {
        console.log(res);
        this.setRespGetAll(res.data);
      });
  }

  // /**
  //  * {
  //         'ctx': 'Sys',
  //         'm': 'Moduleman',
  //         'c': 'MenuController',
  //         'a': 'actionGetAll',
  //         'dat': {
  //             'token': 'C64AC158-80F7-5AA7-D3A6-240E399B1A0A'
  //         },
  //         args: null
  //     }
  //  */
  setEnvelopeGetAll() {
    this.postData = {
      ctx: 'Sys',
      m: 'Moduleman',
      c: 'MenuController',
      a: 'actionGetAll',
      dat: {
        token: this.svSess.token
      },
      args: null
    };
  }

  setRespGetAll(data) {
    console.log(data);
    this.menuList = data;
  }

  getMenuConfig() {
    console.log('starting MenuService::getMenuConfig()');
    this.setMenuConfigDataPost();
    this.svServer.proc(this.postData)
      .subscribe((res) => {
        console.log(res);
        this.setMenuConfigData(res);
      });

  }

  setMenuConfigDataPost() {
    console.log('starting MenuService::setMenuConfigDataPost()');
    this.postData = {
      ctx: 'Sys',
      m: 'Moduleman',
      c: 'MenuConfigController',
      a: 'actionGet',
      dat: {
        f_vals: [
          {
            data: {
              client_app_id: 2
            }
          }
        ],
        token: this.svSess.token
      },
      args: null
    }
  }

  setMenuConfigData(res) {
    console.log('starting MenuService::setMenuConfigData(res)');
    console.log(res);
    this.menuConfigData = res.data;
  }

  updateMenuConfig(updateData) {
    console.log('starting MenuService::updateMenuConfig()');
    console.log('updateData:', updateData);
    this.updateMenuConfigDataPost(updateData);
    this.svServer.proc(this.postData)
      .subscribe((res) => {
        console.log(res);
        this.respUpdateMenuConfig(res);
      });

  }

  /**
   * 
   * @param updateData: {
              alias: "menuOrderX",
              active: "0"
            }
   */
  updateMenuConfigDataPost(updateData) {
    console.log('starting MenuService::updateMenuConfigDataPost()');
    this.postData = {
      ctx: 'Sys',
      m: 'Moduleman',
      c: 'MenuConfigController',
      a: 'actionUpdate',
      dat: {
        f_vals: [
          {
            filter: [
              {
                field: 'menu_config_id',
                operator: '=',
                val: '129'
              }
            ],
            data: updateData
          }
        ],
        token: "mT6blaIfqWhzNXQLG8ksVbc1VodSxRZ8lu5cMgda"
      },
      args: null
    }
  }

  respUpdateMenuConfig(res) {
    console.log('starting MenuService::respUpdateMenuConfig(res)');
    console.log(res);
    this.getMenuConfig();
  }



  /**
   * 
   * @param cdMenu : cd-menu to remap
   * @param newMapping : remaping instructions
   */
  mapMenu(cdMenu: CdMenu[]) {
    let strCdMenu = JSON.stringify(cdMenu);
    strCdMenu = strCdMenu.replace(/"label":/g, '"title":');
    strCdMenu = strCdMenu.replace(/"path":/g, '"link":');
    // console.log('strCdMenu:', strCdMenu);
    const jCdMenu = JSON.parse(strCdMenu);
    console.log('jCdMenu:', jCdMenu);
    return jCdMenu;
  }

  testMapMenu() {
    const newMapping = {
      label: 'title',
      path: 'link'
    }
    return this.mapMenu(this.cdDemoMenu());
  }

  ngxMenuOrig() {
    return [
      {
        title: 'E-commerce',
        icon: 'shopping-cart-outline',
        link: '/pages/dashboard',
        home: true,
      },
      {
        title: 'IoT Dashboard',
        icon: 'home-outline',
        link: '/pages/iot-dashboard',
      },
      {
        title: 'FEATURES',
        group: true,
      },
      {
        title: 'Layout',
        icon: 'layout-outline',
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
        title: 'Forms',
        icon: 'edit-2-outline',
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
  }

  ngxMenu() {
    return [
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
        title: 'Moduleman',
        icon: 'lock-outline',
        enabled: true,
        home: false,
        children: [
          {
            title: 'dashboard',
            link: '/pages/moduleman/dashboard',
            enabled: true
          },
          {
            title: 'module',
            link: '/pages/moduleman/module',
            enabled: true
          },
          {
            title: 'menu',
            link: '/pages/moduleman/menu',
            enabled: true
          },
          {
            title: 'company',
            link: '/pages/moduleman/company',
            enabled: true
          },
          {
            title: 'consumer',
            link: '/pages/moduleman/consumer',
            enabled: true
          },
          {
            title: 'docproc',
            link: '/pages/moduleman/docproc',
            enabled: true
          },
          {
            title: 'observ',
            link: '/pages/moduleman/observ',
            enabled: true
          }
        ],
      },
      {
        title: 'NEB-TEMPLATES',
        group: true,
        enabled: true,
      },
      {
        title: 'E-commerce',
        icon: 'shopping-cart-outline',
        link: '/pages/dashboard',
        enabled: false,

      },
      {
        title: 'IoT Dashboard',
        icon: 'home-outline',
        link: '/pages/iot-dashboard',
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
        enabled: true,
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
        enabled: true,
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
        enabled: true,
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
        enabled: true,
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
        enabled: true,
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
        enabled: true,
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
        enabled: true,
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
        enabled: true,
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
        enabled: true,
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
        enabled: true,
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
  }

  /**
   *    title: 'Home',
        icon: 'lock-outline',
        enabled: true,
        link: '/pages/home/news-feed',
        home: true,
        children:
   */
  cdDemoMenu(): CdMenu[] {
    return [{
      menu_id: 995,
      label: 'Modman',
      icon: 'cog',
      menu_guid: '6A601316-7CB8-A46D-7CFC-20CC846A693B',
      registered: true,
      location: null,
      menu_action_id: 92291,
      doc_id: 9275,
      menu_parent_id: -1,
      menuOrder: 11,
      path: '.\/admin',
      description: 'modman',
      module_id: 99,
      moduleTypeID: 1,
      module_guid: '00e7c6a8-83e4-40e2-bd27-51fcff9ce63b',
      module_name: 'moduleman',
      moduleName: 'moduleman',
      is_public: null,
      is_sys_module: 1,
      children: [{
        menu_id: 996,
        label: 'dashboard',
        icon: 'cog',
        menu_guid: 'F5C7A5C2-0E52-00B1-0B13-5B9BE450172D',
        registered: true,
        location: null,
        menu_action_id: 92292,
        doc_id: 9283,
        menu_parent_id: 995,
        menuOrder: 11,
        path: 'admin\/admin-dashboard',
        description: 'dashboard',
        module_id: 99,
        moduleTypeID: 1,
        module_guid: '00e7c6a8-83e4-40e2-bd27-51fcff9ce63b',
        module_name: 'moduleman',
        moduleName: 'moduleman',
        is_public: null,
        is_sys_module: 1,
        children: [],
        menu_action: {
          module: 'moduleman',
          controller: '',
          action: 'dashboard-component-menu-link',
          fields: [],
          f_vals: [],
          args: 'guig',
          menu_url: null,
          privileged_groups: ['Everyone']
        },
        cd_obj_id: 92292,
        cd_obj_name: 'dashboard-component-menu-link',
        last_sync_date: null,
        cd_obj_disp_name: null,
        cd_obj_guid: '0A94308A-E7F8-79EE-444F-9E29F69C8C4C',
        cd_obj_type_guid: 'f5df4494-5cc9-4463-8e8e-c5861703280e',
        last_modification_date: null,
        parent_module_guid: '99',
        parent_class_guid: null,
        parent_obj: null,
        show_name: null,
        obJicon: null,
        show_icon: null,
        curr_val: null,
        enabled: null
      }, {
        menu_id: 997,
        label: 'cdobj',
        icon: 'cog',
        menu_guid: '6DE79D9E-5A02-2CC1-4A9C-4CF06089EE25',
        registered: true,
        location: null,
        menu_action_id: 92293,
        doc_id: 9285,
        menu_parent_id: 995,
        menuOrder: 11,
        path: 'admin\/cdobj',
        description: 'cdobj',
        module_id: 99,
        moduleTypeID: 1,
        module_guid: '00e7c6a8-83e4-40e2-bd27-51fcff9ce63b',
        module_name: 'moduleman',
        moduleName: 'moduleman',
        is_public: null,
        is_sys_module: 1,
        children: [],
        menu_action: {
          module: 'moduleman',
          controller: '',
          action: 'cdobj-component-menu-link',
          fields: [],
          f_vals: [],
          args: 'guig',
          menu_url: null,
          privileged_groups: ['Everyone']
        },
        cd_obj_id: 92293,
        cd_obj_name: 'cdobj-component-menu-link',
        last_sync_date: null,
        cd_obj_disp_name: null,
        cd_obj_guid: '097A3AA0-2B2D-333C-9421-06673B11F55C',
        cd_obj_type_guid: 'f5df4494-5cc9-4463-8e8e-c5861703280e',
        last_modification_date: null,
        parent_module_guid: '00e7c6a8-83e4-40e2-bd27-51fcff9ce63b',
        parent_class_guid: null,
        parent_obj: null,
        show_name: null,
        obJicon: null,
        show_icon: null,
        curr_val: null,
        enabled: null
      }, {
        menu_id: 998,
        label: 'company',
        icon: 'cog',
        menu_guid: '0C226A51-1681-254B-13D0-B8449722BE65',
        registered: true,
        location: null,
        menu_action_id: 92294,
        doc_id: 9287,
        menu_parent_id: 995,
        menuOrder: 11,
        path: 'admin\/company',
        description: 'company',
        module_id: 99,
        moduleTypeID: 1,
        module_guid: '00e7c6a8-83e4-40e2-bd27-51fcff9ce63b',
        module_name: 'moduleman',
        moduleName: 'moduleman',
        is_public: null,
        is_sys_module: 1,
        children: [],
        menu_action: {
          module: 'moduleman',
          controller: '',
          action: 'company-component-menu-link',
          fields: [],
          f_vals: [],
          args: 'guig',
          menu_url: null,
          privileged_groups: ['Everyone']
        },
        cd_obj_id: 92294,
        cd_obj_name: 'company-component-menu-link',
        last_sync_date: null,
        cd_obj_disp_name: null,
        cd_obj_guid: '9E655DAF-01B3-FE12-D3CC-0D9984DBA0D4',
        cd_obj_type_guid: 'f5df4494-5cc9-4463-8e8e-c5861703280e',
        last_modification_date: null,
        parent_module_guid: '00e7c6a8-83e4-40e2-bd27-51fcff9ce63b',
        parent_class_guid: null,
        parent_obj: null,
        show_name: null,
        obJicon: null,
        show_icon: null,
        curr_val: null,
        enabled: null
      }, {
        menu_id: 999,
        label: 'grus',
        icon: 'cog',
        menu_guid: '0E41514A-A230-91B9-CC6E-6BDF53184DA4',
        registered: true,
        location: null,
        menu_action_id: 92295,
        doc_id: 9289,
        menu_parent_id: 995,
        menuOrder: 11,
        path: 'admin\/grus',
        description: 'grus',
        module_id: 99,
        moduleTypeID: 1,
        module_guid: '00e7c6a8-83e4-40e2-bd27-51fcff9ce63b',
        module_name: 'moduleman',
        moduleName: 'moduleman',
        is_public: null,
        is_sys_module: 1,
        children: [],
        menu_action: {
          module: 'moduleman',
          controller: '',
          action: 'grus-component-menu-link',
          fields: [],
          f_vals: [],
          args: 'guig',
          menu_url: null,
          privileged_groups: ['Everyone']
        },
        cd_obj_id: 92295,
        cd_obj_name: 'grus-component-menu-link',
        last_sync_date: null,
        cd_obj_disp_name: null,
        cd_obj_guid: 'DE910F11-3F01-25CC-6DCE-8272EE37B9B8',
        cd_obj_type_guid: 'f5df4494-5cc9-4463-8e8e-c5861703280e',
        last_modification_date: null,
        parent_module_guid: '00e7c6a8-83e4-40e2-bd27-51fcff9ce63b',
        parent_class_guid: null,
        parent_obj: null,
        show_name: null,
        obJicon: null,
        show_icon: null,
        curr_val: null,
        enabled: null
      }, {
        menu_id: 1000,
        label: 'menu',
        icon: 'cog',
        menu_guid: '6B8D7ED1-6328-43FC-7AA5-A66F38A445CD',
        registered: true,
        location: null,
        menu_action_id: 92296,
        doc_id: 9291,
        menu_parent_id: 995,
        menuOrder: 11,
        path: 'admin\/menu',
        description: 'menu',
        module_id: 99,
        moduleTypeID: 1,
        module_guid: '00e7c6a8-83e4-40e2-bd27-51fcff9ce63b',
        module_name: 'moduleman',
        moduleName: 'moduleman',
        is_public: null,
        is_sys_module: 1,
        children: [],
        menu_action: {
          module: 'moduleman',
          controller: '',
          action: 'menu-component-menu-link',
          fields: [],
          f_vals: [],
          args: 'guig',
          menu_url: null,
          privileged_groups: ['Everyone']
        },
        cd_obj_id: 92296,
        cd_obj_name: 'menu-component-menu-link',
        last_sync_date: null,
        cd_obj_disp_name: null,
        cd_obj_guid: '7EB3CDFA-A230-9CE0-41BD-12D82DF0AE8F',
        cd_obj_type_guid: 'f5df4494-5cc9-4463-8e8e-c5861703280e',
        last_modification_date: null,
        parent_module_guid: '00e7c6a8-83e4-40e2-bd27-51fcff9ce63b',
        parent_class_guid: null,
        parent_obj: null,
        show_name: null,
        obJicon: null,
        show_icon: null,
        curr_val: null,
        enabled: null
      }, {
        menu_id: 1001,
        label: 'modman',
        icon: 'cog',
        menu_guid: 'B3C501DF-4E44-0D29-8494-98172A8F9990',
        registered: true,
        location: null,
        menu_action_id: 92297,
        doc_id: 9293,
        menu_parent_id: 995,
        menuOrder: 11,
        path: 'admin\/modman',
        description: 'modman',
        module_id: 99,
        moduleTypeID: 1,
        module_guid: '00e7c6a8-83e4-40e2-bd27-51fcff9ce63b',
        module_name: 'moduleman',
        moduleName: 'moduleman',
        is_public: null,
        is_sys_module: 1,
        children: [],
        menu_action: {
          module: 'moduleman',
          controller: '',
          action: 'modman-component-menu-link',
          fields: [],
          f_vals: [],
          args: 'guig',
          menu_url: null,
          privileged_groups: ['Everyone']
        },
        cd_obj_id: 92297,
        cd_obj_name: 'modman-component-menu-link',
        last_sync_date: null,
        cd_obj_disp_name: null,
        cd_obj_guid: '055A4A36-E427-E49E-7AB4-36D8E4FEE7C1',
        cd_obj_type_guid: 'f5df4494-5cc9-4463-8e8e-c5861703280e',
        last_modification_date: null,
        parent_module_guid: '00e7c6a8-83e4-40e2-bd27-51fcff9ce63b',
        parent_class_guid: null,
        parent_obj: null,
        show_name: null,
        obJicon: null,
        show_icon: null,
        curr_val: null,
        enabled: null
      }],
      menu_action: {
        module: 'moduleman',
        controller: '',
        action: 'admin-module-menu-link',
        fields: [],
        f_vals: [],
        args: 'guig',
        menu_url: null,
        privileged_groups: ['Everyone']
      },
      cd_obj_id: 92291,
      cd_obj_name: 'admin-module-menu-link',
      last_sync_date: null,
      cd_obj_disp_name: null,
      cd_obj_guid: 'B4A0AFFE-FF84-27FF-9997-96C82E70A0CA',
      cd_obj_type_guid: 'f5df4494-5cc9-4463-8e8e-c5861703280e',
      last_modification_date: null,
      parent_module_guid: '00e7c6a8-83e4-40e2-bd27-51fcff9ce63b',
      parent_class_guid: null,
      parent_obj: null,
      show_name: null,
      obJicon: null,
      show_icon: null,
      curr_val: null,
      enabled: null
    }, {
      menu_id: 991,
      label: 'booking',
      icon: 'cog',
      menu_guid: 'F5789D47-94F5-195E-8F82-CBA164784BCC',
      registered: true,
      location: null,
      menu_action_id: 92287,
      doc_id: 9185,
      menu_parent_id: -1,
      menuOrder: 11,
      path: 'booking',
      description: 'booking',
      module_id: 275,
      moduleTypeID: 1,
      module_guid: '8D4ED6A9-398D-32FE-7503-740C097E4F1F',
      module_name: 'booking',
      moduleName: 'booking',
      is_public: null,
      is_sys_module: 0,
      children: [{
        menu_id: 992,
        label: 'index',
        icon: 'cog',
        menu_guid: '33B18F50-310F-4614-28C5-B5C05A5AB927',
        registered: true,
        location: null,
        menu_action_id: 92288,
        doc_id: 9187,
        menu_parent_id: 991,
        menuOrder: 11,
        path: 'index',
        description: 'index',
        module_id: 275,
        moduleTypeID: 1,
        module_guid: '8D4ED6A9-398D-32FE-7503-740C097E4F1F',
        module_name: 'booking',
        moduleName: 'booking',
        is_public: null,
        is_sys_module: 0,
        children: [],
        menu_action: {
          module: 'booking',
          controller: '',
          action: 'index-component-menu-link',
          fields: [],
          f_vals: [],
          args: 'guig',
          menu_url: null,
          privileged_groups: ['Everyone']
        },
        cd_obj_id: 92288,
        cd_obj_name: 'index-component-menu-link',
        last_sync_date: null,
        cd_obj_disp_name: null,
        cd_obj_guid: '4A0BBC78-6CDE-1F09-D360-E139D5B702C0',
        cd_obj_type_guid: 'f5df4494-5cc9-4463-8e8e-c5861703280e',
        last_modification_date: null,
        parent_module_guid: '8D4ED6A9-398D-32FE-7503-740C097E4F1F',
        parent_class_guid: null,
        parent_obj: null,
        show_name: null,
        obJicon: null,
        show_icon: null,
        curr_val: null,
        enabled: null
      }],
      menu_action: {
        module: 'booking',
        controller: '',
        action: 'booking-module-menu-link',
        fields: [],
        f_vals: [],
        args: 'guig',
        menu_url: null,
        privileged_groups: ['Everyone']
      },
      cd_obj_id: 92287,
      cd_obj_name: 'booking-module-menu-link',
      last_sync_date: null,
      cd_obj_disp_name: null,
      cd_obj_guid: '27931E3E-6A3D-18F0-9540-2EFDA0D0C4E0',
      cd_obj_type_guid: 'f5df4494-5cc9-4463-8e8e-c5861703280e',
      last_modification_date: null,
      parent_module_guid: '8D4ED6A9-398D-32FE-7503-740C097E4F1F',
      parent_class_guid: null,
      parent_obj: null,
      show_name: null,
      obJicon: null,
      show_icon: null,
      curr_val: null,
      enabled: null
    }, {
      menu_id: 993,
      label: 'coop',
      icon: 'cog',
      menu_guid: '959C4DC6-7EBB-BF94-6B70-B28182EECAF5',
      registered: true,
      location: null,
      menu_action_id: 92289,
      doc_id: 9202,
      menu_parent_id: -1,
      menuOrder: 11,
      path: 'coop',
      description: 'coop',
      module_id: 276,
      moduleTypeID: 1,
      module_guid: 'B4A1F6D0-B556-A5F4-7EEB-E51AC99D80EC',
      module_name: 'Coop',
      moduleName: 'Coop',
      is_public: null,
      is_sys_module: 0,
      children: [{
        menu_id: 1002,
        label: 'index',
        icon: 'cog',
        menu_guid: 'FABE8861-C9E5-8487-DA7D-657A6CDA2390',
        registered: true,
        location: null,
        menu_action_id: 92298,
        doc_id: 9297,
        menu_parent_id: 993,
        menuOrder: 11,
        path: 'index',
        description: 'index',
        module_id: 276,
        moduleTypeID: 1,
        module_guid: 'B4A1F6D0-B556-A5F4-7EEB-E51AC99D80EC',
        module_name: 'Coop',
        moduleName: 'Coop',
        is_public: null,
        is_sys_module: 0,
        children: [],
        menu_action: {
          module: 'Coop',
          controller: '',
          action: 'index-component-menu-link',
          fields: [],
          f_vals: [],
          args: 'guig',
          menu_url: null,
          privileged_groups: ['Everyone']
        },
        cd_obj_id: 92298,
        cd_obj_name: 'index-component-menu-link',
        last_sync_date: null,
        cd_obj_disp_name: null,
        cd_obj_guid: '7AF47D0A-DADC-4402-505A-B5C9D37722C2',
        cd_obj_type_guid: 'f5df4494-5cc9-4463-8e8e-c5861703280e',
        last_modification_date: null,
        parent_module_guid: 'B4A1F6D0-B556-A5F4-7EEB-E51AC99D80EC',
        parent_class_guid: null,
        parent_obj: null,
        show_name: null,
        obJicon: null,
        show_icon: null,
        curr_val: null,
        enabled: null
      }],
      menu_action: {
        module: 'Coop',
        controller: '',
        action: 'coop-module-menu-link',
        fields: [],
        f_vals: [],
        args: 'guig',
        menu_url: null,
        privileged_groups: ['Everyone']
      },
      cd_obj_id: 92289,
      cd_obj_name: 'coop-module-menu-link',
      last_sync_date: null,
      cd_obj_disp_name: null,
      cd_obj_guid: '58EEB9AF-6910-71DB-B784-A50A150205E5',
      cd_obj_type_guid: 'f5df4494-5cc9-4463-8e8e-c5861703280e',
      last_modification_date: null,
      parent_module_guid: '-1',
      parent_class_guid: null,
      parent_obj: null,
      show_name: null,
      obJicon: null,
      show_icon: null,
      curr_val: null,
      enabled: null
    }];
  }

  cdDemoMenu2(): CdMenu[] {
    return [
      {
        title: 'Home',
        icon: 'lock-outline',
        enabled: true,
        path: '/pages/home/news-feed',
        children: [
          {
            label: 'News',
            path: '/pages/home/news-feed',
            enabled: true
          },
          {
            label: 'about',
            path: '/pages/home/about',
            enabled: true
          },
          {
            label: 'Events',
            path: '/pages/home/events',
            enabled: false
          },
          {
            label: 'Products',
            path: '/pages/home/products',
            enabled: false
          },
          {
            label: 'Resources',
            path: '/pages/home/resources',
            enabled: false
          },
          {
            label: 'Services',
            path: '/pages/home/services',
            enabled: false
          }
        ],
      },
      {
        label: 'My Space',
        icon: 'lock-outline',
        enabled: true,
        children: [
          {
            label: 'dashboard',
            path: '/pages/my-account/dashboard',
            enabled: true
          },
          {
            label: 'inteRact',
            path: '/pages/my-account/inte-ract',
            enabled: true
          },
          {
            label: 'Personal Info',
            path: '/pages/my-account/personal-data',
            enabled: true
          },
          {
            label: 'Activity',
            path: '/pages/my-account/activity',
            enabled: true
          },
          {
            label: 'Calendar',
            path: '/pages/my-account/calendar',
            enabled: false
          },
          {
            label: 'Planner',
            path: '/pages/my-account/planner',
            enabled: true
          },
          {
            label: 'Memo',
            path: '/pages/my-account/cd-memo',
            enabled: false
          },
          {
            label: 'InTray',
            path: '/pages/my-account/in-tray',
            enabled: false
          },
          {
            label: 'ReadDoc',
            path: '/pages/my-account/read-doc',
            enabled: false
          },
          {
            label: 'ComposeDoc',
            path: '/pages/my-account/compose-doc',
            enabled: false
          },
          {
            label: 'DocTray',
            path: '/pages/my-account/doc-tray',
            enabled: true
          },
          {
            label: 'Contacts',
            path: '/pages/my-account/contacts',
            enabled: false
          }
        ],
      },
      {
        label: 'IoT Dashboard',
        icon: 'home-outline',
        path: '/pages/iot-dashboard',
        enabled: false,
      },
      {
        label: 'CD-APPS',
        enabled: true,
      },
      {
        label: 'Coops',
        icon: 'lock-outline',
        enabled: false,
        children: [
          {
            label: 'home',
            path: '/pages/coops/home',
            enabled: true
          },
          {
            label: 'compliance',
            path: '/pages/coops/compliance',
            enabled: true
          },
          {
            label: 'events',
            path: '/pages/coops/events',
            enabled: true
          },
          {
            label: 'forums',
            path: '/pages/coops/forums',
            enabled: true
          },
          {
            label: 'capacity-building',
            path: '/pages/coops/capacity-building',
            enabled: true
          }
        ],
      },
      {
        label: 'Services',
        icon: 'lock-outline',
        enabled: true,
        children: [
          {
            label: 'service-cards',
            path: '/pages/cd-kiosk/product-cards',
            enabled: true
          },
          {
            label: 'service-list',
            path: '/pages/cd-kiosk/product-list',
            enabled: true
          },
          {
            label: 'service-info',
            path: '/pages/cd-kiosk/product-info',
            enabled: true
          },
          {
            label: 'service-manager',
            path: '/pages/cd-kiosk/product-manager',
            enabled: true
          },
          {
            label: 'wish-list',
            path: '/pages/cd-kiosk/wish-list',
            enabled: true
          },
          {
            label: 'orders',
            path: '/pages/cd-kiosk/orders',
            enabled: true
          },
          {
            label: 'online-payment',
            path: '/pages/cd-kiosk/online-payment',
            enabled: true
          }
        ],
      },
      {
        label: 'PMS',
        icon: 'lock-outline',
        enabled: true,
        children: [
          {
            label: 'dashboard',
            path: '/pages/pms/dashboard',
            enabled: true
          },
          {
            label: 'Gantt',
            path: '/pages/pms/gantt',
            enabled: true
          },
          {
            label: 'Projects',
            path: '/pages/pms/projects',
            enabled: true
          },
          {
            label: 'Scheduler',
            path: '/pages/pms/scheduler',
            enabled: true
          },
          {
            label: 'activity',
            path: '/pages/pms/activity',
            enabled: true
          }
        ],
      },
      {
        label: 'HRM',
        icon: 'lock-outline',
        enabled: true,
        children: [
          {
            label: 'dashboard',
            path: '/pages/hrm/dashboard',
            enabled: true
          },
          {
            label: 'Accts',
            path: '/pages/hrm/accts',
            enabled: true
          },
          {
            label: 'Capacity Building',
            path: '/pages/hrm/capacity-building',
            enabled: true
          },
          {
            label: 'Deduction',
            path: '/pages/hrm/deduction',
            enabled: true
          },
          {
            label: 'Designation',
            path: '/pages/hrm/designation',
            enabled: true
          },
          {
            label: 'Grade',
            path: '/pages/hrm/grade',
            enabled: true
          },
          {
            label: 'Organogram',
            path: '/pages/hrm/organogram',
            enabled: true
          },
          {
            label: 'Payments',
            path: '/pages/hrm/payments',
            enabled: true
          },
          {
            label: 'Recruit',
            path: '/pages/hrm/recruit',
            enabled: true
          },
          {
            label: 'Staff',
            path: '/pages/hrm/staff',
            enabled: true
          }
        ],
      },
      {
        label: 'Accts',
        icon: 'lock-outline',
        enabled: true,
        children: [
          {
            label: 'dashboard',
            path: '/pages/accts/dashboard',
            enabled: true
          },
          {
            label: 'Accounts',
            path: '/pages/accts/accounts',
            enabled: true
          },
          {
            label: 'Activity',
            path: '/pages/accts/activity',
            enabled: true
          },
          {
            label: 'Bank',
            path: '/pages/accts/bank',
            enabled: true
          },
          {
            label: 'Budget',
            path: '/pages/accts/budget',
            enabled: true
          },
          {
            label: 'COA',
            path: '/pages/accts/coa',
            enabled: true
          },
          {
            label: 'Currency',
            path: '/pages/accts/currency',
            enabled: true
          },
          {
            label: 'Deductions',
            path: '/pages/accts/deductions',
            enabled: true
          },
          {
            label: 'Delivery',
            path: '/pages/accts/delivery',
            enabled: true
          },
          {
            label: 'ExtInvoice',
            path: '/pages/accts/ext-invoice',
            enabled: true
          },
          {
            label: 'ExtQuote',
            path: '/pages/accts/ext-quote',
            enabled: true
          },
          {
            label: 'IntInvoice',
            path: '/pages/accts/int-invoice',
            enabled: true
          },
          {
            label: 'IntQuote',
            path: '/pages/accts/int-quote',
            enabled: true
          },
          {
            label: 'Grades',
            path: '/pages/accts/grades',
            enabled: true
          },
          {
            label: 'HRM',
            path: '/pages/accts/hrm',
            enabled: true
          },
          {
            label: 'Inventory',
            path: '/pages/accts/inventory',
            enabled: true
          },
          {
            label: 'Payment',
            path: '/pages/accts/payment',
            enabled: true
          },
          {
            label: 'Payroll',
            path: '/pages/accts/payroll',
            enabled: true
          },
          {
            label: 'Procurement',
            path: '/pages/accts/procurement',
            enabled: true
          },
          {
            label: 'Report',
            path: '/pages/accts/report',
            enabled: true
          },
          {
            label: 'Requisition',
            path: '/pages/accts/requisition',
            enabled: true
          },
          {
            label: 'Sale',
            path: '/pages/accts/sale',
            enabled: true
          },
          {
            label: 'Product',
            path: '/pages/accts/product',
            enabled: true
          },
          {
            label: 'Service',
            path: '/pages/accts/service',
            enabled: true
          },
          {
            label: 'Store',
            path: '/pages/accts/store',
            enabled: true
          },
          {
            label: 'Tax',
            path: '/pages/accts/tax',
            enabled: true
          },
          {
            label: 'Transact',
            path: '/pages/accts/transact',
            enabled: true
          }
        ],
      },
      {
        label: 'Pub',
        icon: 'lock-outline',
        enabled: true,
        children: [
          {
            label: 'dashboard',
            path: '/pages/cd-pub/dashboard',
            enabled: true
          }, {
            label: 'article',
            path: '/pages/cd-pub/article',
            enabled: true
          },
          {
            label: 'forms',
            path: '/pages/cd-pub/forms',
            enabled: true
          }
        ],
      },
      {
        label: 'NEB-TEMPLATES',
        enabled: false,
      },
      {
        label: 'E-commerce',
        icon: 'shopping-cart-outline',
        path: '/pages/dashboard',
        enabled: false,

      },
      {
        label: 'Layout',
        icon: 'layout-outline',
        enabled: false,
        children: [
          {
            label: 'Stepper',
            path: '/pages/layout/stepper',
            enabled: true
          },
          {
            label: 'List',
            path: '/pages/layout/list',
            enabled: true
          },
          {
            label: 'Infinite List',
            path: '/pages/layout/infinite-list',
            enabled: true
          },
          {
            label: 'Accordion',
            path: '/pages/layout/accordion',
            enabled: true
          },
          {
            label: 'Tabs',
            path: '/pages/layout/tabs',
            enabled: true
          },
        ],
      },
      {
        label: 'cd-Auth',
        icon: 'lock-outline',
        enabled: false,
        children: [
          {
            label: 'Login',
            path: '/pages/cd-auth/login',
            enabled: true
          },
          {
            label: 'Register',
            path: '/pages/cd-auth/register',
            enabled: true
          }
        ],
      },
      {
        label: 'Forms',
        icon: 'edit-2-outline',
        enabled: false,
        children: [
          {
            label: 'Form Inputs',
            path: '/pages/forms/inputs',
            enabled: true
          },
          {
            label: 'Form Layouts',
            path: '/pages/forms/layouts',
            enabled: true
          },
          {
            label: 'Buttons',
            path: '/pages/forms/buttons',
            enabled: true
          },
          {
            label: 'Datepicker',
            path: '/pages/forms/datepicker',
            enabled: true
          },
        ],
      },
      {
        label: 'UI Features',
        icon: 'keypad-outline',
        path: '/pages/ui-features',
        enabled: false,
        children: [
          {
            label: 'Grid',
            path: '/pages/ui-features/grid',
            enabled: true
          },
          {
            label: 'Icons',
            path: '/pages/ui-features/icons',
            enabled: true
          },
          {
            label: 'Typography',
            path: '/pages/ui-features/typography',
            enabled: true
          },
          {
            label: 'Animated Searches',
            path: '/pages/ui-features/search-fields',
            enabled: true
          },
        ],
      },
      {
        label: 'Modal & Overlays',
        icon: 'browser-outline',
        enabled: false,
        children: [
          {
            label: 'Dialog',
            path: '/pages/modal-overlays/dialog',
            enabled: true
          },
          {
            label: 'Window',
            path: '/pages/modal-overlays/window',
            enabled: true
          },
          {
            label: 'Popover',
            path: '/pages/modal-overlays/popover',
            enabled: true
          },
          {
            label: 'Toastr',
            path: '/pages/modal-overlays/toastr',
            enabled: true
          },
          {
            label: 'Tooltip',
            path: '/pages/modal-overlays/tooltip',
            enabled: true
          },
        ],
      },
      {
        label: 'Extra Components',
        icon: 'message-circle-outline',
        enabled: false,
        children: [
          {
            label: 'Calendar',
            path: '/pages/extra-components/calendar',
            enabled: true
          },
          {
            label: 'Progress Bar',
            path: '/pages/extra-components/progress-bar',
            enabled: true
          },
          {
            label: 'Spinner',
            path: '/pages/extra-components/spinner',
            enabled: true
          },
          {
            label: 'Alert',
            path: '/pages/extra-components/alert',
            enabled: true
          },
          {
            label: 'Calendar Kit',
            path: '/pages/extra-components/calendar-kit',
            enabled: true
          },
          {
            label: 'Chat',
            path: '/pages/extra-components/chat',
            enabled: true
          },
        ],
      },
      {
        label: 'Maps',
        icon: 'map-outline',
        enabled: false,
        children: [
          {
            label: 'Google Maps',
            path: '/pages/maps/gmaps',
            enabled: true
          },
          {
            label: 'Leaflet Maps',
            path: '/pages/maps/leaflet',
            enabled: true
          },
          {
            label: 'Bubble Maps',
            path: '/pages/maps/bubble',
            enabled: true
          },
          {
            label: 'Search Maps',
            path: '/pages/maps/searchmap',
            enabled: true
          },
        ],
      },
      {
        label: 'Charts',
        icon: 'pie-chart-outline',
        enabled: false,
        children: [
          {
            label: 'Echarts',
            path: '/pages/charts/echarts',
            enabled: true
          },
          {
            label: 'Charts.js',
            path: '/pages/charts/chartjs',
            enabled: true
          },
          {
            label: 'D3',
            path: '/pages/charts/d3',
            enabled: true
          },
        ],
      },
      {
        label: 'Editors',
        icon: 'text-outline',
        enabled: false,
        children: [
          {
            label: 'TinyMCE',
            path: '/pages/editors/tinymce',
            enabled: true
          },
          {
            label: 'CKEditor',
            path: '/pages/editors/ckeditor',
            enabled: true
          },
        ],
      },
      {
        label: 'Tables & Data',
        icon: 'grid-outline',
        enabled: false,
        children: [
          {
            label: 'Smart Table',
            path: '/pages/tables/smart-table',
            enabled: true
          },
          {
            label: 'Tree Grid',
            path: '/pages/tables/tree-grid',
            enabled: true
          },
        ],
      },
      {
        label: 'Miscellaneous',
        icon: 'shuffle-2-outline',
        enabled: false,
        children: [
          {
            label: '404',
            path: '/pages/miscellaneous/404',
            enabled: true
          },
        ],
      },
      {
        label: 'Auth',
        icon: 'lock-outline',
        enabled: false,
        children: [
          {
            label: 'Login',
            path: '/auth/login',
            enabled: true
          },
          {
            label: 'Register',
            path: '/auth/register',
            enabled: true
          },
          {
            label: 'Request Password',
            path: '/auth/request-password',
            enabled: true
          },
          {
            label: 'Reset Password',
            path: '/auth/reset-password',
            enabled: true
          },
        ],
      },
    ];
  }

  menuConfig() {
    return [{
      id: 1,
      fieldName: 'Mark',
      alias: 'Otto',
      table: '@mdo',
      isCustom: 'mdo@gmail.com',
      active: true,
    }, {
      id: 2,
      fieldName: 'Jacob',
      alias: 'Thornton',
      table: '@fat',
      isCustom: 'fat@yandex.ru',
      active: 'Yes',
    }, {
      id: 3,
      fieldName: 'Larry',
      alias: 'Bird',
      table: '@twitter',
      isCustom: 'twitter@outlook.com',
      active: 'Yes',
    }, {
      id: 4,
      fieldName: 'John',
      alias: 'Snow',
      table: '@snow',
      isCustom: 'snow@gmail.com',
      active: 'Yes',
    }, {
      id: 5,
      fieldName: 'Jack',
      alias: 'Sparrow',
      table: '@jack',
      isCustom: 'jack@yandex.ru',
      active: 'Yes',
    }, {
      id: 6,
      fieldName: 'Ann',
      alias: 'Smith',
      table: '@ann',
      isCustom: 'ann@gmail.com',
      active: 'Yes',
    }, {
      id: 7,
      fieldName: 'Barbara',
      alias: 'Black',
      table: '@barbara',
      isCustom: 'barbara@yandex.ru',
      active: 'Yes',
    }, {
      id: 8,
      fieldName: 'Sevan',
      alias: 'Bagrat',
      table: '@sevan',
      isCustom: 'sevan@outlook.com',
      active: 'Yes',
    }, {
      id: 9,
      fieldName: 'Ruben',
      alias: 'Vardan',
      table: '@ruben',
      isCustom: 'ruben@gmail.com',
      active: 'Yes',
    }, {
      id: 10,
      fieldName: 'Karen',
      alias: 'Sevan',
      table: '@karen',
      isCustom: 'karen@yandex.ru',
      active: 'Yes',
    }, {
      id: 11,
      fieldName: 'Mark',
      alias: 'Otto',
      table: '@mark',
      isCustom: 'mark@gmail.com',
      active: 'Yes',
    }, {
      id: 12,
      fieldName: 'Jacob',
      alias: 'Thornton',
      table: '@jacob',
      isCustom: 'jacob@yandex.ru',
      active: 'Yes',
    }, {
      id: 13,
      fieldName: 'Haik',
      alias: 'Hakob',
      table: '@haik',
      isCustom: 'haik@outlook.com',
      active: 'Yes',
    }, {
      id: 14,
      fieldName: 'Garegin',
      alias: 'Jirair',
      table: '@garegin',
      isCustom: 'garegin@gmail.com',
      active: 'Yes',
    }, {
      id: 15,
      fieldName: 'Krikor',
      alias: 'Bedros',
      table: '@krikor',
      isCustom: 'krikor@yandex.ru',
      active: 'Yes',
    }, {
      id: 16,
      fieldName: 'Francisca',
      alias: 'Brady',
      table: '@Gibson',
      isCustom: 'franciscagibson@comtours.com',
      active: 'Yes',
    }, {
      id: 17,
      fieldName: 'Tillman',
      alias: 'Figueroa',
      table: '@Snow',
      isCustom: 'tillmansnow@comtours.com',
      active: 'Yes',
    }, {
      id: 18,
      fieldName: 'Jimenez',
      alias: 'Morris',
      table: '@Bryant',
      isCustom: 'jimenezbryant@comtours.com',
      active: 'Yes',
    }, {
      id: 19,
      fieldName: 'Sandoval',
      alias: 'Jacobson',
      table: '@Mcbride',
      isCustom: 'sandovalmcbride@comtours.com',
      active: 'Yes',
    }, {
      id: 20,
      fieldName: 'Griffin',
      alias: 'Torres',
      table: '@Charles',
      isCustom: 'griffincharles@comtours.com',
      active: 'Yes',
    }, {
      id: 21,
      fieldName: 'Cora',
      alias: 'Parker',
      table: '@Caldwell',
      isCustom: 'coracaldwell@comtours.com',
      active: 'Yes',
    }, {
      id: 22,
      fieldName: 'Cindy',
      alias: 'Bond',
      table: '@Velez',
      isCustom: 'cindyvelez@comtours.com',
      active: 'Yes',
    }, {
      id: 23,
      fieldName: 'Frieda',
      alias: 'Tyson',
      table: '@Craig',
      isCustom: 'friedacraig@comtours.com',
      active: 'Yes',
    }, {
      id: 24,
      fieldName: 'Cote',
      alias: 'Holcomb',
      table: '@Rowe',
      isCustom: 'coterowe@comtours.com',
      active: 'Yes',
    }, {
      id: 25,
      fieldName: 'Trujillo',
      alias: 'Mejia',
      table: '@Valenzuela',
      isCustom: 'trujillovalenzuela@comtours.com',
      active: 'Yes',
    }, {
      id: 26,
      fieldName: 'Pruitt',
      alias: 'Shepard',
      table: '@Sloan',
      isCustom: 'pruittsloan@comtours.com',
      active: 'Yes',
    }, {
      id: 27,
      fieldName: 'Sutton',
      alias: 'Ortega',
      table: '@Black',
      isCustom: 'suttonblack@comtours.com',
      active: 'Yes',
    }, {
      id: 28,
      fieldName: 'Marion',
      alias: 'Heath',
      table: '@Espinoza',
      isCustom: 'marionespinoza@comtours.com',
      active: 'Yes',
    }, {
      id: 29,
      fieldName: 'Newman',
      alias: 'Hicks',
      table: '@Keith',
      isCustom: 'newmankeith@comtours.com',
      active: 'Yes',
    }, {
      id: 30,
      fieldName: 'Boyle',
      alias: 'Larson',
      table: '@Summers',
      isCustom: 'boylesummers@comtours.com',
      active: 'Yes',
    }, {
      id: 31,
      fieldName: 'Haynes',
      alias: 'Vinson',
      table: '@Mckenzie',
      isCustom: 'haynesmckenzie@comtours.com',
      active: 'Yes',
    }, {
      id: 32,
      fieldName: 'Miller',
      alias: 'Acosta',
      table: '@Young',
      isCustom: 'milleryoung@comtours.com',
      active: 'Yes',
    }, {
      id: 33,
      fieldName: 'Johnston',
      alias: 'Brown',
      table: '@Knight',
      isCustom: 'johnstonknight@comtours.com',
      active: 'Yes',
    }, {
      id: 34,
      fieldName: 'Lena',
      alias: 'Pitts',
      table: '@Forbes',
      isCustom: 'lenaforbes@comtours.com',
      active: 'Yes',
    }, {
      id: 35,
      fieldName: 'Terrie',
      alias: 'Kennedy',
      table: '@Branch',
      isCustom: 'terriebranch@comtours.com',
      active: 'Yes',
    }, {
      id: 36,
      fieldName: 'Louise',
      alias: 'Aguirre',
      table: '@Kirby',
      isCustom: 'louisekirby@comtours.com',
      active: 'Yes',
    }, {
      id: 37,
      fieldName: 'David',
      alias: 'Patton',
      table: '@Sanders',
      isCustom: 'davidsanders@comtours.com',
      active: 'Yes',
    }, {
      id: 38,
      fieldName: 'Holden',
      alias: 'Barlow',
      table: '@Mckinney',
      isCustom: 'holdenmckinney@comtours.com',
      active: 'Yes',
    }, {
      id: 39,
      fieldName: 'Baker',
      alias: 'Rivera',
      table: '@Montoya',
      isCustom: 'bakermontoya@comtours.com',
      active: 'Yes',
    }, {
      id: 40,
      fieldName: 'Belinda',
      alias: 'Lloyd',
      table: '@Calderon',
      isCustom: 'belindacalderon@comtours.com',
      active: 'Yes',
    }, {
      id: 41,
      fieldName: 'Pearson',
      alias: 'Patrick',
      table: '@Clements',
      isCustom: 'pearsonclements@comtours.com',
      active: 'Yes',
    }, {
      id: 42,
      fieldName: 'Alyce',
      alias: 'Mckee',
      table: '@Daugherty',
      isCustom: 'alycedaugherty@comtours.com',
      active: 'Yes',
    }, {
      id: 43,
      fieldName: 'Valencia',
      alias: 'Spence',
      table: '@Olsen',
      isCustom: 'valenciaolsen@comtours.com',
      active: 'Yes',
    }, {
      id: 44,
      fieldName: 'Leach',
      alias: 'Holcomb',
      table: '@Humphrey',
      isCustom: 'leachhumphrey@comtours.com',
      active: 'Yes',
    }, {
      id: 45,
      fieldName: 'Moss',
      alias: 'Baxter',
      table: '@Fitzpatrick',
      isCustom: 'mossfitzpatrick@comtours.com',
      active: 'Yes',
    }, {
      id: 46,
      fieldName: 'Jeanne',
      alias: 'Cooke',
      table: '@Ward',
      isCustom: 'jeanneward@comtours.com',
      active: 'Yes',
    }, {
      id: 47,
      fieldName: 'Wilma',
      alias: 'Briggs',
      table: '@Kidd',
      isCustom: 'wilmakidd@comtours.com',
      active: 'Yes',
    }, {
      id: 48,
      fieldName: 'Beatrice',
      alias: 'Perry',
      table: '@Gilbert',
      isCustom: 'beatricegilbert@comtours.com',
      active: 'Yes',
    }, {
      id: 49,
      fieldName: 'Whitaker',
      alias: 'Hyde',
      table: '@Mcdonald',
      isCustom: 'whitakermcdonald@comtours.com',
      active: 'Yes',
    }, {
      id: 50,
      fieldName: 'Rebekah',
      alias: 'Duran',
      table: '@Gross',
      isCustom: 'rebekahgross@comtours.com',
      active: 'Yes',
    }, {
      id: 51,
      fieldName: 'Earline',
      alias: 'Mayer',
      table: '@Woodward',
      isCustom: 'earlinewoodward@comtours.com',
      active: 'Yes',
    }, {
      id: 52,
      fieldName: 'Moran',
      alias: 'Baxter',
      table: '@Johns',
      isCustom: 'moranjohns@comtours.com',
      active: 'Yes',
    }, {
      id: 53,
      fieldName: 'Nanette',
      alias: 'Hubbard',
      table: '@Cooke',
      isCustom: 'nanettecooke@comtours.com',
      active: 'Yes',
    }, {
      id: 54,
      fieldName: 'Dalton',
      alias: 'Walker',
      table: '@Hendricks',
      isCustom: 'daltonhendricks@comtours.com',
      active: 'Yes',
    }, {
      id: 55,
      fieldName: 'Bennett',
      alias: 'Blake',
      table: '@Pena',
      isCustom: 'bennettpena@comtours.com',
      active: 'Yes',
    }, {
      id: 56,
      fieldName: 'Kellie',
      alias: 'Horton',
      table: '@Weiss',
      isCustom: 'kellieweiss@comtours.com',
      active: 'Yes',
    }, {
      id: 57,
      fieldName: 'Hobbs',
      alias: 'Talley',
      table: '@Sanford',
      isCustom: 'hobbssanford@comtours.com',
      active: 'Yes',
    }, {
      id: 58,
      fieldName: 'Mcguire',
      alias: 'Donaldson',
      table: '@Roman',
      isCustom: 'mcguireroman@comtours.com',
      active: 'Yes',
    }, {
      id: 59,
      fieldName: 'Rodriquez',
      alias: 'Saunders',
      table: '@Harper',
      isCustom: 'rodriquezharper@comtours.com',
      active: 'Yes',
    }, {
      id: 60,
      fieldName: 'Lou',
      alias: 'Conner',
      table: '@Sanchez',
      isCustom: 'lousanchez@comtours.com',
      active: 'Yes',
    }];
  }

}
