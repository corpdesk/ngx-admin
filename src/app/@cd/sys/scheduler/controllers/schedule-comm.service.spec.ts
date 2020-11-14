import { TestBed } from '@angular/core/testing';

import { ScheduleCommService } from './schedule-comm.service';

describe('ScheduleCommService', () => {
  let service: ScheduleCommService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScheduleCommService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
