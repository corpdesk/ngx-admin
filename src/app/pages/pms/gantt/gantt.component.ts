import { Component, OnInit } from '@angular/core';
import { TimeData, ScheduleSettings, ScheduleRegData } from '../../../@cd/sys/scheduler/models/schedule.model';
import { ProjectService } from '../../../@cd/app/pms/controllers/project.service';
import { ScheduleService } from '../../../@cd/sys/scheduler/controllers/schedule.service';
import { TimeSpanComponent } from '../../cd-palette/time-span/time-span.component';

@Component({
  selector: 'ngx-gantt',
  templateUrl: './gantt.component.html',
  styleUrls: ['./gantt.component.scss']
})
export class GanttComponent implements OnInit {
  title = 'Proj Tasks:';
  dateStartStr = '2019-02-01';
  projTasks = [];

  constructor(
    public svSchedule: ScheduleService,
    
    ) { 
      
    }

  ngOnInit(): void {
  }

}
