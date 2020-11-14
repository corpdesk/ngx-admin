import { TestBed } from '@angular/core/testing';

import { ScheduleActionService } from './schedule-action.service';

describe('ScheduleActionService', () => {
  let service: ScheduleActionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScheduleActionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
