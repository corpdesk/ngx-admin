import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupNestedComponent } from './group-nested.component';

describe('GroupNestedComponent', () => {
  let component: GroupNestedComponent;
  let fixture: ComponentFixture<GroupNestedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupNestedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupNestedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
