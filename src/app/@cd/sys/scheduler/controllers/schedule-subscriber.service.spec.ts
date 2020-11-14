import { TestBed } from '@angular/core/testing';

import { ScheduleSubscriberService } from './schedule-subscriber.service';

describe('ScheduleSubscriberService', () => {
  let service: ScheduleSubscriberService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScheduleSubscriberService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
