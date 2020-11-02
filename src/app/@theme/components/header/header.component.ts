import { Component, OnDestroy, OnInit, AfterViewInit } from '@angular/core';
import { NbMediaBreakpointsService, NbMenuService, NbSidebarService, NbThemeService } from '@nebular/theme';

import { UserData } from '../../../@core/data/users';
import { LayoutService } from '../../../@core/utils';
import { map, takeUntil } from 'rxjs/operators';
import { Subject, Observable } from 'rxjs';
import { RippleService } from '../../../@core/utils/ripple.service';

import { environment } from '../../../../environments/environment';
import { SessService } from '../../../@cd/sys/user/controllers/sess.service';
import { UserService } from '../../../@cd/sys/user/controllers/user.service';
import { MenuService } from '../../../@cd/sys/moduleman/controller/menu.service';
import { GuigContextService } from '../../../@cd/guig/guig-context';
import { SideBarService } from '../../../@cd/guig/side-bar.service';
import { NavService } from '../../../@cd/guig/nav.service';

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, AfterViewInit, OnDestroy {

  private destroy$: Subject<void> = new Subject<void>();
  public readonly materialTheme$: Observable<boolean>;
  userPictureOnly: boolean = false;
  // user: any;

  themes = [
    {
      value: 'default',
      name: 'Light',
    },
    {
      value: 'dark',
      name: 'Dark',
    },
    {
      value: 'cosmic',
      name: 'Cosmic',
    },
    {
      value: 'corporate',
      name: 'Corporate',
    },
    {
      value: 'material-light',
      name: 'Material Light',
    },
    {
      value: 'material-dark',
      name: 'Material Dark',
    },
  ];

  currentTheme = 'default';

  // userMenu = [];

  mode;

  public constructor(
    private sidebarService: NbSidebarService,
    private menuService: NbMenuService,
    private themeService: NbThemeService,
    private userService: UserData,
    private layoutService: LayoutService,
    private breakpointService: NbMediaBreakpointsService,
    private rippleService: RippleService,
    public svGc: GuigContextService,
    private svSideBar: SideBarService,
    private svNav: NavService,
    private svSess: SessService,
    private svUser: UserService,
    private svMenu: MenuService,
  ) {
    // this.userMenu = svNav.userMenu;
    this.materialTheme$ = this.themeService.onThemeChange()
      .pipe(map(theme => {
        const themeName: string = theme?.name || '';
        return themeName.startsWith('material');
      }));
  }

  ngOnInit() {
    this.currentTheme = this.themeService.currentTheme;

    this.userService.getUsers()
      .pipe(takeUntil(this.destroy$))
      .subscribe((users: any) => {
        // this.user = users.anon;
        // this.user = this.svUser.currentProfile;
        
        console.log('svUser.userData', this.svUser.userData);
      });

    this.menuService.onItemClick().subscribe((event) => {
      this.onItemSelection(event.item);
    })

    const { xl } = this.breakpointService.getBreakpointsMap();
    this.themeService.onMediaQueryChange()
      .pipe(
        map(([, currentBreakpoint]) => currentBreakpoint.width < xl),
        takeUntil(this.destroy$),
      )
      .subscribe((isLessThanXl: boolean) => this.userPictureOnly = isLessThanXl);

    this.themeService.onThemeChange()
      .pipe(
        map(({ name }) => name),
        takeUntil(this.destroy$),
      )
      .subscribe(themeName => {
        this.currentTheme = themeName;
        this.rippleService.toggle(themeName?.startsWith('material'));
      });
  }

  ngAfterViewInit() {
    this.svSideBar.setSidebarState();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  changeTheme(themeName: string) {
    this.themeService.changeTheme(themeName);
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    this.layoutService.changeLayoutSize();
    this.svSideBar.setSidebarState();

    return false;
  }

  navigateHome() {
    this.menuService.navigateHome();
    return false;
  }

  onItemSelection(menuItem) {
    console.log('starting onItemSelection(e)');
    console.log('menuEvent:', menuItem);
    this.svNav.currentMenuItem = menuItem;

    switch (menuItem.title) {
      case 'Profile':
        this.svNav.nav('/pages/my-account/personal-data');
        break;
      case 'Login':
        this.svNav.nav('/pages/cd-auth/login');
        break;
      case 'Register':
        this.svNav.nav('/pages/cd-auth/register');
        break;
      case 'Log out':
        this.svSess.logout();
        // this.svNav.nav('/pages/home/news-feed');
        this.svUser.currentProfile = { name: 'Login/Register', picture: 'assets/cd/branding/coop/avatarCircle.svg' };
        this.svNav.userMenu = [
          { title: 'Login', link: '/pages/cd-auth/login' },
          { title: 'Register', link: '/pages/cd-auth/register' }
        ];
        this.svMenu.getGetAnon(environment.clientAppId);
        this.svNav.nav('/pages/home/news-feed');
        break;
    }

  }

}
