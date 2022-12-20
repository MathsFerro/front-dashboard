import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewServiceOrderComponent } from './new-service-order.component';

describe('NewServiceOrderComponent', () => {
  let component: NewServiceOrderComponent;
  let fixture: ComponentFixture<NewServiceOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewServiceOrderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewServiceOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
