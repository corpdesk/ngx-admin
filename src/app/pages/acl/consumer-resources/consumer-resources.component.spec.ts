import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsumerResourcesComponent } from './consumer-resources.component';

describe('ConsumerResourcesComponent', () => {
  let component: ConsumerResourcesComponent;
  let fixture: ComponentFixture<ConsumerResourcesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsumerResourcesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsumerResourcesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
