import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GanttSixComponent } from './gantt-six.component';

describe('GanttSixComponent', () => {
  let component: GanttSixComponent;
  let fixture: ComponentFixture<GanttSixComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GanttSixComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GanttSixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
