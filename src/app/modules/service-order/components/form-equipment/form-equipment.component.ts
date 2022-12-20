import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EquipmentType } from 'src/app/shared/models/enums/EquipmentType';

@Component({
  selector: 'app-form-equipment',
  templateUrl: './form-equipment.component.html',
  styleUrls: ['./form-equipment.component.scss']
})
export class FormEquipmentComponent implements OnInit {
  @Output() public changes = new EventEmitter();

  public equipmentTypeList: any[] = [];
  public formGroup: FormGroup;

  constructor(
    private fb: FormBuilder
  ) {
    this.loadEquipmentTypeList();
    this.buildFormGroup();
  }

  ngOnInit(): void {
  }

  public sendChanges() {
    this.changes.emit(this.formGroup);
  }

  private loadEquipmentTypeList() {
    Object.entries(EquipmentType).forEach(([key, value]) => {
      this.equipmentTypeList.push({ key, value });
    });
  }

  private buildFormGroup() {
    this.formGroup = this.fb.group({
      'equipment': this.fb.group({
        'description': '',
        'serialNumber': '',
        'equipmentType': ''
      })
    })
  }
}
