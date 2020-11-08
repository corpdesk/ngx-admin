import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GanttTwoComponent } from './gantt-two.component';

describe('GanttTwoComponent', () => {
  let component: GanttTwoComponent;
  let fixture: ComponentFixture<GanttTwoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GanttTwoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GanttTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
