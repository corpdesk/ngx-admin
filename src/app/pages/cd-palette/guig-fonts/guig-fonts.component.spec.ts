import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuigFontsComponent } from './guig-fonts.component';

describe('GuigFontsComponent', () => {
  let component: GuigFontsComponent;
  let fixture: ComponentFixture<GuigFontsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuigFontsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuigFontsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
