import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CdKioskComponent } from './cd-kiosk.component';

describe('CdKioskComponent', () => {
  let component: CdKioskComponent;
  let fixture: ComponentFixture<CdKioskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CdKioskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CdKioskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
