import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PmsInteRactComponent } from './pms-inte-ract.component';

describe('PmsInteRactComponent', () => {
  let component: PmsInteRactComponent;
  let fixture: ComponentFixture<PmsInteRactComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PmsInteRactComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PmsInteRactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
