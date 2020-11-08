import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GanttEightComponent } from './gantt-eight.component';

describe('GanttEightComponent', () => {
  let component: GanttEightComponent;
  let fixture: ComponentFixture<GanttEightComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GanttEightComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GanttEightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
