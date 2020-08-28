import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileAccordionComponent } from './profile-accordion.component';

describe('ProfileAccordionComponent', () => {
  let component: ProfileAccordionComponent;
  let fixture: ComponentFixture<ProfileAccordionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileAccordionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileAccordionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
