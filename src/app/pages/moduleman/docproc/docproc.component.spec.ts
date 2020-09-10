import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocprocComponent } from './docproc.component';

describe('DocprocComponent', () => {
  let component: DocprocComponent;
  let fixture: ComponentFixture<DocprocComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocprocComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocprocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
