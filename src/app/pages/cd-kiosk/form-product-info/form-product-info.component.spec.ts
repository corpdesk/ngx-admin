import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormProductInfoComponent } from './form-product-info.component';

describe('FormProductInfoComponent', () => {
  let component: FormProductInfoComponent;
  let fixture: ComponentFixture<FormProductInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormProductInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormProductInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
