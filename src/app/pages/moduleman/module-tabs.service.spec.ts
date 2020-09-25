import { TestBed } from '@angular/core/testing';

import { ModuleTabsService } from './module-tabs.service';

describe('ModuleTabsService', () => {
  let service: ModuleTabsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModuleTabsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
