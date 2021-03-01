import { TestBed } from '@angular/core/testing';

import { MyInteRactService } from './my-inte-ract.service';

describe('MyInteRactService', () => {
  let service: MyInteRactService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyInteRactService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
