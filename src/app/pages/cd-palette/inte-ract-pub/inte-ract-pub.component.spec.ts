import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InteRactPubComponent } from './inte-ract-pub.component';

describe('InteRactPubComponent', () => {
  let component: InteRactPubComponent;
  let fixture: ComponentFixture<InteRactPubComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InteRactPubComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InteRactPubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
