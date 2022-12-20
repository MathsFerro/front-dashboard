import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-new-service-order',
  templateUrl: './new-service-order.component.html',
  styleUrls: ['./new-service-order.component.scss']
})
export class NewServiceOrderComponent implements OnInit {
  public formGroup: FormGroup;

  constructor(
    private fb: FormBuilder
  ) {
    this.buildForm();
  }

  ngOnInit(): void {
  }

  public handleClientFormChanges(event: FormGroup) {
    this.formGroup.patchValue({
      'client': event.value
    });
  }

  public handleEquipmentFormChanges(event: FormGroup) {
    this.formGroup.patchValue({
      'equipment': event.value
    });
  }

  public handleServiceOrderFormChanges(event: FormGroup) {
    this.formGroup.patchValue({
      'order': {
        'accessory': event.value.accessory,
        'defect': event.value.defect,
        'diagnostic': event.value.diagnostic
      }
    });
  }

  public onSubmit() {
    console.log(this.formGroup);
  }

  private buildForm(): void {
    this.formGroup = this.fb.group({
      'client': '',
      'equipment': '',
      'order': ''
    });
  }
}
