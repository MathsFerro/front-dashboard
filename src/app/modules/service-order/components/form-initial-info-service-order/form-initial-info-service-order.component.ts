import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServiceOrder } from 'src/app/shared/models/ServiceOrder';
import { ServiceOrderService } from '../../services/service-order.service';

@Component({
  selector: 'app-form-initial-info-service-order',
  templateUrl: './form-initial-info-service-order.component.html',
  styleUrls: ['./form-initial-info-service-order.component.scss']
})
export class FormInitialInfoServiceOrderComponent implements OnInit {
  @Output() public changes = new EventEmitter();

  private initialOrderNumber: number;
  public formGroup: FormGroup;
  public isEditingMode: boolean;

  constructor(
    private serviceOrder: ServiceOrderService,
    private fb: FormBuilder
  ) { 
    this.isEditingMode = false;
    this.buildFormGroup();
    this.getNextNumberOS();
  }
  
  ngOnInit(): void {
  }

  public sendChanges() {
    if(this.formGroup.value.numberOrder==null) {
      this.formGroup.patchValue({
        'numberOrder': this.initialOrderNumber
      });
    }

    if(this.formGroup.value.numberOrder!=this.initialOrderNumber && !this.isEditingMode)
      return;
    
    this.changes.emit(this.formGroup);
  }

  private getNextNumberOS() {
    this.serviceOrder.numberNextOS().subscribe(numberOs => {
      this.initialOrderNumber = numberOs;
      this.formGroup.patchValue({
        'numberOrder': this.initialOrderNumber
      })      
    });
  }

  private buildFormGroup(): void {
    this.formGroup = this.fb.group({
      'numberOrder': ['', Validators.required]
    });
  }
}
