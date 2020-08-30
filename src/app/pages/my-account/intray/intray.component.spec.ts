import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IntrayComponent } from './intray.component';

describe('IntrayComponent', () => {
  let component: IntrayComponent;
  let fixture: ComponentFixture<IntrayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IntrayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IntrayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
