import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TreeViewMatComponent } from './tree-view-mat.component';

describe('TreeViewMatComponent', () => {
  let component: TreeViewMatComponent;
  let fixture: ComponentFixture<TreeViewMatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TreeViewMatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TreeViewMatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
