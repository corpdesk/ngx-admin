import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { timeData, ScheduleSettings } from '../../../@cd/sys/scheduler/models/schedule.model';
import { ProjectService } from '../../../@cd/app/pms/controllers/project.service';
import { ScheduleService } from '../../../@cd/sys/scheduler/controllers/schedule.service';
import { TimeSpanComponent } from '../../cd-palette/time-span/time-span.component';

import * as moment from 'moment';

const DATETIME_FORMAT = ScheduleSettings.DATETIME_FORMAT;
const TIME_FORMAT = ScheduleSettings.TIME_FORMAT;
const DATE_FORMAT = ScheduleSettings.DATE_FORMAT;

@Component({
  selector: 'ngx-new-schedule',
  templateUrl: './new-schedule.component.html',
  styleUrls: ['./new-schedule.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class NewScheduleComponent implements OnInit {
  @ViewChild(TimeSpanComponent) ts: TimeSpanComponent;
  linearMode = true;
  regScheduleInvalid = false;
  startDate = new Date();
  selDuration: timeData;
  summary = {
    project: null,
    form: null,
    projectStartEpoch: null,
    commence_date: null,
    durationData: null,
    durationDisplay: null,
    end_date: null,
  };
  submitted = false;
  frmRegSchedule: FormGroup;
  frmRegMenu: FormGroup;
  postData;
  errMsg;

  // select project params
  fetchProjData = 'getProjectsObsv'; // server method for fetching
  isInvalidSelProj = true;
  selectedProj = [];
  Projects = [{}];
  projNameField = 'project_name';
  projIdField = 'project_id';
  ProjectsData;

  // select schedule params
  fetchScheduleData = 'getScheduleObsv'; // server method for fetching
  isInvalidSelSchedule = true;
  selectedSchedule = [];
  Schedules = [{}];
  scheduleNameField = 'schedule_name';
  scheduleIdField = 'schedule_id';
  ScheduleData;

  constructor(
    private fb: FormBuilder,
    public svProject: ProjectService,
    public svSchedule: ScheduleService,
  ) {

    this.frmRegSchedule = new FormGroup({
      schedule_name: new FormControl(),
      commence_date: new FormControl(),
    });

    this.frmRegMenu = new FormGroup({
      menu_name: new FormControl(),
    });

    this.svProject.getProjectsObsv()
      .subscribe(
        (resp: any) => {
          console.log('ProjectComponents::constructor()/this.svProject.getProjectsObsv()/resp.data:', resp.data);
          this.ProjectsData = resp.data;
        }
      );

    this.svSchedule.getScheduleObsv()
      .subscribe(
        (resp: any) => {
          console.log('ProjectComponents::constructor()/this.svSchedule.getScheduleObsv()/resp.data:', resp.data);
          this.ScheduleData = resp.data;
        }
      );
  }

  ngOnInit(): void {
    this.initForms();
  }

  initForms() {
    this.frmRegSchedule = this.fb.group({
      schedule_name: ['', Validators.required],
      schedule_description: ['',],
      commence_date: ['',],
    });
  }

  getSelectedProj(selProj) {
    console.log('selProj:', selProj);
    this.selectedProj = selProj;
  }

  getSelectedDuration(selDuration) {
    console.log('selDuration:', selDuration);
    this.selDuration = selDuration;
    console.log('this.selDuration:', this.selDuration);
  }

  getParams(step, frm) {
    const cDate = frm.value.commence_date._i;
    switch (step) {
      case 1:
        this.summary.project = this.selectedProj;
        this.summary.form = frm.value;
        this.summary.commence_date = `${cDate.date}-${this.svSchedule.leading0(cDate.month)}-${this.svSchedule.leading0(cDate.year)} 00:00:00`;
        const projStartDate = this.summary.project.commence_date;
        let projStartEpoch = this.mysqlToEpoch(projStartDate);
        const projectStartMoment = this.epochToDateTime(projStartEpoch);
        this.summary.projectStartEpoch = projStartEpoch;
        this.summary.project.commence_date = projectStartMoment;
        break;
      case 2:
        this.summary.durationData = this.ts.getData();
        this.summary.durationDisplay = this.ts.getDisplay();
        break;
    }

    if (frm.value.commence_date) {
      const cDateStr = moment(frm.value.commence_date).format(DATE_FORMAT);
      const startMoment = moment(frm.value.commence_date);
      const durationData = this.summary.durationData;
      if (durationData) {
        this.summary.end_date = this.getEndDate(startMoment, durationData);
      }
    }
  }

  registerSchedule(frm: FormGroup) {
    console.log(frm);
  }

  resetTimeSpan() {
    this.ts.reset();
  }

  mysqlToEpoch(mysqlTime) {
    return new Date(mysqlTime.replace(' ', 'T')).getTime() / 1000;
  }

  epochToDateTime(epoch) {
    return moment.unix(epoch).format(DATETIME_FORMAT);
  }

  getEndDate(startMoment, durationData) {
    let endMoment;
    endMoment = moment(startMoment).add(durationData.wk, 'weeks');
    endMoment = moment(endMoment).add(durationData.day, 'days');
    endMoment = moment(endMoment).add(durationData.hr, 'hours');
    endMoment = moment(endMoment).add(durationData.min, 'minutes');
    return endMoment.format(DATETIME_FORMAT);
  }

}
