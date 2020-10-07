import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupTreeViewComponent } from './group-tree-view.component';

describe('GroupTreeViewComponent', () => {
  let component: GroupTreeViewComponent;
  let fixture: ComponentFixture<GroupTreeViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupTreeViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupTreeViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
