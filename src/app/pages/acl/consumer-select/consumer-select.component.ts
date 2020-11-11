import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ReplaySubject, Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { MatSelect } from '@angular/material/select';
import { ConsumerService } from '../../../@cd/sys/moduleman/controllers/consumer.service';
import { Consumer } from '../../../@cd/sys/moduleman/models/consumer.model';


@Component({
  selector: 'ngx-consumer-select',
  templateUrl: './consumer-select.component.html',
  styleUrls: ['./consumer-select.component.scss']
})
export class ConsumerSelectComponent implements OnInit, AfterViewInit, OnDestroy {
  /** list of consumers */
  protected consumers: Consumer[] = [];

  /** control for the selected consumer for multi-selection */
  public consumerMultiCtrl: FormControl = new FormControl();

  /** control for the MatSelect filter keyword multi-selection */
  public consumerMultiFilterCtrl: FormControl = new FormControl();

  /** list of consumers filtered by search keyword */
  public filteredConsumersMulti: ReplaySubject<Consumer[]> = new ReplaySubject<Consumer[]>(1);

  @ViewChild('multiSelect', { static: true }) multiSelect: MatSelect;

  /** Subject that emits when the component has been destroyed. */
  protected _onDestroy = new Subject<void>();
  constructor(
    public svConsumer: ConsumerService,
  ) {

  }

  ngOnInit() {
    this.svConsumer.getAllObsv()
      .subscribe(
        (resp: any) => {
          console.log('ConsumerSelectComponents::constructor()/resp.data:', resp.data);
          this.consumers = resp.data;
          this.filteredConsumersMulti.next(this.consumers.slice());
        }
      );


    // listen for search field value changes
    this.consumerMultiFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterConsumersMulti();
        console.log('consumerMultiCtrl.value:', this.consumerMultiCtrl.value);
        if (this.consumerMultiCtrl.value) {
          this.svConsumer.selectedConsumers = this.consumerMultiCtrl.value;
          if (this.svConsumer.selectedConsumers.length > 0) {
            this.svConsumer.isInvalidSelConsumers = false;
          }
          else {
            this.svConsumer.isInvalidSelConsumers = true;
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
   * Sets the initial value after the filteredConsumers are loaded initially
   */
  protected setInitialValue() {
    this.filteredConsumersMulti
      .pipe(take(1), takeUntil(this._onDestroy))
      .subscribe(() => {
        // setting the compareWith property to a comparison function
        // triggers initializing the selection according to the initial value of
        // the form control (i.e. _initializeSelection())
        // this needs to be done after the filteredConsumers are loaded initially
        // and after the mat-option elements are available
        this.multiSelect.compareWith = (a: Consumer, b: Consumer) => a && b && a.consumer_id === b.consumer_id;
      });
  }

  protected filterConsumersMulti() {
    if (!this.consumers) {
      return;
    }
    // get the search keyword
    let search = this.consumerMultiFilterCtrl.value;
    if (!search) {
      this.filteredConsumersMulti.next(this.consumers.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the consumers
    this.filteredConsumersMulti.next(
      this.consumers.filter(consumer => consumer.consumer_name.toLowerCase().indexOf(search) > -1)
    );
  }

}
