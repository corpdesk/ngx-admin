import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocTrayComponent } from './doc-tray.component';

describe('DocTrayComponent', () => {
  let component: DocTrayComponent;
  let fixture: ComponentFixture<DocTrayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocTrayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocTrayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
