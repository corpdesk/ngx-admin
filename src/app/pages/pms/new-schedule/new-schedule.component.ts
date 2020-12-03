import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { TimeData, ScheduleSettings, ScheduleRegData } from '../../../@cd/sys/scheduler/models/schedule.model';
import { ProjectService } from '../../../@cd/app/pms/controllers/project.service';
import { ScheduleService } from '../../../@cd/sys/scheduler/controllers/schedule.service';
import { TimeSpanComponent } from '../../cd-palette/time-span/time-span.component';

import * as moment from 'moment';

const DATETIME_FORMAT = ScheduleSettings.DATETIME_FORMAT;
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
  selDuration: TimeData;
  summary = {
    project: null,
    form: null,
    projectStartEpoch: null,
    scheduleStartEpoch: null,
    commence_date: null,
    durationData: null,
    durationDisplay: null,
    end_date: null,
    regData: null,
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
      schedule_description: new FormControl(),
    });

    this.frmRegMenu = new FormGroup({
      menu_name: new FormControl(),
    });

    this.svProject.getProjectsObsv()
      .subscribe(
        (resp: any) => {
          console.log('NewScheduleComponent::constructor()/this.svProject.getProjectsObsv()/resp.data:', resp.data);
          this.ProjectsData = resp.data;
        }
      );

    this.svSchedule.getScheduleObsv()
      .subscribe(
        (resp: any) => {
          console.log('NewScheduleComponent::constructor()/this.svSchedule.getScheduleObsv()/resp.data:', resp.data);
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
    this.selectedProj = selProj;
  }

  getSelectedDuration(selDuration) {
    this.selDuration = selDuration;
  }

  getParams(step, frm) {
    console.log('starting getParams(step,frm)');
    let cDate = frm.value.commence_date._i;

    switch (step) {
      case 1:
        this.summary.project = this.selectedProj;
        this.summary.form = frm.value;
        this.summary.commence_date = `${this.svSchedule.leading0(cDate.year)}-${this.svSchedule.leading0(cDate.month + 1)}-${cDate.date} 00:00:00`;
        this.summary.scheduleStartEpoch = this.svSchedule.mysqlToEpoch(this.summary.commence_date);
        const projStartDate = this.selectedProj['commence_date'];
        let projStartEpoch = this.svSchedule.mysqlToEpoch(projStartDate);
        const projectStartMoment = this.svSchedule.epochToDateTime(projStartEpoch);
        this.summary.projectStartEpoch = projStartEpoch;
        break;
      case 2:
        this.summary.durationData = this.ts.getData();
        this.summary.durationDisplay = this.ts.getDisplay();
        this.setRegData();
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

  setRegData() {
    console.log('starting setRegData()');
    let regData: ScheduleRegData = {
      schedulestage: {
        static_time_based: null,
        days: null,
        hrs: null,
        mins: null,
        secs: null,
      },
      data: {
        schedule_name: null,
        project_id: null,
        commence_date: null,
        schedule_description: null,
      }
    };

    regData.schedulestage.static_time_based = true;
    regData.schedulestage.mins = this.summary.durationData.mins;
    regData.schedulestage.hrs = this.summary.durationData.hrs;
    regData.schedulestage.days = this.summary.durationData.days + (this.summary.durationData.weeks * 7);
    regData.data.schedule_name = this.summary.form.schedule_name;
    regData.data.project_id = this.summary.project.project_id;
    regData.data.commence_date = this.summary.form.commence_date;
    regData.data.schedule_description = this.summary.form.schedule_description;
    this.summary.regData = regData;
  }

  registerSchedule() {
    console.log('starting registerSchedule()');
    console.log('')
    this.svSchedule.registerScheduleObsv(this.summary.regData)
      .subscribe(
        (resp: any) => {
          console.log('NewScheduleComponent::registerSchedule()/this.svSchedule.registerScheduleObsv()/resp.data:', resp.data);
          console.log('resp.data:', resp.data);
        }
      );
  }

  resetTimeSpan() {
    this.ts.reset();
  }

  getEndDate(startMoment, durationData): TimeData {
    let endMoment;
    endMoment = moment(startMoment).add(durationData.weeks, 'weeks');
    endMoment = moment(endMoment).add(durationData.days, 'days');
    endMoment = moment(endMoment).add(durationData.hrs, 'hours');
    endMoment = moment(endMoment).add(durationData.min, 'minutes');
    return endMoment.format(DATETIME_FORMAT);
  }

}
