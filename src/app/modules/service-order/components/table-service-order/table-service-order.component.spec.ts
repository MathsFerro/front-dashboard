import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableServiceOrderComponent } from './table-service-order.component';

describe('TableServiceOrderComponent', () => {
  let component: TableServiceOrderComponent;
  let fixture: ComponentFixture<TableServiceOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableServiceOrderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableServiceOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
