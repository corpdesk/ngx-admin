import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ReplaySubject, Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { MatSelect } from '@angular/material/select';
import { UserService } from '../../../@cd/sys/user/controllers/user.service';

import { User, USERS } from './demo-data';

@Component({
  selector: 'ngx-user-select',
  templateUrl: './user-select.component.html',
  styleUrls: ['./user-select.component.scss']
})
export class UserSelectComponent implements OnInit, AfterViewInit, OnDestroy {
  /** list of users */
  protected users: User[] = [{username: 'anon', user_id: 1000}];

  /** control for the selected user for multi-selection */
  public userMultiCtrl: FormControl = new FormControl();

  /** control for the MatSelect filter keyword multi-selection */
  public userMultiFilterCtrl: FormControl = new FormControl();

  /** list of users filtered by search keyword */
  public filteredUsersMulti: ReplaySubject<User[]> = new ReplaySubject<User[]>(1);

  @ViewChild('multiSelect', { static: true }) multiSelect: MatSelect;

  /** Subject that emits when the component has been destroyed. */
  protected _onDestroy = new Subject<void>();
  constructor(
    public svUser: UserService,
  ) { }

  ngOnInit() {
    this.svUser.getUsersObsv()
      .subscribe(
        (resp: any) => {
          console.log('UserSelectComponents::ngOnInit()/resp.data:', resp.data);
          this.users = resp.data;
        }
      );
    // set initial selection
    //this.userMultiCtrl.setValue([this.users[10], this.users[11], this.users[12]]);
    this.userMultiCtrl.setValue([]);

    // load the initial user list
    this.filteredUsersMulti.next(this.users.slice());

    // listen for search field value changes
    this.userMultiFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterUsersMulti();
        console.log('userMultiCtrl.value:', this.userMultiCtrl.value);
        this.svUser.selectedUsers = this.userMultiCtrl.value;
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
   * Sets the initial value after the filteredUsers are loaded initially
   */
  protected setInitialValue() {
    this.filteredUsersMulti
      .pipe(take(1), takeUntil(this._onDestroy))
      .subscribe(() => {
        // setting the compareWith property to a comparison function
        // triggers initializing the selection according to the initial value of
        // the form control (i.e. _initializeSelection())
        // this needs to be done after the filteredUsers are loaded initially
        // and after the mat-option elements are available
        this.multiSelect.compareWith = (a: User, b: User) => a && b && a.user_id === b.user_id;
      });
  }

  protected filterUsersMulti() {
    if (!this.users) {
      return;
    }
    // get the search keyword
    let search = this.userMultiFilterCtrl.value;
    if (!search) {
      this.filteredUsersMulti.next(this.users.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the users
    this.filteredUsersMulti.next(
      this.users.filter(user => user.username.toLowerCase().indexOf(search) > -1)
    );
  }

}
