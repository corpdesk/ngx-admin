import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IntInvoiceComponent } from './int-invoice.component';

describe('IntInvoiceComponent', () => {
  let component: IntInvoiceComponent;
  let fixture: ComponentFixture<IntInvoiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IntInvoiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IntInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
