import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileTwitterComponent } from './profile-twitter.component';

describe('ProfileTwitterComponent', () => {
  let component: ProfileTwitterComponent;
  let fixture: ComponentFixture<ProfileTwitterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileTwitterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileTwitterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
