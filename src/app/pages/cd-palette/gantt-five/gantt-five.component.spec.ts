import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GanttFiveComponent } from './gantt-five.component';

describe('GanttFiveComponent', () => {
  let component: GanttFiveComponent;
  let fixture: ComponentFixture<GanttFiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GanttFiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GanttFiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
