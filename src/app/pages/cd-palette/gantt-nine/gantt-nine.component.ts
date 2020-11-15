// Based on: https://oguzhanoya.github.io/jquery-gantt/
import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import * as moment from 'moment';

interface dDay {
  d: number;
  dow: string;
}

@Component({
  selector: 'ngx-gantt-nine',
  templateUrl: './gantt-nine.component.html',
  styleUrls: ['./gantt-nine.component.scss']
})
export class GanttNineComponent implements OnInit, AfterViewInit {
  projTasks = [];
  cellWidthUnit = 20; // width unit 20px
  taskUnitHeight = 38; // height unit 38px
  durationDays = 0;
  totalCellsWidth = 0;
  totalTaskHeight = 0;

  // granularity allow abstructing time unit
  // this should then give way to setting 'zoomable time views'
  granularity = [
    {
      level: 0,
      unit: 'minute',
    },
    {
      level: 1,
      unit: 'hour',
    },
    {
      level: 2,
      unit: 'day',
    },
    {
      level: 3,
      unit: 'week',
    },
    {
      level: 4,
      unit: 'month',
    },
    {
      level: 5,
      unit: 'quarter'
    },
    {
      level: 6,
      unit: 'bi-anual',
    },
    {
      level: 7,
      unit: 'year',
    },
  ];

  level2 = [];
  ganttHeaderMonths;
  ganttHeaderDays;

  scrollUnit = 20;
  MONTHS;
  DAYS_JULY;
  DAYS_AUG;
  DAYS_SEPT;
  DAYS_OCT;
  DAYS;
  posHome;
  view = {
    isVisible: true,
    title: 'hello 🤔',
    dateRangeText: 'date RangeText 🔥🔥',
    data: 'data ⚡'
  };
  week = [
    {
      index: 0,
      dowStr: 'Sunday'
    },
    {
      index: 1,
      dowStr: 'Monday'
    },
    {
      index: 2,
      dowStr: 'Tuesday'
    },
    {
      index: 3,
      dowStr: 'Wednesday'
    },
    {
      index: 4,
      dowStr: 'Thursday'
    },
    {
      index: 5,
      dowStr: 'Friday'
    },
    {
      index: 6,
      dowStr: 'Saturday'
    }
  ];
  @ViewChild('cdGanttHeader', { read: ElementRef }) public cdGanttHeader: ElementRef<any>;
  constructor() {
    this.ganttHeaderMonths = {
      id: 'ganttHeaderMonths',
      width: 1860
    }
    this.ganttHeaderDays = {
      id: 'ganttHeaderDays',
      width: 1860
    }
    this.projTasks = [
      {
        taskName: 'Task1',
        taskCost: 'USD43.00',
        taskDesc: 'Descrp one',
        taskGanttGridRow: {
          id: 'taskGanttGridRow-2',
          width: 1860,
          height: 38
        },
        taskGanttEventRow: {
          id: 'taskGanttEventRow-1',
          height: 38
        },
        divGanttEvent: {
          id: 'divGanttEvent-1',
          startPos: 300,
        },
        taskGanttEventBlock: {
          id: 'taskGanttEventBlock-1',
          width: 100
        }
      },
      {
        taskName: 'Task2',
        taskCost: 'USD15.00',
        taskDesc: 'Descrp two',
        taskGanttGridRow: {
          id: 'taskGanttGridRow-2',
          width: 1860,
          height: 38
        },
        taskGanttEventRow: {
          id: 'taskGanttEventRow-2',
          height: 38
        },
        divGanttEvent: {
          id: 'divGanttEvent-2',
          startPos: 430,
        },
        taskGanttEventBlock: {
          id: 'taskGanttEventBlock-2',
          width: 140
        }
      },
      {
        taskName: 'Task3',
        taskCost: 'USD76.00',
        taskDesc: 'Descrp three',
        taskGanttGridRow: {
          id: 'taskGanttGridRow-2',
          width: 1860,
          height: 38
        },
        taskGanttEventRow: {
          id: 'taskGanttEventRow-3',
          height: 38
        },
        divGanttEvent: {
          id: 'divGanttEvent-3',
          startPos: 400,
        },
        taskGanttEventBlock: {
          id: 'taskGanttEventBlock-3',
          width: 50
        }
      }
    ];


    let fxMonths = () => {
      const months = [];
      const dateStart = moment();
      const dateEnd = moment().add(12, 'month')
      while (dateEnd.diff(dateStart, 'months') >= 0) {
        months.push(dateStart.format('M'));
        dateStart.add(1, 'month');
      }
      return months
    }
    console.log(fxMonths());
    this.MONTHS = fxMonths();
    this.DAYS = this.getDays("2016-07-01", "2016-10-02");
    console.log(this.DAYS_JULY);
    console.log(this.DAYS);

  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    console.log('starting ngAfterViewInit()');
    console.log('this.cellWidthUnit:', this.cellWidthUnit);
    console.log('this.taskUnitHeight:', this.taskUnitHeight);
    console.log('this.durationDays:', this.durationDays);
    console.log('this.totalCellsWidth:', this.totalCellsWidth);
    console.log('this.totalTaskHeight:', this.totalTaskHeight);
    console.log('this.ganttHeaderMonths.id:', this.ganttHeaderMonths.id);
    console.log('this.level2:', this.level2);
    const ganttHeaderMonths = document.getElementById(this.ganttHeaderMonths.id) as HTMLElement;
    ganttHeaderMonths.style.width = `${this.ganttHeaderMonths.width}px`;

    const ganttHeaderDays = document.getElementById(this.ganttHeaderMonths.id) as HTMLElement;
    ganttHeaderDays.style.width = `${this.totalCellsWidth}px`;

    this.level2.forEach((label) => {
      const taskGanttGridRow = document.getElementById(label.id) as HTMLElement;

      const month = Number(label.l2index) - 1;
      console.log('month:', month);
      const countDays = this.DAYS.filter((d) => d.m == month).length;
      console.log('countDays:', countDays);
      const width = this.cellWidthUnit * countDays;
      console.log('width:', width);
      taskGanttGridRow.style.width = `${width}px`;
    });

    this.setTaskBars();
  }

  colMouseEnter(day, month, year) {
    const headerDay = document.getElementById(`gantt-header-day-${day}-${month}-${year}`) as HTMLElement;
    const headerDayMin = document.getElementById(`gantt-header-day-min-${day}-${month}-${year}`) as HTMLElement;
    const gridCol = document.getElementById(`gantt-grid-col-${day}-${month}-${year}`) as HTMLElement;

    if (headerDay) {
      headerDay.classList.add('active');
    }

    if (headerDayMin) {
      headerDayMin.classList.add('active');
    }

    if (gridCol) {
      gridCol.classList.add('active');
    }

  }

  colMouseLeave(day, month, year) {
    const headerDay = document.getElementById(`gantt-header-day-${day}-${month}-${year}`) as HTMLElement;
    const headerDayMin = document.getElementById(`gantt-header-day-min-${day}-${month}-${year}`) as HTMLElement;
    const gridCol = document.getElementById(`gantt-grid-col-${day}-${month}-${year}`) as HTMLElement;

    if (headerDay) {
      headerDay.classList.remove('active');
    }

    if (headerDayMin) {
      headerDayMin.classList.remove('active');
    }

    if (gridCol) {
      gridCol.classList.remove('active');
    }
  }

  headDay(cls, date) {
    return cls + '-' + date;
  }

  // end day is calculated from afterEnd
  // this is one day after the end day
  // this allows one to specify end month without knowing
  // the endin day
  getDays(fromDate, afterEnd) {
    console.log('starting getDays(fromDate, afterEnd)');
    const fxDays = () => {
      const days = [];
      const date = fromDate;
      const dateStart = moment(date);
      const oneDay = moment.duration({ 'days': 1 });
      const dateEnd = moment(afterEnd).subtract(oneDay);
      this.durationDays = moment(afterEnd).diff(dateStart, 'days');

      this.totalCellsWidth = this.durationDays * this.cellWidthUnit;

      this.totalTaskHeight = this.projTasks.length * this.taskUnitHeight;
      console.log('totalDays:', this.durationDays);
      while (dateEnd.diff(dateStart, 'days') >= 0) {
        const iDow = dateStart.day();
        const strDow = this.week.filter((w) => {
          if (iDow == w.index) {
            // const ret = w.dowStr.substring(0, 2);
            // console.log('ret:', ret);
            return w;
          }
        });
        // console.log('strDow:', strDow[0].dowStr);
        console.log('dateStart.month():', dateStart.month());
        const mInt = Number(dateStart.month());
        const mStr = moment(String(mInt + 1), 'M').format('MMMM');
        console.log('mStr:', mStr);

        // set level2 data, for labelling the header
        if (dateStart.format('D') == '1') {
          const l2Dat = {
            id: 'ganttHeaderMonth-' + String(mInt + 1),
            l2name: mStr, // level 2 name eg month
            l2index: String(mInt + 1),
            l3name: dateStart.year(), // level 3 name eg year
            collectionUnit: dateStart.daysInMonth()
          }
          this.level2.push(l2Dat);
        }



        const d = {
          stats: {
            durationDays: this.durationDays,
            cellWidthUnit: this.cellWidthUnit,
            totalCellWidth: this.totalCellsWidth,
            taskUnitHeigh: this.taskUnitHeight,
            totalTaskHeight: this.totalTaskHeight
          },
          mDays: dateStart.daysInMonth(),
          d: dateStart.format('D'),
          dow: strDow[0].dowStr.substring(0, 2),
          m: dateStart.month(),
          mName: mStr,
          y: dateStart.year()
        };
        days.push(d);
        dateStart.add(1, 'days');
      }
      return days;
    }
    // console.log(fxDays());
    return fxDays();
  }

  setTaskBars() {
    const cdGanttEvents = document.getElementById('cd-gantt-events') as HTMLElement;
    cdGanttEvents.style.width = `${this.totalCellsWidth}px`;
    this.projTasks.forEach((task) => {
      const taskGanttGridRow = document.getElementById(task.taskGanttGridRow.id) as HTMLElement;
      const taskGanttEventRow = document.getElementById(task.taskGanttEventRow.id) as HTMLElement;
      const divGanttEvent = document.getElementById(task.divGanttEvent.id) as HTMLElement;
      const taskGanttEventBlock = document.getElementById(task.taskGanttEventBlock.id) as HTMLElement;

      if (taskGanttGridRow) {
        task.taskGanttGridRow.height = this.taskUnitHeight;
        task.taskGanttGridRow.width = this.totalCellsWidth;
        taskGanttGridRow.style.height = `${task.taskGanttGridRow.height}px`;
        taskGanttGridRow.style.width = `${task.taskGanttGridRow.width}px`;
      } else {
        console.log('taskGanttGridRow is not set');
        console.log('task.taskGanttGridRow.id:', task.taskGanttGridRow.id);
      }

      if (taskGanttEventRow) {
        task.taskGanttEventRow.height = this.taskUnitHeight;
        taskGanttEventRow.style.height = `${task.taskGanttEventRow.height}px`;
      } else {
        console.log('taskGanttEventRow is not set');
        console.log('task.taskGanttEventRow.id:', task.taskGanttEventRow.id);
      }
      divGanttEvent.style.left = `${task.divGanttEvent.startPos}px`;
      taskGanttEventBlock.style.width = `${task.taskGanttEventBlock.width}px`;
    });
  }

}

