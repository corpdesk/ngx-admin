import { Component, OnInit, ViewEncapsulation, ViewChild, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { TimeData, ScheduleSettings, ScheduleRegData, ScheduleView, ScheduleUpdateData, } from '../../../@cd/sys/scheduler/models/schedule.model';
import { ProjectService } from '../../../@cd/app/pms/controllers/project.service';
import { ScheduleService } from '../../../@cd/sys/scheduler/controllers/schedule.service';
import { TimeSpanComponent } from '../../cd-palette/time-span/time-span.component';
import { SocketIoService } from '../../../@cd/sys/cd-push/controllers/socket-io.service';
// import { GanttNineComponent } from '../../cd-palette/gantt-nine/gantt-nine.component';
import { NbStepperComponent } from '@nebular/theme';

import * as moment from 'moment';

const DATETIME_FORMAT = ScheduleSettings.DATETIME_FORMAT;
const DATE_FORMAT = ScheduleSettings.DATE_FORMAT;
const MODE_NEW = ScheduleSettings.MODE_NEW;
const MODE_EDIT = ScheduleSettings.MODE_EDIT;


@Component({
  selector: 'ngx-new-schedule',
  templateUrl: './new-schedule.component.html',
  styleUrls: ['./new-schedule.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class NewScheduleComponent implements OnInit {
  // pushChannel = 'pms';
  @ViewChild(TimeSpanComponent) compTs: TimeSpanComponent;
  @ViewChild('stepper') stepper: NbStepperComponent;
  // @ViewChild(GanttNineComponent) compGantt: GanttNineComponent;
  @Input() opMode = MODE_NEW;
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

  public editMode = false;

  constructor(
    private fb: FormBuilder,
    public svProject: ProjectService,
    public svSchedule: ScheduleService,
    public svSocket: SocketIoService,
  ) {

    this.frmRegSchedule = new FormGroup({
      project_id: new FormControl(),
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
    this.pushSubscribe();
  }

  pushSubscribe() {
    this.svSocket.listen('schedule-sync').subscribe(data => {
      console.log('NewScheduleComponent:schedule-sync event captured');
      console.log(data);
    });
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
    console.log('cDate:', cDate);
    console.log('frm.value.commence_date:', frm.value.commence_date);

    switch (step) {
      case 1:
        this.summary.project = this.selectedProj;
        this.summary.form = frm.value;
        if (typeof (cDate) == 'string') {
          this.summary.commence_date = cDate;
        }
        if (typeof (cDate) == 'object') {
          this.summary.commence_date = `${this.svSchedule.leading0(cDate.year)}-${this.svSchedule.leading0(cDate.month + 1)}-${cDate.date} 00:00:00`;
        }

        this.summary.scheduleStartEpoch = this.svSchedule.mysqlToEpoch(this.summary.commence_date);
        console.log('this.summary.scheduleStartEpoch:', this.summary.scheduleStartEpoch);
        const projStartDate = this.selectedProj['commence_date'];
        console.log('this.selectedProj:', this.selectedProj);
        console.log('projStartDate:', projStartDate);
        let projStartEpoch = this.svSchedule.mysqlToEpoch(projStartDate);
        console.log('projStartEpoch:', projStartEpoch);
        const projectStartMoment = this.svSchedule.epochToDateTime(projStartEpoch);
        this.summary.projectStartEpoch = projStartEpoch;
        break;
      case 2:
        this.summary.durationData = this.compTs.getData();
        this.summary.durationDisplay = this.compTs.getDisplay();
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
    this.svSchedule.registerScheduleObsv(this.summary.regData)
      .subscribe(
        (resp: any) => {
          console.log('NewScheduleComponent::registerSchedule()/this.svSchedule.registerScheduleObsv()/resp.data:', resp.data);
          console.log('resp.data:', resp.data);
        }
      );
  }

  resetTimeSpan() {
    this.compTs.reset();
  }

  getEndDate(startMoment, durationData): TimeData {
    let endMoment;
    endMoment = moment(startMoment).add(durationData.weeks, 'weeks');
    endMoment = moment(endMoment).add(durationData.days, 'days');
    endMoment = moment(endMoment).add(durationData.hrs, 'hours');
    endMoment = moment(endMoment).add(durationData.min, 'minutes');
    return endMoment.format(DATETIME_FORMAT);
  }

  selectedProjectData(projectID) {
    const ret = this.ProjectsData.filter((p) => {
      if (p.project_id == projectID) {
        return p;
      }
    });
    if (ret) {
      return ret[0];
    }
    else {
      return null;
    }

  }

  stepperNext() {
    this.stepper.next();
  }

  stepperPrev() {
    this.stepper.previous();
  }

  stepperGetCurrPage() {
    console.log('starting stepperGetPage()');
    console.log('this.stepper.steps:', this.stepper.steps);
    return this.stepper.selectedIndex;
  }

  stepperGetSteps() {
    console.log('starting stepperGetSteps()');
    console.log('this.stepper.steps:', this.stepper.steps);
    return this.stepper.steps;
  }

  stepperGoToFirst() {
    while (this.stepper.selectedIndex > 0) {
      this.stepper.previous();
    }
  }

  async stepperGoToLast() {
    console.log('starting stepperGoToLast()');
    const lastIndex = this.stepper.steps.length - 1;
    console.log('lastIndex:', lastIndex);
    let currIndex = this.stepper.selectedIndex;
    while (currIndex < lastIndex) {
      this.getParams(currIndex + 1, this.frmRegSchedule)
      this.stepper.next();
      currIndex = this.stepper.selectedIndex;
      console.log('currIndex:', currIndex);
      await this.delay(100);
    }
  }

  // for consumers to auto set data that can be used
  // to edit a schedule
  stepperSetData(scheduleData) {
    console.log('starting stepperSetData(scheduleData)');
    console.log('scheduleData:', scheduleData);
    this.selectedSchedule = scheduleData;
    this.stepperGoToFirst();
    // this.frmRegSchedule.controls.project_id.setValue(scheduleData.schedule.project_id);
    this.selectedProj = this.selectedProjectData(scheduleData[0].schedule.project_id);
    console.log('this.selectedProj:', this.selectedProj);
    this.frmRegSchedule.controls.schedule_name.setValue(scheduleData[0].taskName);
    this.frmRegSchedule.controls.schedule_description.setValue(scheduleData[0].schedule.schedule_description);
    this.setCommenceDate(scheduleData[0].schedule.commence_date);
    this.setDuration(scheduleData[0].schedule);
    this.stepperGoToLast();
  }

  setCommenceDate(d) {
    this.frmRegSchedule.patchValue({
      commence_date: moment(d, "YYYY/MM/DD")
    });
  }

  setDuration(s: ScheduleView) {
    this.compTs.frmTimeSpan.controls.durationMin.setValue(s.mins);
    this.compTs.frmTimeSpan.controls.durationHour.setValue(s.hrs);
    this.compTs.frmTimeSpan.controls.durationDay.setValue(s.days % 7);
    this.compTs.frmTimeSpan.controls.durationWeek.setValue(Math.floor(s.days / 7));
  }

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * {
        "ctx": "Sys",
        "m": "Scheduler",
        "c": "ScheduleController",
        "a": "actionUpdate",
        "dat": {
            "f_vals": [
                {
                    "filter": [
                        {
                            "field": "schedule_id",
                            "operator": "=",
                            "val": "104"
                        }
                    ],
                    "schedulestage": {
                        "days": "3",
                        "hrs": "16",
                        "schedulestage_name": "xxxx"
                    },
                    "data": {
                        "schedule_name": "nursury preparation",
                        "schedule_description": "testing description2"
                    }
                }
            ],
            "token": "mT6blaIfqWhzNXQLG8ksVbc1VodSxRZ8lu5cMgda"
        },
        "args": null
    }
   */
  updateSchedule() {
    console.log('starting updateSchedule()');
    console.log('this.summary.regData:', this.summary.regData);
    // this.pushSubscribe();
    const updateDate: ScheduleUpdateData = {
      filter: [
        {
          field: 'schedule_id',
          operator: '=',
          val: this.selectedSchedule[0].schedule.schedule_id
        }
      ],
      schedulestage: this.summary.regData.schedulestage,
      data: this.summary.regData.data,
    };
    console.log('updateDate:', updateDate);
    this.svSchedule.updateScheduleObsv(updateDate)
      .subscribe(
        (resp: any) => {
          console.log('NewScheduleComponent::updateSchedule()/this.svSchedule.registerScheduleObsv()/resp.data:', resp.data);
          console.log('resp.data:', resp.data);
          this.onUpdateResp(this.svSchedule.postData, resp);
        }
      );
  }

  // perform push notification message and update activity logs
  //  - redraw and open page with latest data without refresh 
  //  - supervisors and project members can monitor live logs of active work on going
  //  - without opening pms window, one can see notifications of on going work
  onUpdateResp(request, response) {
    const pushData = {
      req: request,
      resp: response,
      room: this.svProject.pushChannel
    };
    this.svSchedule.pushData('schedule-update', pushData);

  }

  isSaveMode(): boolean {
    if (this.editMode) {
      return false;
    } else if (this.validateSave()) {
      return true;
    }
  }

  isEditMode(): boolean {
    if (this.editMode && this.validateEdit()) {
      return true;
    }
  }

  /**
   * set validation rules
   */
  validateSave(): boolean {
    return true;
  }

  /**
   * set validation rules
   */
  validateEdit(): boolean {
    return true;
  }

}
