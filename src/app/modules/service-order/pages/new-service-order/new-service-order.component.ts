import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServiceOrderService } from '../../services/service-order.service';

@Component({
  selector: 'app-new-service-order',
  templateUrl: './new-service-order.component.html',
  styleUrls: ['./new-service-order.component.scss']
})
export class NewServiceOrderComponent implements OnInit {
  public formGroup: FormGroup;
  public nextNumberOS: number;

  constructor(
    private orderService: ServiceOrderService,
    private fb: FormBuilder
  ) {
    this.buildForm();
  }

  ngOnInit(): void {
    this.orderService.numberNextOS().subscribe(resp => this.nextNumberOS = resp);
  }

  public handleClientFormChanges(event: FormGroup) {
    this.formGroup.patchValue({
      'client': event.value.client
    });
  }

  public handleEquipmentFormChanges(event: FormGroup) {
    this.formGroup.patchValue({
      'equipment': event.value.equipment
    });
  }

  public handleServiceOrderFormChanges(event: FormGroup) {
    this.formGroup.patchValue({
      'accessory': event.value.accessory,
      'defect': event.value.defect,
      'diagnostic': event.value.diagnostic
    });
  }

  public onSubmit() {
    console.log(this.formGroup.valid)
    console.log(this.formGroup);
  }

  private buildForm(): void {
    this.formGroup = this.fb.group({
      'client': this.fb.group({
        'email': ['', Validators.required]
      }),
      'equipment': '',
      'accessory': '',
      'defect': '',
      'diagnostic': ''
    });
  }
}
