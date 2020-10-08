import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ReplaySubject, Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { MatSelect } from '@angular/material/select';
import { GroupService } from '../../../@cd/sys/user/controllers/group.service';
import { UserService } from '../../../@cd/sys/user/controllers/user.service';

import { Group, GROUPS } from './demo-data';

@Component({
  selector: 'ngx-group-select',
  templateUrl: './group-select.component.html',
  styleUrls: ['./group-select.component.scss']
})
export class GroupSelectComponent implements OnInit, AfterViewInit, OnDestroy {
  /** list of groups */
  protected groups: Group[] = [{ group_name: '...loading', group_id: -1 }];

  /** control for the selected group for multi-selection */
  public groupMultiCtrl: FormControl = new FormControl();

  /** control for the MatSelect filter keyword multi-selection */
  public groupMultiFilterCtrl: FormControl = new FormControl();

  /** list of groups filtered by search keyword */
  public filteredGroupsMulti: ReplaySubject<Group[]> = new ReplaySubject<Group[]>(1);

  @ViewChild('multiSelect', { static: true }) multiSelect: MatSelect;

  /** Subject that emits when the component has been destroyed. */
  protected _onDestroy = new Subject<void>();
  constructor(
    public svGroup: GroupService,
    // public svUser: UserService,
  ) { }

  ngOnInit() {
    this.svGroup.getGroupsObsv()
      .subscribe(
        (resp: any) => {
          console.log('GroupSelectComponents::ngOnInit()/resp.data:', resp.data);
          this.groups = resp.data;
          this.filteredGroupsMulti.next(this.groups.slice());
        }
      );

    // listen for search field value changes
    this.groupMultiFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterGroupsMulti();
        console.log('groupMultiCtrl.value:', this.groupMultiCtrl.value);
        if (this.groupMultiCtrl.value) {
          this.svGroup.selectedGroups = this.groupMultiCtrl.value;
          if (this.svGroup.selectedGroups.length > 0) {
            this.svGroup.isInvalidSelGroups = false;
          }
          else {
            this.svGroup.isInvalidSelGroups = true;
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
   * Sets the initial value after the filteredGroups are loaded initially
   */
  protected setInitialValue() {
    this.filteredGroupsMulti
      .pipe(take(1), takeUntil(this._onDestroy))
      .subscribe(() => {
        // setting the compareWith property to a comparison function
        // triggers initializing the selection according to the initial value of
        // the form control (i.e. _initializeSelection())
        // this needs to be done after the filteredGroups are loaded initially
        // and after the mat-option elements are available
        this.multiSelect.compareWith = (a: Group, b: Group) => a && b && a.group_id === b.group_id;
      });
  }

  protected filterGroupsMulti() {
    if (!this.groups) {
      return;
    }
    // get the search keyword
    let search = this.groupMultiFilterCtrl.value;
    if (!search) {
      this.filteredGroupsMulti.next(this.groups.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the groups
    this.filteredGroupsMulti.next(
      this.groups.filter(group => group.group_name.toLowerCase().indexOf(search) > -1)
    );
  }

}

