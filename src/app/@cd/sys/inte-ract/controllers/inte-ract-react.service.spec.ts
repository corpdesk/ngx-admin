import { TestBed } from '@angular/core/testing';

import { InteRactReactService } from './inte-ract-react.service';

describe('InteRactReactService', () => {
  let service: InteRactReactService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InteRactReactService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
