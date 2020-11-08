import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GanttOneComponent } from './gantt-one.component';

describe('GanttOneComponent', () => {
  let component: GanttOneComponent;
  let fixture: ComponentFixture<GanttOneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GanttOneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GanttOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
