import { TestBed } from '@angular/core/testing';

import { ScheduleProcessorService } from './schedule-processor.service';

describe('ScheduleProcessorService', () => {
  let service: ScheduleProcessorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScheduleProcessorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
