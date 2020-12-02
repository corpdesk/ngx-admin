// Based on: https://oguzhanoya.github.io/jquery-gantt/
import { Component, OnInit, AfterViewInit, ViewChild, Input, ElementRef, ViewEncapsulation } from '@angular/core';
import { ScheduleService } from '../../../@cd/sys/scheduler/controllers/schedule.service';
//ScheduleView
import { ScheduleView } from '../../../@cd/sys/scheduler/models/schedule.model';
import { ProjectService } from '../../../@cd/app/pms/controllers/project.service';
import * as moment from 'moment';

interface dDay {
  d: number;
  dow: string;
}

@Component({
  selector: 'ngx-gantt-nine',
  templateUrl: './gantt-nine.component.html',
  styleUrls: ['./gantt-nine.component.scss'],
  encapsulation: ViewEncapsulation.None,
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
        id: 'taskGanttGridRow-1',
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
        id: 'taskGanttGridRow-3',
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
  projSchedules = [];
  cellWidthUnit = 20; // width unit 20px
  taskUnitHeight = 38; // height unit 38px
  durationDays = 0;
  totalCellsWidth = 0;
  totalTaskHeight = 0;

  // granularity allow abstruction of time unit
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

  // select project params
  fetchProjData = 'getProjectsObsv'; // server method for fetching
  isInvalidSelProj = true;
  selectedProj = [];
  Projects = [{}];
  projNameField = 'project_name';
  projIdField = 'project_id';
  ProjectsData;

  @ViewChild('cdGanttHeader', { read: ElementRef }) public cdGanttHeader: ElementRef<any>;
  constructor(
    private elementRef: ElementRef,
    public svSchedule: ScheduleService,
    public svProject: ProjectService,
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
    console.log('starting render()');
    this.setHeaderMonths();
    this.setHeaderDays();
    this.setHeaderDaysMin();
    this.setGridCols();
    this.setGridRows();
    this.setGanttEvents();
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
    this.level2 = [];
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

      this.totalTaskHeight = this.svSchedule.schedule.length * this.taskUnitHeight;
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
    console.log('starting setTaskBars()');
    const cdGanttEvents = document.getElementById('cdGanttEvents') as HTMLElement;
    cdGanttEvents.style.width = `${this.totalCellsWidth}px`;
    //ganttHeaderDaysMin
    const ganttHeaderDaysMin = document.getElementById('ganttHeaderDaysMin') as HTMLElement;
    ganttHeaderDaysMin.style.width = `${this.totalCellsWidth}px`;
    //cdGanttGrid
    const cdGanttGrid = document.getElementById('cdGanttGrid') as HTMLElement;
    cdGanttGrid.style.width = `${this.totalCellsWidth}px`;

    this.svSchedule.schedule.forEach((task) => {
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
      console.log('left:', left);
      divGanttEvent.style.left = `${left}px`;
      // divGanttEvent.style.left = `${task.divGanttEvent.startDay}px`;
      const width = Number(task.taskGanttEventBlock.noOfDays) * this.cellWidthUnit;
      console.log('width:', width);
      taskGanttEventBlock.style.width = `${width}px`;
      // taskGanttEventBlock.style.width = `${task.taskGanttEventBlock.width}px`;
    });
  }

  removeHeaderMonths() {
    this.level2.forEach((h) => {
      let element = document.getElementById(h.id);
      if (element) {
        element.parentNode.removeChild(element);
      }
    });
  }

  setHeaderMonths() {
    console.log('starting setHeaderMonths()');
    console.log('level2:', this.level2);
    this.removeHeaderMonths();
    const ganttHeaderMonths = this.elementRef.nativeElement.querySelector('#ganttHeaderMonths');
    // ganttHeaderMonths.style
    let htmlHeader = '';
    this.level2.forEach((h) => {
      const month = Number(h.l2index) - 1;
      const countDays = this.DAYS.filter((d) => d.m == month).length;
      const width = this.cellWidthUnit * countDays;
      htmlHeader += `<div id="${h.id}" class="gantt-header-month" style="width: ${width}px;">${h.l2name + ', ' + h.l3name}</div>`;
    });
    ganttHeaderMonths.style.width = `${this.totalCellsWidth}px`;
    ganttHeaderMonths.insertAdjacentHTML('afterbegin', htmlHeader);
  }

  removeHeaderDays() {
    this.DAYS.forEach((h) => {
      const headerDay = document.getElementById('gantt-header-day' + '-' + h.d + '-' + h.m + '-' + h.y) as HTMLElement;
      if (headerDay) {
        headerDay.parentNode.removeChild(headerDay);
      }

    });
  }

  setHeaderDays() {
    console.log('starting setHeaderDays()');
    this.removeHeaderDays();
    const ganttHeaderDays = this.elementRef.nativeElement.querySelector('#ganttHeaderDays') as HTMLElement;
    const cls = 'gantt-header-day';
    let htmlHeader = '';
    this.DAYS.forEach((h) => {
      htmlHeader += `<div id="${cls + '-' + h.d + '-' + h.m + '-' + h.y}"
      class="gantt-header-day" (mouseenter)="colMouseEnter(${h.d},${h.m},${h.y})"
      (mouseleave)="colMouseLeave(${h.d},${h.m},${h.y})" style="width: ${this.cellWidthUnit}px;">${h.d}</div>`;
    });
    ganttHeaderDays.style.width = `${this.totalCellsWidth}px`;
    ganttHeaderDays.insertAdjacentHTML('afterbegin', htmlHeader);
    this.setMouseEnter(cls);
    this.setMouseLeave(cls);
  }

  setMouseEnter(cls) {
    this.DAYS.forEach((h) => {
      // const dayMouseEnter = this.elementRef.nativeElement.querySelector(`#${'gantt-header-day' + '-' + h.d + '-' + h.m + '-' + h.y}`) as HTMLElement;
      const elem = this.elementRef.nativeElement.querySelector(`#${cls + '-' + h.d + '-' + h.m + '-' + h.y}`) as HTMLElement;
      elem.addEventListener("mouseenter", function (event) {

        const headerDay = document.getElementById(`gantt-header-day-${h.d}-${h.m}-${h.y}`) as HTMLElement;
        const headerDayMin = document.getElementById(`gantt-header-day-min-${h.d}-${h.m}-${h.y}`) as HTMLElement;
        const gridCol = document.getElementById(`gantt-grid-col-${h.d}-${h.m}-${h.y}`) as HTMLElement;

        if (headerDay) {
          headerDay.classList.add('active');
        }

        if (headerDayMin) {
          headerDayMin.classList.add('active');
        }

        if (gridCol) {
          gridCol.classList.add('active');
        }

        // highlight the mouseenter target
        // event.target.style.color = "purple";

        // reset the color after a short delay
        setTimeout(function () {
          // event.target.style.color = "";
        }, 5);
      }, false);
    });
  }

  setMouseLeave(cls) {
    this.DAYS.forEach((h) => {
      const elem = this.elementRef.nativeElement.querySelector(`#${cls + '-' + h.d + '-' + h.m + '-' + h.y}`) as HTMLElement;
      elem.addEventListener("mouseleave", function (event) {

        const headerDay = document.getElementById(`gantt-header-day-${h.d}-${h.m}-${h.y}`) as HTMLElement;
        const headerDayMin = document.getElementById(`gantt-header-day-min-${h.d}-${h.m}-${h.y}`) as HTMLElement;
        const gridCol = document.getElementById(`gantt-grid-col-${h.d}-${h.m}-${h.y}`) as HTMLElement;

        if (headerDay) {
          headerDay.classList.remove('active');
        }

        if (headerDayMin) {
          headerDayMin.classList.remove('active');
        }

        if (gridCol) {
          gridCol.classList.remove('active');
        }

        // highlight the mouseenter target
        // event.target.style.color = "purple";

        // reset the color after a short delay
        setTimeout(function () {
          // event.target.style.color = "";
        }, 5);
      }, false);
    });
  }

  removeHeaderDaysMin() {
    this.DAYS.forEach((h) => {
      const headerDayMin = document.getElementById('gantt-header-day-min' + '-' + h.d + '-' + h.m + '-' + h.y) as HTMLElement;
      if (headerDayMin) {
        headerDayMin.parentNode.removeChild(headerDayMin);
      }

    });
  }

  setHeaderDaysMin() {
    console.log('starting setHeaderDaysMin()');
    this.removeHeaderDaysMin();
    const ganttHeaderDaysMin = this.elementRef.nativeElement.querySelector('#ganttHeaderDaysMin') as HTMLElement;
    const cls = 'gantt-header-day-min';
    let htmlHeader = '';
    this.DAYS.forEach((h) => {
      htmlHeader += `<div id="${cls + '-' + h.d + '-' + h.m + '-' + h.y}"
      class="gantt-header-day-min" (mouseenter)="colMouseEnter(${h.d},${h.m},${h.y}) "
      (mouseleave)="colMouseLeave(${h.d},${h.m},${h.y})" style="width: ${this.cellWidthUnit}px;">${h.dow}</div>`;
    });
    ganttHeaderDaysMin.style.width = `${this.totalCellsWidth}px`;
    ganttHeaderDaysMin.insertAdjacentHTML('afterbegin', htmlHeader);
    this.setMouseEnter(cls);
    this.setMouseLeave(cls);
  }

  removeGridCols() {
    this.DAYS.forEach((h) => {
      const headerDayMin = document.getElementById('gantt-grid-col' + '-' + h.d + '-' + h.m + '-' + h.y) as HTMLElement;
      if (headerDayMin) {
        headerDayMin.parentNode.removeChild(headerDayMin);
      }
    });
  }

  setGridCols() {
    console.log('starting setGridCols()');
    this.removeGridCols();
    const cdGanttGrid = this.elementRef.nativeElement.querySelector('#cdGanttGridCols') as HTMLElement;
    const cls = 'gantt-grid-col';
    cdGanttGrid.style.width = `${this.totalCellsWidth}px`;
    const cdGanttGridCols = this.elementRef.nativeElement.querySelector('#cdGanttGridCols') as HTMLElement;
    let htmlHeader = '';
    this.DAYS.forEach((h) => {
      // if end month
      if (h.d == h.mDays) {
        htmlHeader += `<div id="${cls + '-' + h.d + '-' + h.m + '-' + h.y}" 
          class="gantt-grid-col"
          (mouseenter)="colMouseEnter(${h.d},${h.m},${h.y}) "
          (mouseleave)="colMouseLeave(${h.d},${h.m},${h.y})"
          style="width: ${this.cellWidthUnit}px; height: ${this.totalTaskHeight}px;border-color: rgb(190, 197, 204);"></div>`;
      } else {
        htmlHeader += `<div id="${cls + '-' + h.d + '-' + h.m + '-' + h.y}"
          class="gantt-grid-col" 
          (mouseenter)="colMouseEnter(${h.d},${h.m},${h.y})"
          (mouseleave)="colMouseLeave(${h.d},${h.m},${h.y})" style="width: ${this.cellWidthUnit}px; height: ${this.totalTaskHeight}px;"></div>`;
      }

    });
    cdGanttGridCols.insertAdjacentHTML('afterbegin', htmlHeader);
    this.setMouseEnter(cls);
    this.setMouseLeave(cls);
  }

  removeGridRows() {
    this.svSchedule.schedule.forEach((task) => {
      const gridRow = document.getElementById(`${task.taskGanttGridRow.id}`) as HTMLElement;
      if (gridRow) {
        gridRow.parentNode.removeChild(gridRow);
      }
    });
  }

  setGridRows() {
    console.log('starting setGridRows()');
    this.removeGridRows();
    const ganttGridRows = this.elementRef.nativeElement.querySelector('#ganttGridRows') as HTMLElement;
    let htmlHeader = '';
    this.svSchedule.schedule.forEach((task) => {
      htmlHeader += `<div id="${task.taskGanttGridRow.id}" class="gantt-grid-row" style="width: ${this.totalCellsWidth}px; height: ${this.taskUnitHeight}px;"></div>`;
    });
    ganttGridRows.insertAdjacentHTML('afterbegin', htmlHeader);
  }

  removeGanttEvents() {
    this.svSchedule.schedule.forEach((task) => {
      const gridEventRow = document.getElementById(`${task.taskGanttEventRow.id}`) as HTMLElement;
      if (gridEventRow) {
        gridEventRow.parentNode.removeChild(gridEventRow);
      }
    });
  }

  setGanttEvents() {
    console.log('starting setGanttEvents()');
    this.removeGanttEvents();
    const cdGanttEvents = this.elementRef.nativeElement.querySelector('#cdGanttEvents') as HTMLElement;
    let htmlHeader = '';
    this.svSchedule.schedule.forEach((task) => {
      const left = (Number(task.divGanttEvent.startDay) - 1) * this.cellWidthUnit;
      console.log('left:', left);
      console.log('task.divGanttEvent.startDay:', task.divGanttEvent.startDay);
      const width = Number(task.taskGanttEventBlock.noOfDays) * this.cellWidthUnit;
      console.log('task.taskGanttEventBlock.noOfDays:', task.taskGanttEventBlock.noOfDays);
      htmlHeader += `<div id="${task.taskGanttEventRow.id}" class="gantt-event-row" style="height: ${this.taskUnitHeight}px;">
        <div id="${task.divGanttEvent.id}" ngxCdTooltip [tooltipTitle]="displayToolTip(${task})" placement="left" delay="500"
          class="gantt-event" style="left: ${left}px;">
          <a 
            id="${task.taskGanttEventBlock.id}" 
            class="gantt-event-block tourFly"
            style="width: ${width}px; line-height: 10px;" 
            href="http://www.example.com/1"
            target="_blank">${task.taskName}</a>
          <div class="gantt-event-icon">
            <div class="tourFly"></div>
          </div>
          <div class="gantt-event-price">${task.taskCost}</div>
          <div class="gantt-event-desc">${task.taskDesc}</div>
        </div>
      </div>`;
    });
    cdGanttEvents.style.width = `${this.totalCellsWidth}px`;
    cdGanttEvents.insertAdjacentHTML('afterbegin', htmlHeader);
    // this.taskSize();
  }

  taskToolTip(task) {
    console.log(task);
    return "tool tip text";
  }

  taskSize() {
    this.svSchedule.schedule.forEach((task) => {
      const divGanttEvent = document.getElementById(task.divGanttEvent.id) as HTMLElement;
      const taskGanttEventBlock = document.getElementById(task.taskGanttEventBlock.id) as HTMLElement;
      const left = (Number(task.divGanttEvent.startDay) + 1) * this.cellWidthUnit;
      divGanttEvent.style.left = `${left}px`;
      const width = Number(task.taskGanttEventBlock.noOfDays) * this.cellWidthUnit;
      taskGanttEventBlock.style.width = `${width}px`;
    });
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
    this.svSchedule.schedule.push(newSchedule);
    this.DAYS = this.getDays();
    this.render();
  }

  setRowShell() {
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

  getSelectedProj(selProj) {
    console.log('selProj:', selProj);
    this.selectedProj = selProj;
    this.loadSchedules();
  }

  loadSchedules() {
    console.log('starting load()');
    this.svSchedule.getProjectScheduleObsv(this.selectedProj['project_id'])
      .subscribe(
        (resp: any) => {
          console.log('GanttComponent::load()/this.svSchedule.getProjectScheduleObsv()/resp.data:', resp.data);
          this.processSchedules(resp.data);
        }
      );
  }

  async processSchedules(schedules: ScheduleView[]) {
    console.log('starting processSchedules(schedules)');
    console.log('schedules:', schedules);
    this.projTasks = [];
    schedules.forEach((s, i) => {
      const schedule = {
        taskName: s.schedule_name,
        taskCost: 'USD43.00',
        taskDesc: s.schedule_description,
        schedule: s,
        taskGanttGridRow: {
          id: 'taskGanttGridRow-' + s.schedule_id,
          width: 0,
          height: 38
        },
        taskGanttEventRow: {
          id: 'taskGanttEventRow-' + s.schedule_id,
          height: 38
        },
        divGanttEvent: {
          id: 'divGanttEvent-' + s.schedule_id,
          startDay: this.setCommenceDay(s)
        },
        taskGanttEventBlock: {
          id: 'taskGanttEventBlock-' + s.schedule_id,
          noOfDays: s.days,
        }
      };
      this.projTasks.push(schedule);
      // if(i == (schedules.length - 1)){
      //   this.svSchedule.schedule = this.projTasks;
      //   this.DAYS = this.getDays();
      //   this.render();
      // }
    });

    this.svSchedule.schedule = this.projTasks;
    console.log('this.svSchedule.schedule:', this.svSchedule.schedule);
    this.DAYS = this.getDays();
    this.render();
  }

  setCommenceDay(s: ScheduleView) {
    console.log('starting getStartDay()');
    let dateStartStrEpoch = this.svSchedule.mysqlToEpoch(this.dateStartStr);
    console.log('dateStartStrEpoch:', dateStartStrEpoch);
    let commence_dateEpoch = this.svSchedule.mysqlToEpoch(s.commence_date);
    console.log('commence_dateEpoch:', commence_dateEpoch);
    const diffTime = Math.abs(commence_dateEpoch - dateStartStrEpoch);
    const diffDays = Math.ceil(diffTime / (60 * 60 * 24));
    console.log('this.dateStartStr:', this.dateStartStr);
    console.log('s.commence_date:', s.commence_date);
    console.log('s.days:', s.days);
    console.log('diffDays:', diffDays);
    return diffDays;
  }


}

