import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-service-order',
  templateUrl: './form-service-order.component.html',
  styleUrls: ['./form-service-order.component.scss']
})
export class FormServiceOrderComponent implements OnInit {
  @Output() public changes = new EventEmitter();

  public formGroup: FormGroup;

  constructor(
    private fb: FormBuilder
  ) {
    this.buildFormGroup();
  }

  ngOnInit(): void {
  }

  public sendChanges() {
    this.changes.emit(this.formGroup);
  }

  private buildFormGroup(): void {
    this.formGroup = this.fb.group({
      'order': this.fb.group({
        'accessory': '',
        'defect': '',
        'diagnostic': ''
      })
    });
  }
}
