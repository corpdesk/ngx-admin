import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InteRactComponent } from './inte-ract.component';

describe('InteRactComponent', () => {
  let component: InteRactComponent;
  let fixture: ComponentFixture<InteRactComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InteRactComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InteRactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
