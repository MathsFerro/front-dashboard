import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogClientShowEquipmentComponent } from './dialog-client-show-equipment.component';

describe('DialogClientShowEquipmentComponent', () => {
  let component: DialogClientShowEquipmentComponent;
  let fixture: ComponentFixture<DialogClientShowEquipmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogClientShowEquipmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogClientShowEquipmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
