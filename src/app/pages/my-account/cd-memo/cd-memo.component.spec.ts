import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CdMemoComponent } from './cd-memo.component';

describe('CdMemoComponent', () => {
  let component: CdMemoComponent;
  let fixture: ComponentFixture<CdMemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CdMemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CdMemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
