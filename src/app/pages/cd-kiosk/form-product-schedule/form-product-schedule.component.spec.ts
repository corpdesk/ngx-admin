import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormProductScheduleComponent } from './form-product-schedule.component';

describe('FormProductScheduleComponent', () => {
  let component: FormProductScheduleComponent;
  let fixture: ComponentFixture<FormProductScheduleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormProductScheduleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormProductScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
