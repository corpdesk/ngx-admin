import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { TimeData } from '../../../@cd/sys/scheduler/models/schedule.model';

@Component({
  selector: 'ngx-time-span',
  templateUrl: './time-span.component.html',
  styleUrls: ['./time-span.component.scss']
})
export class TimeSpanComponent implements OnInit {
  @Output() sendSelData = new EventEmitter(); // used to sync sel items to consumer
  selectedItems: TimeData = {
    weeks: null,
    days: null,
    hrs: null,
    mins: null,
    secs: null,
  };

  selMin = 0;
  Min = '00';
  minutes = [];

  selHour = 0;
  Hour = '00';
  hours = [];

  selDay = 0;
  Day = '00';
  days = [];

  selWeek = 0;
  Week = '00';
  weeks = [];

  frmTimeSpan: FormGroup;

  constructor() {
    this.initData();
    this.initForms();
  }

  ngOnInit(): void {
    this.frmTimeSpan.controls.durationMin.setValue(this.Min);
    this.frmTimeSpan.controls.durationHour.setValue(this.Hour);
    this.frmTimeSpan.controls.durationDay.setValue(this.Day);
    this.frmTimeSpan.controls.durationWeek.setValue(this.Week);
  }

  initData() {
    // minute values: 00-60
    let index = 0;
    while (index < 60) {
      let value = String(index);
      if (index < 10) {
        value = '0' + value;
      }
      const min = { i: index, val: value };
      this.minutes.push(min);
      this.hours.push(min);
      index++;
    }

    // hour values: 00-24
    index = 0;
    while (index < 25) {
      let value = String(index);
      if (index < 10) {
        value = '0' + value;
      }
      const min = { i: index, val: value };
      this.hours.push(min);
      index++;
    }

    // day values: 00-07
    index = 0;
    while (index < 8) {
      let value = String(index);
      if (index < 10) {
        value = '0' + value;
      }
      const min = { i: index, val: value };
      this.days.push(min);
      index++;
    }

    // week values: 00-04
    index = 0;
    while (index < 500) {
      let value = String(index);
      if (index < 10) {
        value = '0' + value;
      }
      const min = { i: index, val: value };
      this.weeks.push(min);
      index++;
    }

    console.log('this.minutes:', this.minutes);

  }

  initForms() {
    this.frmTimeSpan = new FormGroup({
      commence_date: new FormControl(),
      durationMin: new FormControl(),
      durationHour: new FormControl(),
      durationDay: new FormControl(),
      durationWeek: new FormControl(),
      duration: new FormControl(),
    });
  }

  increment(unit) {
    console.log('increment/this.selMin:', this.selMin);
    switch (unit) {
      case 'min':
        if (this.selMin >= 0 && this.selMin < 59) {
          this.selMin++;
          this.Min = this.minutes[this.selMin].val;
          this.frmTimeSpan.controls.durationMin.setValue(this.Min);
        }
        break;
      case 'hour':
        if (this.selHour >= 0 && this.selHour < 59) {
          this.selHour++;
          this.Hour = this.hours[this.selHour].val;
          this.frmTimeSpan.controls.durationHour.setValue(this.Hour);
        }
        break;
      case 'day':
        if (this.selDay >= 0 && this.selDay < 7) {
          this.selDay++;
          this.Day = this.minutes[this.selDay].val;
          this.frmTimeSpan.controls.durationDay.setValue(this.Day);
        }
        break;
      case 'week':
        if (this.selWeek >= 0) {
          this.selWeek++;
          this.Week = this.weeks[this.selWeek].val;
          this.frmTimeSpan.controls.durationWeek.setValue(this.Week);
        }
        break;
    }
  }

  decrement(unit) {
    switch (unit) {
      case 'min':
        if (this.selMin >= 1 && this.selMin < 60) {
          this.selMin--;
          this.Min = this.minutes[this.selMin].val;
          this.frmTimeSpan.controls.durationMin.setValue(this.Min);
        }
        break;
      case 'hour':
        if (this.selHour >= 1 && this.selHour < 60) {
          this.selHour--;
          this.Hour = this.hours[this.selHour].val;
          this.frmTimeSpan.controls.durationHour.setValue(this.Hour);
        }
        break;
      case 'day':
        if (this.selDay >= 1 && this.selDay < 8) {
          this.selDay--;
          this.Day = this.days[this.selDay].val;
          this.frmTimeSpan.controls.durationDay.setValue(this.Day);
        }
        break;
      case 'week':
        if (this.selWeek >= 1) {
          this.selWeek--;
          this.Week = this.weeks[this.selWeek].val;
          this.frmTimeSpan.controls.durationWeek.setValue(this.Week);
        }
        break;
    }
  }

  async changeMin() {
    console.log(this.frmTimeSpan.controls.durationMin.value);
    const newVal = this.frmTimeSpan.controls.durationMin.value;
    console.log('changeMin/newVal:', newVal);
    const validated = await this.validateMin(newVal);
    this.sendSelData.emit(validated);
    console.log('changeMin/validated:', validated);
    this.selMin = validated;
    this.Min = await this.minutes[this.selMin].val;
    this.frmTimeSpan.controls.durationMin.setValue(this.Min);
    console.log('changeMin/this.selMin:', this.selMin);
  }

  validateMin(val) {
    console.log('validateMin/val:', val);
    let ret = 0;
    if (this.isInt(val)) {
      console.log('validateMin/1:');
      if (Number(val) > 60) {
        console.log('validateMin/2:');
        // const toHours = this.getTimeFromMins(Number(val));
        const mins = Number(val);
        const display: TimeData = this.secondsToDhms(mins * 60);
        // moment.utc(moment.duration(4500, "seconds").asMilliseconds()).format("HH:mm")
        // const toHours = moment().startOf('day').add(Number(val), 'minutes').format('hh:mm A');
        console.log('toHours:', display);
        this.sendSelData.emit(display);
        if (display.hrs > 0) {
          this.frmTimeSpan.controls.durationHour.setValue(this.formatTimeData(display.hrs));
        }
        if (display.days > 0) {
          this.frmTimeSpan.controls.durationDay.setValue(this.formatTimeData(display.days));
        }
        if (display.weeks > 0) {
          this.frmTimeSpan.controls.durationWeek.setValue(this.formatTimeData(display.weeks));
        }
        ret = display.mins;
      }
      console.log('validateMin/3:');
      if (Number(val) < 0) {
        console.log('validateMin/4:');
        ret = 0;
      }
      console.log('validateMin/5:');
      if (Number(val) >= 0 && Number(val) < 60) {
        console.log('validateMin/6:');
        ret = Number(val);
      }
      return ret;
    } else {
      console.log('validateMin/ret:', ret);
      return ret;
    }

  }

  async changeHour() {
    console.log('starting changeHour()');
    console.log(this.frmTimeSpan.controls.durationHour.value);
    const newVal = this.frmTimeSpan.controls.durationHour.value;
    console.log('changeHour/newVal:', newVal);
    const validated = await this.validateHour(newVal);
    console.log('changeHour/validated:', validated);
    this.sendSelData.emit(validated);
    console.log('changeHour/validated:', validated);
    this.selHour = validated;
    this.Hour = await this.hours[this.selHour].val;
    this.frmTimeSpan.controls.durationHour.setValue(this.Hour);
    console.log('changeHour/this.selMin:', this.selHour);
  }

  validateHour(val) {
    console.log('validateHour/val:', val);
    let currentWeekVal = Number(this.frmTimeSpan.controls.durationWeek.value);
    let currentDayVal = Number(this.frmTimeSpan.controls.durationDay.value);
    let ret = 0;
    if (this.isInt(val)) {
      console.log('validateHour/1:');
      if (Number(val) > 24) {
        console.log('validateHour/2:');
        const hours = Number(val);
        const display = this.secondsToDhms(hours * 60 * 60);
        console.log('display:', display);
        if (display.days > 0) {
          display.days = display.days + currentDayVal;
          this.frmTimeSpan.controls.durationDay.setValue(this.formatTimeData(display.days));
        }
        if (display.weeks > 0) {
          display.weeks = display.weeks + currentWeekVal;
          this.frmTimeSpan.controls.durationWeek.setValue(this.formatTimeData(display.weeks));
        }
        ret = display.hrs;
      }
      console.log('validateHour/3:');
      if (Number(val) < 0) {
        console.log('validateHour/4:');
        ret = 0;
      }
      console.log('validateHour/5:');
      if (Number(val) >= 0 && Number(val) < 24) {
        console.log('validateHour/6:');
        ret = Number(val);
      }
      return ret;
    } else {
      console.log('validateHour/ret:', ret);
      return ret;
    }

  }

  async changeDay() {
    console.log(this.frmTimeSpan.controls.durationDay.value);
    const newVal = this.frmTimeSpan.controls.durationDay.value;
    console.log('changeDay/newVal:', newVal);
    const validated = await this.validateDay(newVal);
    this.sendSelData.emit(validated);
    console.log('changeDay/validated:', validated);
    this.selDay = validated;
    this.Day = await this.days[this.selDay].val;
    this.frmTimeSpan.controls.durationDay.setValue(this.Day);
    console.log('changeDay/this.selDay:', this.selDay);
  }

  validateDay(val) {
    console.log('validateDay/val:', val);
    let currentWeekVal = Number(this.frmTimeSpan.controls.durationWeek.value);
    let ret = 0;
    if (this.isInt(val)) {
      console.log('validateDay/1:');
      if (Number(val) > 7) {
        console.log('validateDay/2:');
        const days = Number(val);
        const display = this.secondsToDhms(days * 60 * 60 * 24);
        console.log('display:', display);
        if (display.weeks > 0) {
          display.weeks = display.weeks + currentWeekVal;
          this.frmTimeSpan.controls.durationWeek.setValue(this.formatTimeData(display.weeks));
        }
        ret = display.days;
      }
      console.log('validateDay/3:');
      if (Number(val) < 0) {
        console.log('validateDay/4:');
        ret = 0;
      }
      console.log('validateDay/5:');
      if (Number(val) >= 0 && Number(val) < 7) {
        console.log('validateDay/6:');
        ret = Number(val);
      }
      return ret;
    } else {
      console.log('validateDay/ret:', ret);
      return ret;
    }

  }

  async changeWeek() {
    console.log(this.frmTimeSpan.controls.durationWeek.value);
    const newVal = this.frmTimeSpan.controls.durationWeek.value;
    console.log('changeWeek/newVal:', newVal);
    const validated = await this.validateWeek(newVal);
    this.sendSelData.emit(validated);
    console.log('changeWeek/validated:', validated);
    this.selWeek = validated;
    this.Week = await this.weeks[this.selWeek].val;
    this.frmTimeSpan.controls.durationWeek.setValue(this.Week);
    console.log('changeWeek/this.selWeek:', this.selWeek);
  }

  validateWeek(val) {
    console.log('validateWeek/val:', val);
    let ret = 0;
    if (this.isInt(val)) {
      console.log('validateWeek/1:');
      if (Number(val) > 500) {
        console.log('validateWeek/2:');
        const weeks = Number(val);
        const display = this.secondsToDhms(weeks * 60 * 60 * 24 * 7);
        console.log('display:', display);
        ret = display.weeks;
      }
      console.log('validateWeek/3:');
      if (Number(val) < 0) {
        console.log('validateWeek/4:');
        ret = 0;
      }
      console.log('validateWeek/5:');
      if (Number(val) >= 0 && Number(val) < 500) {
        console.log('validateWeek/6:');
        ret = Number(val);
      }
      return ret;
    } else {
      console.log('validateWeek/ret:', ret);
      return ret;
    }

  }

  isInt(value) {
    if (isNaN(value)) {
      return false;
    }
    var x = parseFloat(value);
    return (x | 0) === x;
  }

  getTimeFromMins(mins) {
    // do not include the first validation check if you want, for example,
    // getTimeFromMins(1530) to equal getTimeFromMins(90) (i.e. mins rollover)
    // if (mins >= 24 * 60 || mins < 0) {
    //   throw new RangeError("Valid input should be greater than or equal to 0 and less than 1440.");
    // }
    // var h = mins / 60 | 0,
    //   m = mins % 60 | 0;
    // return moment.utc().hours(h).minutes(m).format("hh:mm A");

    console.log('opt1:', this.secondsToDhms(mins * 60))

    var hours = Math.floor(mins / 60);
    var minutes = mins % 60;
    return { hrs: hours, mins: minutes };
  }

  secondsToDhms(seconds): TimeData {
    console.log('starting secondsToDhms(seconds)');
    seconds = Number(seconds);
    
    console.log('seconds:', seconds);
    let y = Math.floor(seconds / (3600 * 24 * 365));
    console.log('y:', y);
    let mth = Math.floor(seconds / (3600 * 24 * 30));
    console.log('mth:', mth);
    let w = Math.floor(seconds / (3600 * 24 * 7));
    console.log('w:', w);
    let d = Math.floor(seconds / (3600 * 24)) % 7;
    console.log('d1:', d);
    let h = Math.floor(seconds % (3600 * 24)/3600);
    console.log('h:', h);
    // let d;
    // const splitFromDay = this.splitDays(seconds/(3600 * 24));
    // if (splitFromDay.weeks >= 1) {
    //   w = splitFromDay.weeks;
    //   d = splitFromDay.days;
    // } else {
    //   d = 0;
    // }
    // console.log('d:', d);
    // let h = Math.floor(seconds % (3600 * 24));
    // let h;
    // const splitFromHr = this.splitHours(seconds / 3600);
    // if (splitFromHr.hrs >= 1) {
    //   h = splitFromHr.hrs;
    //   d = splitFromHr.days;
    // } else {
    //   h = 0;
    // }
    console.log('h:', h);
    let m = Math.floor(seconds % 3600 / 60);
    console.log('m:', m);
    let s = Math.floor(seconds % 60);
    console.log('s:', s);

    // var dTimeData = d > 0 ? d + (d == 1 ? " day, " : " days, ") : "";
    // var hTimeData = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
    // var mTimeData = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "";
    // var sTimeData = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
    // return {d: dTimeData, h: hTimeData, m: mTimeData, s: sTimeData};
    return { weeks: w, days: d, hrs: h, mins: m, secs: s };
  }

  splitHours(numberOfHours): TimeData {
    console.log('starting splitHours(numberOfHours)');
    let Days = Math.floor(numberOfHours / 24);
    let Remainder = numberOfHours % 24;
    let Hours = Math.floor(Remainder);
    let Minutes = Math.floor(60 * (Remainder - Hours));
    const ret = { weeks: 0, days: Days, hrs: Hours, mins: Minutes, secs: 0 };
    console.log('ret:', ret);
    return ret;
  }

  splitDays(days): TimeData {
    console.log('starting splitDays(days)');
    console.log('days:', days);
    let Weeks = Math.floor(days / 7);
    console.log('Weeks:', Weeks);
    let Days = days % 7;
    console.log('Days:', Days);
    const ret = {
      weeks: Weeks,
      days: Days,
      hrs: 0, mins: 0, secs: 0
    };
    console.log('ret:', ret);
    return ret;
  }

  public getData(): TimeData{
    console.log('starting getData()');
    console.log('this.frmTimeSpan.controls.durationHour.value:', this.frmTimeSpan.controls.durationHour.value);
    return { 
      weeks: Number(this.frmTimeSpan.controls.durationWeek.value), 
      days: Number(this.frmTimeSpan.controls.durationDay.value), 
      hrs: Number(this.frmTimeSpan.controls.durationHour.value), 
      mins: Number(this.frmTimeSpan.controls.durationMin.value), 
      secs: 0 
    }
  }

  public getDisplay(){
    return `weeks: ${this.frmTimeSpan.controls.durationWeek.value}, days: ${this.frmTimeSpan.controls.durationDay.value}, hrs: ${this.frmTimeSpan.controls.durationHour.value}, mins: ${this.frmTimeSpan.controls.durationMin.value}`;
  }

  public reset() {
    this.frmTimeSpan.controls.durationMin.setValue('00');
    this.frmTimeSpan.controls.durationHour.setValue('00');
    this.frmTimeSpan.controls.durationDay.setValue('00');
    this.frmTimeSpan.controls.durationWeek.setValue('00');
    this.selMin = 0;
    this.selHour = 0;
    this.selDay = 0;
    this.selWeek = 0;
  }

  formatTimeData(val) {
    if (val > -1 && val < 10) {
      return '0' + String(val);
    } else {
      return String(val);
    }
  }

}
