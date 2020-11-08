import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GanttFourComponent } from './gantt-four.component';

describe('GanttFourComponent', () => {
  let component: GanttFourComponent;
  let fixture: ComponentFixture<GanttFourComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GanttFourComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GanttFourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
