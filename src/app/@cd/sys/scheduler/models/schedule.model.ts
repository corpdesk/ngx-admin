import { Injectable } from '@angular/core';

export interface timeData {
  wk: number;
  day: number;
  hr: number;
  min: number;
  sec: number;
}

export class ScheduleSettings {
  public static TIME_FORMAT ='HH:mm:ss';
  public static DATE_FORMAT ='DD-MM-YYYY';
  public static DATETIME_FORMAT ='DD-MM-YYYY HH:mm:ss';
}

