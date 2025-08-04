import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsFiltersComponent } from './news-filters.component';

describe('NewsFiltersComponent', () => {
  let component: NewsFiltersComponent;
  let fixture: ComponentFixture<NewsFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewsFiltersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewsFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
