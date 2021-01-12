import { UpdateFilterItem } from '../../../base/b.model';

export interface Schedule {
  schedule_id?: number;
  schedule_name?: number;
  schedule_description?: number;
  doc_id?: number;
  init_stage_id?: number;
  max_participants?: number;
  min_participants?: number;
  project_id?: number;
  consumer_guid?: number;
  active?: number;
  schedule_guid?: number;
  commence_date?: number;
}

export interface ScheduleStage {
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
  stage_timeout?: number;
  schedulestage_guid?: string;
}

export interface TimeData {
  weeks?: number;
  days?: number;
  hrs?: number;
  mins?: number;
  secs?: number;
}

export interface ScheduleRegData {
  schedulestage: ScheduleStage,
  data: Schedule;
}

export interface ScheduleUpdateData {
  filter: UpdateFilterItem[];
  schedulestage?: ScheduleStage;
  data?: ScheduleStage;
}

export interface ScheduleView {
  active?: any;
  calendar_next_stage?: number;
  commence_date?: string;
  consumer_guid?: string;
  days?: number;
  doc_id?: number;
  duration?: number;
  duration_unit?: any;
  hrs?: number;
  init_stage_id?: number;
  max_participants?: number;
  min_participants?: number;
  mins?: number;
  project_description?: string;
  project_guid?: string;
  project_id?: number;
  project_name?: string;
  proj_commence_date?: string;
  reminder_stage_id?: number;
  schedule_condition_id?: number;
  schedule_description?: string;
  schedule_guid?: string;
  schedule_id?: number;
  schedule_name?: string;
  schedulecomm_id?: number;
  schedule_cost?: number;
  schedulestage_description?: string;
  schedulestage_duration2next?: number;
  schedulestage_duration2previous?: number;
  schedulestage_guid?: string;
  schedulestage_id?: number;
  schedulestage_is_conditional?: any;
  schedulestage_msg?: string;
  schedulestage_name?: string;
  schedulestage_next?: number;
  schedulestage_order?: number;
  schedulestage_previous?: number;
  secs?: number;
  stage_timeout?: number;
  static_time_based?: any;
  time_based_order?: number;
  ussd_menu_id?: number;
}

export class ScheduleSettings {
  public static TIME_FORMAT = 'HH:mm:ss';
  public static DATE_FORMAT = 'DD-MM-YYYY';
  public static DATETIME_FORMAT = 'DD-MM-YYYY HH:mm:ss';
  public static CURRENCY = 'KES';
  public static MODE_NEW = 1;
  public static MODE_EDIT = 2;
}

