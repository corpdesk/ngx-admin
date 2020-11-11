import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ReplaySubject, Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { MatSelect } from '@angular/material/select';
import { MenuService } from '../../../@cd/sys/moduleman/controllers/menu.service';
import { MenuModel } from '../../../@cd/sys/moduleman/models/menu.model';

@Component({
  selector: 'ngx-menu-select',
  templateUrl: './menu-select.component.html',
  styleUrls: ['./menu-select.component.scss']
})
export class MenuSelectComponent implements OnInit, AfterViewInit, OnDestroy {
  /** list of menus */
  protected menus: MenuModel[] = [];

  /** control for the selected menu for multi-selection */
  public menuMultiCtrl: FormControl = new FormControl();

  /** control for the MatSelect filter keyword multi-selection */
  public menuMultiFilterCtrl: FormControl = new FormControl();

  /** list of menus filtered by search keyword */
  public filteredMenusMulti: ReplaySubject<MenuModel[]> = new ReplaySubject<MenuModel[]>(1);

  clientAppId = 2;

  @ViewChild('multiSelect', { static: true }) multiSelect: MatSelect;

  /** Subject that emits when the component has been destroyed. */
  protected _onDestroy = new Subject<void>();
  constructor(
    public svMenu: MenuService,
  ) {

  }

  ngOnInit() {
    this.menus = [];
    this.svMenu.getGetAllObsv(this.clientAppId)
      .subscribe(
        (resp: any) => {
          console.log('MenuSelectComponents::ngOnInit()/resp.data:', resp);
          this.menus = resp.data;
          this.filteredMenusMulti.next(this.menus.slice());
        }
      );

    // listen for search field value changes
    this.menuMultiFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterMenusMulti();
        console.log('menuMultiCtrl.value:', this.menuMultiCtrl.value);
        if (this.menuMultiCtrl.value) {
          this.svMenu.selectedMenus = this.menuMultiCtrl.value;
          if (this.svMenu.selectedMenus.length > 0) {
            this.svMenu.isInvalidSelMenus = false;
          }
          else {
            this.svMenu.isInvalidSelMenus = true;
          }
        }
      });
  }

  ngAfterViewInit() {
    this.setInitialValue();
  }

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  /**
   * Sets the initial value after the filteredMenus are loaded initially
   */
  protected setInitialValue() {
    this.filteredMenusMulti
      .pipe(take(1), takeUntil(this._onDestroy))
      .subscribe(() => {
        // setting the compareWith property to a comparison function
        // triggers initializing the selection according to the initial value of
        // the form control (i.e. _initializeSelection())
        // this needs to be done after the filteredMenus are loaded initially
        // and after the mat-option elements are available
        this.multiSelect.compareWith = (a: MenuModel, b: MenuModel) => a && b && a.menu_id === b.menu_id;
      });
  }

  protected filterMenusMulti() {
    if (!this.menus) {
      return;
    }
    // get the search keyword
    let search = this.menuMultiFilterCtrl.value;
    if (!search) {
      this.filteredMenusMulti.next(this.menus.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the menus
    this.filteredMenusMulti.next(
      this.menus.filter(menu => menu.title.toLowerCase().indexOf(search) > -1)
    );
  }

}
