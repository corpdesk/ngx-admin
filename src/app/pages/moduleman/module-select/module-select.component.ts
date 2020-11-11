import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ReplaySubject, Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { MatSelect } from '@angular/material/select';
import { ModulesService } from '../../../@cd/sys/moduleman/controllers/modules.service';
import { CdModule } from '../../../@cd/sys/moduleman/models/module.model';



@Component({
  selector: 'ngx-module-select',
  templateUrl: './module-select.component.html',
  styleUrls: ['./module-select.component.scss']
})
export class ModuleSelectComponent implements OnInit, AfterViewInit, OnDestroy {
  /** list of modules */
  protected modules: CdModule[] = [];

  /** control for the selected module for multi-selection */
  public moduleMultiCtrl: FormControl = new FormControl();

  /** control for the MatSelect filter keyword multi-selection */
  public moduleMultiFilterCtrl: FormControl = new FormControl();

  /** list of modules filtered by search keyword */
  public filteredModulesMulti: ReplaySubject<CdModule[]> = new ReplaySubject<CdModule[]>(1);

  @ViewChild('multiSelect', { static: true }) multiSelect: MatSelect;

  /** Subject that emits when the component has been destroyed. */
  protected _onDestroy = new Subject<void>();
  constructor(
    public svModule: ModulesService,
  ) {

  }

  ngOnInit() {
    this.svModule.getGetAllObsv()
      .subscribe(
        (resp: any) => {
          console.log('ModuleSelectComponents::constructor()/resp.data:', resp.data);
          this.modules = resp.data;
          this.filteredModulesMulti.next(this.modules.slice());
        }
      );


    // listen for search field value changes
    this.moduleMultiFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterModulesMulti();
        console.log('moduleMultiCtrl.value:', this.moduleMultiCtrl.value);
        if (this.moduleMultiCtrl.value) {
          this.svModule.selectedModules = this.moduleMultiCtrl.value;
          if (this.svModule.selectedModules.length > 0) {
            this.svModule.isInvalidSelModules = false;
          }
          else {
            this.svModule.isInvalidSelModules = true;
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
   * Sets the initial value after the filteredModules are loaded initially
   */
  protected setInitialValue() {
    this.filteredModulesMulti
      .pipe(take(1), takeUntil(this._onDestroy))
      .subscribe(() => {
        // setting the compareWith property to a comparison function
        // triggers initializing the selection according to the initial value of
        // the form control (i.e. _initializeSelection())
        // this needs to be done after the filteredModules are loaded initially
        // and after the mat-option elements are available
        this.multiSelect.compareWith = (a: CdModule, b: CdModule) => a && b && a.module_id === b.module_id;
      });
  }

  protected filterModulesMulti() {
    if (!this.modules) {
      return;
    }
    // get the search keyword
    let search = this.moduleMultiFilterCtrl.value;
    if (!search) {
      this.filteredModulesMulti.next(this.modules.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the modules
    this.filteredModulesMulti.next(
      this.modules.filter(module => module.module_name.toLowerCase().indexOf(search) > -1)
    );
  }

}
