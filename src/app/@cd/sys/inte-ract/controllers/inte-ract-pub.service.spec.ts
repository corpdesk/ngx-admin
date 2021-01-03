import { TestBed } from '@angular/core/testing';

import { InteRactPubService } from './inte-ract-pub.service';

describe('InteRactPubService', () => {
  let service: InteRactPubService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InteRactPubService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
