import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormProductAvailabilityComponent } from './form-product-availability.component';

describe('FormProductAvailabilityComponent', () => {
  let component: FormProductAvailabilityComponent;
  let fixture: ComponentFixture<FormProductAvailabilityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormProductAvailabilityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormProductAvailabilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
