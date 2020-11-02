import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReplyDocComponent } from './reply-doc.component';

describe('ReplyDocComponent', () => {
  let component: ReplyDocComponent;
  let fixture: ComponentFixture<ReplyDocComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReplyDocComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReplyDocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
