import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyInteRactComponent } from './my-inte-ract.component';

describe('MyInteRactComponent', () => {
  let component: MyInteRactComponent;
  let fixture: ComponentFixture<MyInteRactComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyInteRactComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyInteRactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
