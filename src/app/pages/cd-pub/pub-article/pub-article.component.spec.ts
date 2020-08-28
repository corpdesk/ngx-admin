import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PubArticleComponent } from './pub-article.component';

describe('PubArticleComponent', () => {
  let component: PubArticleComponent;
  let fixture: ComponentFixture<PubArticleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PubArticleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PubArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
