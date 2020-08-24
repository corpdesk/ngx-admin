import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtQuoteComponent } from './ext-quote.component';

describe('ExtQuoteComponent', () => {
  let component: ExtQuoteComponent;
  let fixture: ComponentFixture<ExtQuoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExtQuoteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExtQuoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
