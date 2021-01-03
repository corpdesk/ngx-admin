import { TestBed } from '@angular/core/testing';

import { InteRactService } from './inte-ract.service';

describe('InteRactService', () => {
  let service: InteRactService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InteRactService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
