import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CuteTableTdComponent } from './cute-table-td.component';

describe('CuteTableTdComponent', () => {
  let component: CuteTableTdComponent;
  let fixture: ComponentFixture<CuteTableTdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CuteTableTdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CuteTableTdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
