import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcctsComponent } from './accts.component';

describe('AcctsComponent', () => {
  let component: AcctsComponent;
  let fixture: ComponentFixture<AcctsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcctsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcctsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
