import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProjectService } from '../../../@cd/app/pms/controllers/project.service';
import { ScheduleService } from '../../../@cd/sys/scheduler/controllers/schedule.service';

@Component({
  selector: 'ngx-project-register',
  templateUrl: './project-register.component.html',
  styleUrls: ['./project-register.component.scss']
})
export class ProjectRegisterComponent implements OnInit {
  linearMode = true;
  frmRegProject: FormGroup;
  isInvalidRegProject = true;
  successRegProject = false;
  regDataProject = { module_name: '', is_sys_module: '' };
  newProject: any;
  regDataSchedule: any;
  newSchedule: any;
  regProjectAffectedRows: any;
  isInvalidRegSchedule = true;
  successRegSchedule = false;
  frmRegSchedule: FormGroup;
  regScheduleAffectedRows: any;
  currentSchedule: any;

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

  ngOnInit() {
    this.initForms();
  }

  initForms() {
    this.frmRegProject = this.fb.group({
      project_name: ['', Validators.required]
    });
    this.frmRegSchedule = this.fb.group({
      schedule_name: ['', Validators.required],
      schedule_description: ['',],
    });
  }

  /* Handle form errors in Angular 8 */
  public errorHandling = (frm, control: string, error: string) => {
    return frm.controls[control].hasError(error);
  }

  // get dataControls() {
  //   return this.frmRegProject.controls;
  // }

  submitProjectForm(frm: FormGroup) {
    console.log('starting submitProjectForm(frm: FormGroup)')
    console.log('frm.value:', frm.value);
    this.regDataProject = frm.value;
    if (frm.invalid) {
      this.isInvalidRegProject = true;
    } else {
      this.svProject.registerProjectObsv(frm.value)
        .subscribe((resp: any) => {
          console.log('resp:', resp);
          if (resp.app_state.success > 0) {
            this.successRegProject = true;
            this.newProject = resp.data.newProject[0];
            this.regProjectAffectedRows = resp.data.affectedRows;
            console.log('this.newProject:', this.newProject);
            console.log('this.regProjectAffectedRows:', this.regProjectAffectedRows);
          }
        });
    }

  }

  scheduleParentId() {
    console.log('starting scheduleParentId()')
    const parentSchedule = this.regProjectAffectedRows.filter(affrectedRow => affrectedRow.m == 'schedule');
    return parentSchedule[0].rowID;
  }

  submitScheduleForm(frm: FormGroup) {
    console.log('frm.value:', frm.value);
    this.regDataSchedule = frm.value;
    console.log('this.newProject:', this.newProject);
    const project_id = this.newProject.project_id;
    console.log('project_id:', project_id);

    const regDataSchedule = {
      schedule_name: this.regDataSchedule.schedule_name,
      schedule_description: this.regDataSchedule.schedule_description,
      active: true
    };

    if (frm.invalid) {
      console.log('form is invalid');
      this.isInvalidRegSchedule = true;
    } else {
      console.log('frm.value:', frm.value);

      this.svSchedule.registerScheduleObsv(regDataSchedule)
        .subscribe((resp: any) => {
          console.log('resp:', resp);
          if (resp.app_state.success > 0) {
            this.successRegSchedule = true;
            this.newSchedule = resp.data.newSchedule[0];
            this.regScheduleAffectedRows = resp.data.affectedRows;
            this.currentSchedule = resp.data.currentSchedule;
            console.log('this.newSchedule:', this.newSchedule);
            console.log('this.regScheduleAffectedRows:', this.regScheduleAffectedRows);
          }
        });
    }
  }

  getSelectedProj(selProj) {
    console.log('selProj:', selProj);
    this.selectedProj = selProj;
  }

  // getSelectedSchedule
  getSelectedSchedule(selSchedule) {
    console.log('selProj:', selSchedule);
    this.selectedSchedule = selSchedule;
  }
}
