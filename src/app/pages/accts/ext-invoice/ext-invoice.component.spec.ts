import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtInvoiceComponent } from './ext-invoice.component';

describe('ExtInvoiceComponent', () => {
  let component: ExtInvoiceComponent;
  let fixture: ComponentFixture<ExtInvoiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExtInvoiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExtInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
