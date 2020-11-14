import { TestBed } from '@angular/core/testing';

import { ScheduleStageService } from './schedule-stage.service';

describe('ScheduleStageService', () => {
  let service: ScheduleStageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScheduleStageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
