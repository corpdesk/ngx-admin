import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ScheduleService } from '../../../@cd/sys/scheduler/controllers/schedule.service';
import { NewScheduleComponent } from '../new-schedule/new-schedule.component';

@Component({
  selector: 'ngx-gantt',
  templateUrl: './gantt.component.html',
  styleUrls: ['./gantt.component.scss']
})
export class GanttComponent implements OnInit {
  @ViewChild(NewScheduleComponent) compSchedWiz: NewScheduleComponent;
  title = 'Proj Tasks:';
  dateStartStr = '2019-02-01';
  projTasks = [];
  selectedSchedule;
  constructor(
    public svSchedule: ScheduleService,
    ) { }

  ngOnInit(): void {
  }

  getSelectedSchedule(selSchedule){
    console.log('starting GanttComponent::getSelectedSchedule(selSchedule)');
    console.log('selSchedule:', selSchedule);
    this.compSchedWiz.editMode = true;
    this.compSchedWiz.stepperSetData(selSchedule);
  }

  

}
