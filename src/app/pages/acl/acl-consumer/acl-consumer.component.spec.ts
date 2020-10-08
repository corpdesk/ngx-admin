import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AclConsumerComponent } from './acl-consumer.component';

describe('AclConsumerComponent', () => {
  let component: AclConsumerComponent;
  let fixture: ComponentFixture<AclConsumerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AclConsumerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AclConsumerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
