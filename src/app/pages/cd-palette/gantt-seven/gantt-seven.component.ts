// Based on: https://oguzhanoya.github.io/jquery-gantt/
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as moment from 'moment';

interface dDay {
  d: number;
  dow: string;
}
@Component({
  selector: 'ngx-gantt-seven',
  templateUrl: './gantt-seven.component.html',
  styleUrls: ['./gantt-seven.component.scss']
})
export class GanttSevenComponent implements OnInit {
  MONTHS;
  DAYS_JULY;
  DAYS_AUG;
  DAYS_SEPT;
  DAYS_OCT;
  posHome;
  view = {
    isVisible : true,
    title: 'hello 🤔',
    dateRangeText:'date RangeText 🔥🔥',
    data : 'data ⚡'
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

    // console.log('starting GanttSevenComponent::constructor()');
    // let now = moment(); 
    // console.log('hello world', now.format()); 
    // console.log(now.add(7, 'days').format());
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

    this.DAYS_JULY = this.getDays("2016-07-01", "2016-08-01");
    this.DAYS_AUG = this.getDays("2016-08-01", "2016-09-01");
    this.DAYS_SEPT = this.getDays("2016-09-01", "2016-10-01");
    this.DAYS_OCT = this.getDays("2016-10-01", "2016-10-02");
    console.log(this.DAYS_JULY);
    
  }

  ngOnInit(): void {
    // const gantHeader = document.getElementById("cd-gantt-header");
    // console.log('gantHeader.offsetLeft:', gantHeader.offsetLeft);
    // this.posHome = {
    //   offsetLeft: gantHeader.offsetLeft,
    // };
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
    const fxDays = () => {
      const days = []
      // const date = "2016-07-01";
      const date = fromDate;
      const dateStart = moment(date);


      const oneDay = moment.duration({ 'days': 1 });
      // const dateEnd = moment("2016-08-01").subtract(oneDay);
      const dateEnd = moment(afterEnd).subtract(oneDay);
      while (dateEnd.diff(dateStart, 'days') >= 0) {
        const iDow = dateStart.day();
        const strDow = this.week.filter((w) => {
          if (iDow == w.index) {
            // const ret = w.dowStr.substring(0, 2);
            // console.log('ret:', ret);
            return w;
          }
        });
        console.log('strDow:', strDow[0].dowStr);

        const d = {
          mDays: dateStart.daysInMonth(),
          d: dateStart.format('D'),
          dow: strDow[0].dowStr.substring(0, 2),
          m: dateStart.month(),
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

  // scrollLeft() {
  //   const gantHeader = document.getElementById("cd-gantt-header");
  //   const gantGrid = document.getElementById("cd-gantt-grid");
  //   const gantEvents = document.getElementById('cd-gantt-events');
  //   const gantGridCols = document.getElementById('cd-gantt-grid-cols');
  //   console.log('gantContainer.style.left:', gantHeader.style.left);
  //   console.log('gantContainer.style.position:', gantHeader.style.position);
  //   console.log('Before: gantContainer.offsetLeft:', gantHeader.offsetLeft);
  //   // const distance = this.posHome.offsetLeft - 10;
  //   gantHeader.style.position = 'absolute';
  //   if (this.posHome.offsetLeft <= 200 && this.posHome.offsetLeft >= -200) {

  //     let distance = this.posHome.offsetLeft - 10;
  //     if (distance < -200) {
  //       distance = -200;
  //     }
  //     gantHeader.style.left = `${distance}px`;
  //     gantGrid.style.left = `${distance}px`;
  //     gantEvents.style.left = `${distance}px`;
  //     gantGridCols.style.left = `${distance}px`;
  //     console.log('After: gantContainer.offsetLeft:', gantHeader.offsetLeft);
  //     this.posHome.offsetLeft = distance;
  //   }
  // }

  // scrollRight() {
  //   const gantHeader = document.getElementById("cd-gantt-header");
  //   const gantGrid = document.getElementById("cd-gantt-grid");
  //   const gantEvents = document.getElementById('cd-gantt-events');
  //   const gantGridCols = document.getElementById('cd-gantt-grid-cols');
  //   // let distance;
  //   console.log('gantContainer.style.left:', gantHeader.style.left);
  //   console.log('gantContainer.style.position:', gantHeader.style.position);
  //   console.log('Before: gantContainer.offsetLeft:', gantHeader.offsetLeft);
  //   console.log('this.posHome.offsetLeft:', this.posHome.offsetLeft);

  //   // const distance = this.posHome.offsetLeft + 10;
  //   gantHeader.style.position = 'absolute';
  //   if (this.posHome.offsetLeft <= 200 && this.posHome.offsetLeft >= -200) {
  //     let distance = this.posHome.offsetLeft + 10;
  //     console.log('distance:', distance);
  //     if (distance > -200) {
  //       distance = 200;
  //     }
  //     // distance = this.posHome.offsetLeft + 10;
  //     gantHeader.style.left = `-${distance}px`;
  //     gantGrid.style.left = `-${distance}px`;
  //     gantEvents.style.left = `-${distance}px`;
  //     gantGridCols.style.left = `-${distance}px`;
  //     console.log('After: gantContainer.offsetLeft:', gantHeader.offsetLeft);
  //     this.posHome.offsetLeft = distance;

  //   }
  // }

  // public onPreviousSearchPosition(): void {
  //   // this.cdGanttHeader.nativeElement.scrollLeft -= 20;
  //   // const gantHeader = document.getElementById("cd-gantt-container");
  //   // gantHeader.scrollLeft += 20;
  // }

  // public onNextSearchPosition(): void {
  //   const gantHeader = document.getElementById("cdGanttHeader");
  //   gantHeader.scrollLeft += 20;
  // }

}
