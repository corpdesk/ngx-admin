import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CuteTableComponent } from './cute-table.component';

describe('CuteTableComponent', () => {
  let component: CuteTableComponent;
  let fixture: ComponentFixture<CuteTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CuteTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CuteTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
