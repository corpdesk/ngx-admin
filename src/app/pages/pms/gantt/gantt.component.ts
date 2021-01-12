import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ScheduleService } from '../../../@cd/sys/scheduler/controllers/schedule.service';
import { NewScheduleComponent } from '../new-schedule/new-schedule.component';
import { ScheduleSettings } from '../../../@cd/sys/scheduler/models/schedule.model';
import { SocketIoService } from '../../../@cd/sys/cd-push/controllers/socket-io.service';

const MODE_NEW = ScheduleSettings.MODE_NEW;
const MODE_EDIT = ScheduleSettings.MODE_EDIT;

@Component({
  selector: 'ngx-gantt',
  templateUrl: './gantt.component.html',
  styleUrls: ['./gantt.component.scss']
})
export class GanttComponent implements OnInit {
  @ViewChild(NewScheduleComponent) compSchedWiz: NewScheduleComponent;
  opMode = MODE_NEW; 
  title = 'Proj Tasks:';
  dateStartStr = '2019-02-01';
  projTasks = [];
  selectedSchedule;
  constructor(
    public svSchedule: ScheduleService,
    public svSocket: SocketIoService,
    ) { }

  ngOnInit(): void {
    this.pushSubscribe();
  }

  pushSubscribe() {
    this.svSocket.listen('schedule-sync').subscribe(data => {
      console.log('NewScheduleComponent:schedule-sync event captured');
      console.log(data);
    });
  }

  getSelectedSchedule(selSchedule){
    console.log('starting GanttComponent::getSelectedSchedule(selSchedule)');
    console.log('selSchedule:', selSchedule);
    this.opMode = MODE_EDIT;
    this.compSchedWiz.editMode = true;
    this.compSchedWiz.stepperSetData(selSchedule);
  }

}
