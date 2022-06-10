import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchServiceOrderComponent } from './search-service-order.component';

describe('SearchServiceOrderComponent', () => {
  let component: SearchServiceOrderComponent;
  let fixture: ComponentFixture<SearchServiceOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchServiceOrderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchServiceOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
