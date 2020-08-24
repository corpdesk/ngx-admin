import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IntQuoteComponent } from './int-quote.component';

describe('IntQuoteComponent', () => {
  let component: IntQuoteComponent;
  let fixture: ComponentFixture<IntQuoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IntQuoteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IntQuoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
