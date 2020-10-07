import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GrusComponent } from './grus.component';

describe('GrusComponent', () => {
  let component: GrusComponent;
  let fixture: ComponentFixture<GrusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
