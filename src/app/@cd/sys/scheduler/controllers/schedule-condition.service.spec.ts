import { TestBed } from '@angular/core/testing';

import { ScheduleConditionService } from './schedule-condition.service';

describe('ScheduleConditionService', () => {
  let service: ScheduleConditionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScheduleConditionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
