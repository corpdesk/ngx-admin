import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GanttNineComponent } from './gantt-nine.component';

describe('GanttNineComponent', () => {
  let component: GanttNineComponent;
  let fixture: ComponentFixture<GanttNineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GanttNineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GanttNineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
