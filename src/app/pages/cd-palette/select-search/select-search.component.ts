import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { ReplaySubject, Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { MatSelect } from '@angular/material/select';
import { Emitter } from '@fullcalendar/angular';

@Component({
  selector: 'ngx-select-search',
  templateUrl: './select-search.component.html',
  styleUrls: ['./select-search.component.scss']
})
export class SelectSearchComponent implements OnInit, AfterViewInit, OnDestroy {
  
  selectData: any = []; // data source
  @Output() sendSelData = new EventEmitter(); // used to set sel items on selection change
  @Input() isInvalidSelItems = true;
  @Input() nameField;
  @Input() IdField;
  @Input() ConsumerInstance;
  @Input() fetchData;
  @Input() placeholder="Items";

  selectedItems = [];

  selectionIsValid = false;

  /** control for the selected item for multi-selection */
  public itemMultiCtrl: FormControl = new FormControl();

  /** control for the MatSelect filter keyword multi-selection */
  public itemMultiFilterCtrl: FormControl = new FormControl();

  /** list of items filtered by search keyword */
  public filteredItemsMulti: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);

  ///////////////
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  items: any;
  recepients;
  //////////////

  @ViewChild('multiSelect', { static: true }) multiSelect: MatSelect;

  /** Subject that emits when the component has been destroyed. */
  protected _onDestroy = new Subject<void>();
  constructor(
    // public svUser: UserService,

  ) {

  }

  ngOnInit() {
    // the consumer provides the instance for controller and method for accessing data
    // in this case, the instance is passed to ConsumerInstance
    // and the method is passed to fetchData
    // the method must return an observable with data
    this.ConsumerInstance[this.fetchData]()
      .subscribe(
        (resp: any) => {
          console.log('UserSelectComponents::constructor()/resp.data:', resp.data);
          this.selectData = resp.data;
          this.filteredItemsMulti.next(this.selectData.slice());
        }
      );

    // listen for search field value changes
    this.itemMultiFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterItemsMulti();
        if (this.itemMultiCtrl.value) {
          this.selectedItems = this.itemMultiCtrl.value;
          this.sendSelData.emit(this.selectedItems);
          this.items = this.selectedItems;
          console.log('this.items:', this.items)
          if (this.selectedItems.length > 0) {
            this.isInvalidSelItems = false;
            this.selectionIsValid = true;
          }
          else {
            this.isInvalidSelItems = true;
            this.selectionIsValid = false;
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
   * Sets the initial value after the filteredItems are loaded initially
   */
  protected setInitialValue() {
    this.filteredItemsMulti
      .pipe(take(1), takeUntil(this._onDestroy))
      .subscribe(() => {
        // setting the compareWith property to a comparison function
        // triggers initializing the selection according to the initial value of
        // the form control (i.e. _initializeSelection())
        // this needs to be done after the filteredUsers are loaded initially
        // and after the mat-option elements are available
        this.multiSelect.compareWith = (a: any, b: any) => a && b && a[this.IdField] == b[this.IdField];
      });
  }

  protected filterItemsMulti() {
    if (!this.selectData) {
      return;
    }
    // get the search keyword
    let search = this.itemMultiFilterCtrl.value;
    if (!search) {
      this.filteredItemsMulti.next(this.selectData.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the items
    this.filteredItemsMulti.next(
      this.selectData.filter(
        (item) => {
          if(item[this.nameField].toLowerCase().indexOf(search) > -1){
            console.log('item:', item);
            return true;
          }
          else{
            return false
          }
        })
    );
  }

  //////

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our item
    if ((value || '').trim()) {
      this.items.push({ username: value.trim() });
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(item: any): void {
    console.log('starting remove()');
    const index = this.itemMultiCtrl.value.indexOf(item);
    console.log('index:', index);
    if (index >= 0) {
      console.log('before-remove:this.items:', this.itemMultiCtrl.value);
      this.itemMultiCtrl.value.splice(index, 1);
      console.log('after-remove:this.items:', this.items);
      console.log('this.itemMultiCtrl.value:', this.itemMultiCtrl.value);
    }
  }

  // //Chips css seem distorted. This is a fix
  // cleanChipsIcons() {
  //   // mat-icon notranslate mat-chip-remove mat-chip-trailing-icon material-icons mat-icon-no-color ng-star-inserted
  //   const elements: Element[] = Array.from(document.getElementsByTagName('mat-icon'));
  //   elements.forEach((el: Element) => {
  //     if(el.classList.contains('mat-chip-remove')){
  //       el.classList.add("clean-bg");
  //     }
  //   })
  // }

}
