import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FriblyTreeComponent } from './fribly-tree.component';

describe('FriblyTreeComponent', () => {
  let component: FriblyTreeComponent;
  let fixture: ComponentFixture<FriblyTreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FriblyTreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FriblyTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
