import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IBoxComponent } from './i-box.component';

describe('IBoxComponent', () => {
  let component: IBoxComponent;
  let fixture: ComponentFixture<IBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
