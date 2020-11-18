import { Component, OnInit } from '@angular/core';
import { ScheduleService } from '../../../@cd/sys/scheduler/controllers/schedule.service'

@Component({
  selector: 'ngx-gantt',
  templateUrl: './gantt.component.html',
  styleUrls: ['./gantt.component.scss']
})
export class GanttComponent implements OnInit {
  title = 'Proj Tasks:';
  dateStartStr = '2020-02-01';
  projTasks = [
    {
      taskName: 'Task1',
      taskCost: 'USD43.00',
      taskDesc: 'Descrp one',
      taskGanttGridRow: {
        id: 'taskGanttGridRow-2',
        width: 0,
        height: 38
      },
      taskGanttEventRow: {
        id: 'taskGanttEventRow-1',
        height: 38
      },
      divGanttEvent: {
        id: 'divGanttEvent-1',
        startDay: 3
      },
      taskGanttEventBlock: {
        id: 'taskGanttEventBlock-1',
        noOfDays: 5,
      }
    },
    {
      taskName: 'Task2',
      taskCost: 'USD15.00',
      taskDesc: 'Descrp two',
      taskGanttGridRow: {
        id: 'taskGanttGridRow-2',
        width: 0,
        height: 38
      },
      taskGanttEventRow: {
        id: 'taskGanttEventRow-2',
        height: 38
      },
      divGanttEvent: {
        id: 'divGanttEvent-2',
        startDay: 15
      },
      taskGanttEventBlock: {
        id: 'taskGanttEventBlock-2',
        noOfDays: 12,
      }
    },
    {
      taskName: 'Task3',
      taskCost: 'USD76.00',
      taskDesc: 'Descrp three',
      taskGanttGridRow: {
        id: 'taskGanttGridRow-2',
        width: 0,
        height: 38
      },
      taskGanttEventRow: {
        id: 'taskGanttEventRow-3',
        height: 38
      },
      divGanttEvent: {
        id: 'divGanttEvent-3',
        startDay: 23
      },
      taskGanttEventBlock: {
        id: 'taskGanttEventBlock-3',
        noOfDays: 5,
      }
    }
  ];
  constructor(
    public svSchedule: ScheduleService
    ) { }

  ngOnInit(): void {
  }

}
