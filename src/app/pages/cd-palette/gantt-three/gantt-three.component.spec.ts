import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GanttThreeComponent } from './gantt-three.component';

describe('GanttThreeComponent', () => {
  let component: GanttThreeComponent;
  let fixture: ComponentFixture<GanttThreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GanttThreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GanttThreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
