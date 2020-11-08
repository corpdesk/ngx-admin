import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GanttSevenComponent } from './gantt-seven.component';

describe('GanttSevenComponent', () => {
  let component: GanttSevenComponent;
  let fixture: ComponentFixture<GanttSevenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GanttSevenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GanttSevenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
