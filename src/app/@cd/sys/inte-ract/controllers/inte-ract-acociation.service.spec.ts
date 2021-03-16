import { TestBed } from '@angular/core/testing';

import { InteRactAcociationService } from './inte-ract-acociation.service';

describe('InteRactAcociationService', () => {
  let service: InteRactAcociationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InteRactAcociationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
