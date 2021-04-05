import { TestBed } from '@angular/core/testing';

import { PmsInteRactService } from './pms-inte-ract.service';

describe('PmsInteRactService', () => {
  let service: PmsInteRactService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PmsInteRactService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
