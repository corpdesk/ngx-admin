import { Injectable } from '@angular/core';

export interface TimeData {
  weeks?: number;
  // day: number;
  // hr: number;
  // min: number;
  // sec: number;
  days?: number;
  hrs?: number;
  mins?: number;
  secs?: number;
}

export interface ScheduleRegData {
  schedulestage: {
    schedulestage_id?: number;
    schedule_id?: number;
    schedulestage_name?: string;
    schedulestage_description?: string;
    schedulestage_next?: number;
    reminder_stage_id?: number;
    schedulestage_previous?: number;
    schedulestage_duration2next?: number;
    schedulestage_duration2previous?: number;
    schedulestage_msg?: string;
    schedulestage_order?: number;
    schedulestage_is_conditional?: any;
    schedule_condition_id?: number;
    doc_id?: number;
    schedulecomm_id?: number;
    static_time_based?: any;
    days?: number;
    hrs?: number;
    mins?: number;
    secs?: number;
    time_based_order?: number;
    ussd_menu_id?: number;
    calendar_next_stage?: number;
    stage_timeout?: any;
    schedulestage_guid?: string;
  },
  data: {
    schedule_id?: number;
    schedule_name?: string;
    schedule_description?: string;
    doc_id?: number;
    init_stage_id?: number;
    max_participants?: number;
    min_participants?: number;
    project_id?: number;
    consumer_guid?: string;
    active?: number;
    schedule_guid?: string;
    commence_date?: string;
  }
}

export interface ScheduleView {
  active: any;
  calendar_next_stage: number;
  commence_date: string;
  consumer_guid: string;
  days: number;
  doc_id: number;
  duration: number;
  duration_unit: any;
  hrs: number;
  init_stage_id: number;
  max_participants: number;
  min_participants: number;
  mins: number;
  project_description: string;
  project_guid: string;
  project_id: number;
  project_name: string;
  reminder_stage_id: number;
  schedule_condition_id: number;
  schedule_description: string;
  schedule_guid: string;
  schedule_id: number;
  schedule_name: string;
  schedulecomm_id: number;
  schedulestage_description: string;
  schedulestage_duration2next: number;
  schedulestage_duration2previous: number;
  schedulestage_guid: string;
  schedulestage_id: number;
  schedulestage_is_conditional: any;
  schedulestage_msg: string;
  schedulestage_name: string;
  schedulestage_next: number;
  schedulestage_order: number;
  schedulestage_previous: number;
  secs: number;
  stage_timeout: number;
  static_time_based: any;
  time_based_order: number;
  ussd_menu_id: number;
}

export class ScheduleSettings {
  public static TIME_FORMAT = 'HH:mm:ss';
  public static DATE_FORMAT = 'DD-MM-YYYY';
  public static DATETIME_FORMAT = 'DD-MM-YYYY HH:mm:ss';
}

