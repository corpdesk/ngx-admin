import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InteRactCommentsComponent } from './inte-ract-comments.component';

describe('InteRactCommentsComponent', () => {
  let component: InteRactCommentsComponent;
  let fixture: ComponentFixture<InteRactCommentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InteRactCommentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InteRactCommentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
