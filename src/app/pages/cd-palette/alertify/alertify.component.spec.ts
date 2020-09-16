import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertifyComponent } from './alertify.component';

describe('AlertifyComponent', () => {
  let component: AlertifyComponent;
  let fixture: ComponentFixture<AlertifyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlertifyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
