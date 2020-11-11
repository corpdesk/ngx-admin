import { TestBed } from '@angular/core/testing';

import { QuetionService } from './quetion.service';

describe('QuetionService', () => {
  let service: QuetionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuetionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
