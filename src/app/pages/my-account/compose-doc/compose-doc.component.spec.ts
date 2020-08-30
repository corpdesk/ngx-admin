import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComposeDocComponent } from './compose-doc.component';

describe('ComposeDocComponent', () => {
  let component: ComposeDocComponent;
  let fixture: ComponentFixture<ComposeDocComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComposeDocComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComposeDocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
