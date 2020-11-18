import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GanttTenComponent } from './gantt-ten.component';

describe('GanttTenComponent', () => {
  let component: GanttTenComponent;
  let fixture: ComponentFixture<GanttTenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GanttTenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GanttTenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
