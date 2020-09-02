import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormProductDevelopersComponent } from './form-product-developers.component';

describe('FormProductDevelopersComponent', () => {
  let component: FormProductDevelopersComponent;
  let fixture: ComponentFixture<FormProductDevelopersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormProductDevelopersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormProductDevelopersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
