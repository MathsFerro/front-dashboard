import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Toast, ToastrService } from 'ngx-toastr';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { EquipmentType } from 'src/app/shared/models/enums/EquipmentType';
import { FilterPageable } from 'src/app/shared/models/FilterPageable';
import { ServiceOrderStatus } from 'src/app/shared/models/ServiceOrderStatus';
import { MESSAGE_CONFIRM_DIALOG } from 'src/app/shared/utils/Messages';
import { statusList } from 'src/app/shared/utils/ServiceOrderStatusList';
import { ServiceOrderService } from '../../services/service-order.service';

@Component({
  selector: 'app-search-service-order',
  templateUrl: './search-service-order.component.html',
  styleUrls: ['./search-service-order.component.scss']
})
export class SearchServiceOrderComponent implements OnInit {

  @Output() formSearch = new EventEmitter();

  public formGroup: FormGroup;
  public equipmentTypeList: any[] = [];

  serviceOrderStatusList: ServiceOrderStatus[] = statusList; 
  
  constructor(
    private service: ServiceOrderService,
    private dialog: MatDialog,
    private toastr: ToastrService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.loadEquipmentTypeList();
    this.buildForm();
  }

  buildForm() {
    this.formGroup = this.fb.group({
      'numberServiceOrder': null,
      'serviceOrderStatus': this.fb.array([]),
      'equipment': this.fb.group({
        'serialNumber': null,
        'equipmentType': null
      }),
      'client': this.fb.group({
        'name': null
      }),
      'enteredIn': this.fb.group({
        'start': null,
        'end': null,
      }),
      'exitIn': this.fb.group({
        'start': null,
        'end': null,
      })
    });
  }

  loadEquipmentTypeList() {
    Object.entries(EquipmentType).forEach(([key, value]) => {
      this.equipmentTypeList.push({ key, value });
    });
  }

  get serviceOrderStatusForm(): FormArray {
    return this.formGroup.controls['serviceOrderStatus'] as FormArray;
  }

  clicked(ev: any) {

  }

  search() {
    if(this.formGroup.invalid) {
      this.toastr.error("Formulário está inválido");
      return;
    }

    this.handleServiceOrderStatus();
    console.log(this.formGroup.value);
    this.formSearch.emit(this.formGroup.value);
  }

  handleServiceOrderStatus() {
    this.serviceOrderStatusForm.clear();
    
    this.serviceOrderStatusList.map(item => {
      if(item.selected) {
        this.serviceOrderStatusForm.push(this.fb.group({
          'value': item.value
        }));
      }
    });
  }

  openConfirmDialog() {
    this.dialog.open(ConfirmDialogComponent, { 
      data: MESSAGE_CONFIRM_DIALOG,
      disableClose: true
    }).afterClosed().subscribe((resp: boolean) => {
      if(resp) {
        this.buildForm();
      }
    });
  }
}
