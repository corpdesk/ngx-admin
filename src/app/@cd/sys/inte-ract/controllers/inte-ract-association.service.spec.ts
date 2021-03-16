import { TestBed } from '@angular/core/testing';

import { InteRactAssociationService } from './inte-ract-association.service';

describe('InteRactAssociationService', () => {
  let service: InteRactAssociationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InteRactAssociationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
