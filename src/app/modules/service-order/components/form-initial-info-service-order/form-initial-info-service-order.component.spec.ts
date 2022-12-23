import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormInitialInfoServiceOrderComponent } from './form-initial-info-service-order.component';

describe('FormInitialInfoServiceOrderComponent', () => {
  let component: FormInitialInfoServiceOrderComponent;
  let fixture: ComponentFixture<FormInitialInfoServiceOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormInitialInfoServiceOrderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormInitialInfoServiceOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
