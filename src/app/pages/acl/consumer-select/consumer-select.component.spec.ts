import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsumerSelectComponent } from './consumer-select.component';

describe('ConsumerSelectComponent', () => {
  let component: ConsumerSelectComponent;
  let fixture: ComponentFixture<ConsumerSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsumerSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsumerSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
