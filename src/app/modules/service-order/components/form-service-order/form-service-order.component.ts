import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ClientService } from 'src/app/modules/client/services/client.service';
import { Client } from 'src/app/shared/models/Client';
import { AssuranceType } from 'src/app/shared/models/enums/AssuranceType';
import { EquipmentType } from 'src/app/shared/models/enums/EquipmentType';
import { Equipment } from 'src/app/shared/models/Equipment';
import { CepService } from 'src/app/shared/services/cep.service';
import { EquipmentService } from 'src/app/shared/services/equipment.service';
import { MaskUtils } from 'src/app/shared/utils/MaskUtils';
import { ServiceOrderService } from '../../services/service-order.service';
import { DialogAnnotationsComponent } from '../dialog-annotations/dialog-annotations.component';
import { Billing } from '../types/Billing';

@Component({
  selector: 'app-form-service-order',
  templateUrl: './form-service-order.component.html',
  styleUrls: ['./form-service-order.component.scss']
})
export class FormServiceOrderComponent implements OnInit {

  // Expansion Panels
  public clientExpanded: boolean = true;
  public equipmentExpanded: boolean = true;

  // Mat Select
  public assuranceTypeList: any[] = [];
  public equipmentTypeList: any[] = [];
  
  public clientsRegistereds: Client[] = [];
  public formGroup: FormGroup;

  public equipmentClientList: Equipment[] = [];
  public cepMask = MaskUtils["cepMask"];
  public timeoutSearchClient: any;
  
  private clientSelected: any;

  constructor(
    private service: ServiceOrderService,
    private clientService: ClientService,
    private equipmentService: EquipmentService,
    private cepService: CepService,
    private dialog: MatDialog,
    private fb: FormBuilder
  ) {
  }

  ngOnInit() {
    this.loadEquipmentTypeList();
    this.loadAssuranceTypeList();
    this.buildForm();
    this.getNumberNextOS();
  }

  get valueForm() {
    return this.formGroup.value;
  }

  get billings(): FormArray {
    return this.formGroup.controls['billings'] as FormArray;
  }

  get valueBillings() {
    const billing = this.billings.value as Billing[];

    if(billing.length===0)
      return 0;

    const numberArray = billing.map(item => item.value);  
    return numberArray.reduce((acc, currentValue) => Number(acc) + Number(currentValue));
  }

  // Filtrar a lista q tiver description vazio
  get filterBillingList() {
    return null;
  }

  loadEquipmentTypeList() {
    Object.entries(EquipmentType).forEach(([key, value]) => {
      this.equipmentTypeList.push({ key, value });
    });
  }

  loadAssuranceTypeList() {
    Object.entries(AssuranceType).forEach(([key, value]) => {
      this.assuranceTypeList.push({ key, value });
    });
  }

  getNumberNextOS() {
    this.service.numberNextOS()
      .subscribe(number => console.log(number));
  }

  openModalAnnotations() {
    console.log(this.formGroup.value.annotations);
    this.dialog.open(DialogAnnotationsComponent, { 
      data: this.formGroup.value.annotations
    }).afterClosed().subscribe((resp: FormArray) => {
      console.log(resp); 
      this.formGroup.value.annotations = resp;
    });
  }

  onSubmit() {
    console.log(this.formGroup.value);
    if(this.formGroup.invalid)
      return;

      
  }

  buildForm() {
    this.formGroup = this.fb.group({
      'client': this.fb.group({
        'id': null,
        'name': ['', Validators.required],
        'phoneNumber': [''],
        'email': [''],
        'cpfCnpj': [''],
        'address': this.fb.group({
          'cep': [''],
          'city': [''],
          'uf': [''],
          'logradouro': [''],
          'complement': ['']
        })
      }),
      'equipment': this.fb.group({
        'id': null,
        'description': [''],
        'serialNumber': [''],
        'equipmentType': ['']
      }),
      'id': null,
      'accessory': [''],
      'defect': [''],
      'diagnostic': [''],
      'annotations': new FormArray([]),
      'billings': this.fb.array([
        this.fb.group({
          'description': [''],
          'value': [0]
        }),
        this.fb.group({
          'description': [''],
          'value': [0]
        })
      ])
    });
  }

  addBilling() {
    const billingForm = this.fb.group({
      'description': [''],
      'value': [0]
    });

    this.billings.push(billingForm);
  }

  deleteBilling(idx: number) {
    this.billings.removeAt(idx);
  }

  findCep() {
    const cepValue = this.formGroup.value.client.address.cep;
    if(cepValue.length<8)
      return;
    
    this.cepService.findCep(cepValue).subscribe(data => { 
      if(data.erro) {
        console.log("cep não encontrado")
        return;
      }

      this.formGroup.patchValue({
        'client': {
          'address': {
            'city': data.localidade,
            'logradouro': data.logradouro,
            'uf': data.uf,
          }
        }
      });
    });
 
  }

  findClientsByName(name: string) {
    clearTimeout(this.timeoutSearchClient);
    if(name.length<3 || this.clientSelected) {
      this.clientsRegistereds = [];
      this.clientSelected = null;
      return;
    }

    this.timeoutSearchClient = setTimeout(() => { 
      this.clientService.findClientsByName(name).subscribe(data => {
        console.log(data);
        this.clientsRegistereds = data;
       });
    }, 100);
  }

  changeEquipment(equipmentSelected: Equipment) {
    this.formGroup.patchValue({
      'equipment': {
        'id': equipmentSelected.id,
        'description': equipmentSelected.description,
        'serialNumber': equipmentSelected.serialNumber,
        'equipmentType': equipmentSelected.equipmentType
      }
    });
    this.equipmentExpanded = false;
  }

  changeClient(clientSelected: Client) {
    this.formGroup.patchValue({
      'client': {
        'id': clientSelected.id,
        'name': clientSelected.name,
        'phoneNumber': clientSelected.phoneNumber,
        'email': clientSelected.email,
        'cpfCnpj': clientSelected.cpfCnpj,
        'address': {
          'cep': clientSelected.address.cep,
          'city': clientSelected.address.city,
          'uf': clientSelected.address.uf,
          'logradouro': clientSelected.address.logradouro,
          'complement': clientSelected.address.complement
        }
      }
    });

    this.findEquipmentsByClientId(clientSelected.id);

    this.clientExpanded = false;
  }

  
  findEquipmentsByClientId(clientId: string) {
    if(clientId===null)
      return;

    this.equipmentService
      .findEquipmentsByClientId(clientId)
      .subscribe(resp => {
        console.log(resp)
        this.equipmentClientList = resp;
      });
  }

}
