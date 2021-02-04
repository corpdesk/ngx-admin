import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupTreeMatComponent } from './group-tree-mat.component';

describe('GroupTreeMatComponent', () => {
  let component: GroupTreeMatComponent;
  let fixture: ComponentFixture<GroupTreeMatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupTreeMatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupTreeMatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
