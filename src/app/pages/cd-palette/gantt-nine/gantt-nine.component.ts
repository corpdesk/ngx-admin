// Based on: https://oguzhanoya.github.io/jquery-gantt/
import { Component, OnInit, AfterViewInit, ViewChild, Input, ElementRef } from '@angular/core';
import { ScheduleService } from '../../../@cd/sys/scheduler/controllers/schedule.service'
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

  @Input() title = 'Tasks:';
  @Input() dateStartStr = '2019-02-01';
  @Input() projTasks = [
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
        startDay: 16
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
        startDay: 22
      },
      taskGanttEventBlock: {
        id: 'taskGanttEventBlock-2',
        noOfDays: 7,
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
        startDay: 19
      },
      taskGanttEventBlock: {
        id: 'taskGanttEventBlock-3',
        noOfDays: 10,
      }
    }
  ];
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
  constructor(
    private elementRef: ElementRef,
    public svSchedule: ScheduleService
  ) {
    this.ganttHeaderMonths = {
      id: 'ganttHeaderMonths',
      width: 0
    }
    this.ganttHeaderDays = {
      id: 'ganttHeaderDays',
      width: 0
    };


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
    // fromDate, afterEnd


  }

  ngOnInit(): void {
    // this.DAYS = this.getDays();
    this.DAYS = this.getDays();
  }

  ngAfterViewInit() {
    console.log('starting ngAfterViewInit()');
    this.render();
  }

  render() {
    // console.log('this.cellWidthUnit:', this.cellWidthUnit);
    // console.log('this.taskUnitHeight:', this.taskUnitHeight);
    // console.log('this.durationDays:', this.durationDays);
    // console.log('this.totalCellsWidth:', this.totalCellsWidth);
    // console.log('this.totalTaskHeight:', this.totalTaskHeight);
    // console.log('this.ganttHeaderMonths.id:', this.ganttHeaderMonths.id);
    // console.log('this.level2:', this.level2);

    // this.setHeaderMonths();

    const ganttHeaderMonths = document.getElementById(this.ganttHeaderMonths.id) as HTMLElement;
    ganttHeaderMonths.style.width = `${this.ganttHeaderMonths.width}px`;

    const ganttHeaderDays = document.getElementById(this.ganttHeaderMonths.id) as HTMLElement;
    ganttHeaderDays.style.width = `${this.totalCellsWidth}px`;

    this.level2.forEach((label) => {
      const taskGanttGridRow = document.getElementById(label.id) as HTMLElement;

      const month = Number(label.l2index) - 1;
      // console.log('month:', month);
      const countDays = this.DAYS.filter((d) => d.m == month).length;
      // console.log('countDays:', countDays);
      const width = this.cellWidthUnit * countDays;
      // console.log('width:', width);
      taskGanttGridRow.style.width = `${width}px`;
    });

    this.setTaskBars();
  }

  getEndDate() {
    console.log('starting getEndDate(startDate)');
    const dateStart = moment(this.dateStartStr);
    const after3Months = moment(dateStart).add(3, 'M');
    // console.log('after3Months:', after3Months);
    const afterEndDate = moment(after3Months, "YYYY/MM/DD").add(1, 'days');
    // console.log('afterEndDate:', moment(afterEndDate).format('YYYY-MM-DD'));
    return moment(afterEndDate).format('YYYY-MM-DD');
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
  getDays() {
    console.log('starting getDays(fromDate, afterEnd)');
    const fromDate = this.dateStartStr;
    const afterEnd = this.getEndDate();
    const fxDays = () => {
      const days = [];
      const date = fromDate;
      const dateStart = moment(date);
      const oneDay = moment.duration({ 'days': 1 });
      const dateEnd = moment(afterEnd).subtract(oneDay);
      this.durationDays = moment(afterEnd).diff(dateStart, 'days');

      this.totalCellsWidth = this.durationDays * this.cellWidthUnit;

      this.totalTaskHeight = this.projTasks.length * this.taskUnitHeight;
      // console.log('totalDays:', this.durationDays);
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
        // console.log('dateStart.month():', dateStart.month());
        const mInt = Number(dateStart.month());
        const mStr = moment(String(mInt + 1), 'M').format('MMMM');
        // console.log('mStr:', mStr);

        // set level2 data, for labelling the header
        // this.level2 = [];
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
    const cdGanttEvents = document.getElementById('cdGanttEvents') as HTMLElement;
    cdGanttEvents.style.width = `${this.totalCellsWidth}px`;
    //ganttHeaderDaysMin
    const ganttHeaderDaysMin = document.getElementById('ganttHeaderDaysMin') as HTMLElement;
    ganttHeaderDaysMin.style.width = `${this.totalCellsWidth}px`;
    //cdGanttGrid
    const cdGanttGrid = document.getElementById('cdGanttGrid') as HTMLElement;
    cdGanttGrid.style.width = `${this.totalCellsWidth}px`;

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
      const left = (Number(task.divGanttEvent.startDay) + 1) * this.cellWidthUnit;
      divGanttEvent.style.left = `${left}px`;
      // divGanttEvent.style.left = `${task.divGanttEvent.startDay}px`;
      const width = Number(task.taskGanttEventBlock.noOfDays) * this.cellWidthUnit;
      taskGanttEventBlock.style.width = `${width}px`;
      // taskGanttEventBlock.style.width = `${task.taskGanttEventBlock.width}px`;
    });
  }

  removeHeaderMonths() {
    this.level2.forEach((header) => {
      let element = document.getElementById(header.id);
      element.parentNode.removeChild(element);
    });
  }

  setHeaderMonths() {
    this.removeHeaderMonths();
    const ganttHeaderMonths = this.elementRef.nativeElement.querySelector('#ganttHeaderMonths');
    const htmlHeader = `<div  class="gantt-header-month" style="width: 580px;" id="ganttHeaderMonth-2">February, 2020</div>
    <div  class="gantt-header-month" style="width: 620px;" id="ganttHeaderMonth-3">March, 2020</div>
    <div  class="gantt-header-month" style="width: 600px;" id="ganttHeaderMonth-4">April, 2020</div>
    <div  class="gantt-header-month" style="width: 20px;" id="ganttHeaderMonth-5">May, 2020</div>`;
    ganttHeaderMonths.insertAdjacentHTML('beforeend', htmlHeader);
    // this.level2.forEach((h) => {
    //   const month = Number(h.l2index) - 1;
    //   // console.log('month:', month);
    //   const countDays = this.DAYS.filter((d) => d.m == month).length;
    //   // console.log('countDays:', countDays);
    //   const width = this.cellWidthUnit * countDays;
    //   // console.log('width:', width);
    //   // taskGanttGridRow.style.width = `${width}px`;
    //   const htmlHeader = `<div id="${h.id}" class="gantt-header-month" style="width: ${width}px;">${h.l2name + ', ' + h.l3name}</div>`;
    //   ganttHeaderMonths.insertAdjacentHTML('beforeend', htmlHeader);

    // });

  }

  addSchedule() {
    const newSchedule = {
      taskName: 'Task4',
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
        startDay: 7
      },
      taskGanttEventBlock: {
        id: 'taskGanttEventBlock-3',
        noOfDays: 8,
      }
    };
    //this.svSchedule.schedule.push(newSchedule);
    // this.removeHeaderMonths();
    //this.setHeaderMonths();
    // this.level2 = [];
    // this.DAYS = this.getDays();
    // this.render();

    this.setRow(newSchedule);
  }

  setRowShell(){
    const cdGanttEvents = this.elementRef.nativeElement.querySelector('#cdGanttEvents');
    const htmlRow = `<div class="gantt-event" style="left: 400px;">
    <a class="gantt-event-block tourFly" href="http://www.example.com/1" target="_blank" style="width: 100px; line-height: 10px;">4 Gece</a>
    <div class="gantt-event-icon"><div class="tourFly">
    </div>
    </div>
    <div class="gantt-event-price">798 EUR</div>
    <div class="gantt-event-desc">Zaporojie Turu</div>
    </div>`;
    cdGanttEvents.insertAdjacentHTML('beforeend', htmlRow);
  }

  setRow(task) {
    const cdGanttEvents = document.getElementById('cdGanttEvents') as HTMLElement;
    cdGanttEvents.style.width = `${this.totalCellsWidth}px`;
    //ganttHeaderDaysMin
    const ganttHeaderDaysMin = document.getElementById('ganttHeaderDaysMin') as HTMLElement;
    ganttHeaderDaysMin.style.width = `${this.totalCellsWidth}px`;
    //cdGanttGrid
    const cdGanttGrid = document.getElementById('cdGanttGrid') as HTMLElement;
    cdGanttGrid.style.width = `${this.totalCellsWidth}px`;


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
    const left = (Number(task.divGanttEvent.startDay) + 1) * this.cellWidthUnit;
    divGanttEvent.style.left = `${left}px`;
    // divGanttEvent.style.left = `${task.divGanttEvent.startDay}px`;
    const width = Number(task.taskGanttEventBlock.noOfDays) * this.cellWidthUnit;
    taskGanttEventBlock.style.width = `${width}px`;
    // taskGanttEventBlock.style.width = `${task.taskGanttEventBlock.width}px`;

  }

}

