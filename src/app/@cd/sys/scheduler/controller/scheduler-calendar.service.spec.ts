import { TestBed } from '@angular/core/testing';

import { SchedulerCalendarService } from './scheduler-calendar.service';

describe('SchedulerCalendarService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SchedulerCalendarService = TestBed.get(SchedulerCalendarService);
    expect(service).toBeTruthy();
  });
});
