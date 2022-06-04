import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { ClientService } from 'src/app/modules/client/services/client.service';
import { Client } from 'src/app/shared/models/Client';
import { CepService } from 'src/app/shared/services/cep.service';
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

  public cepMask = MaskUtils["cepMask"];
  public timeoutSearchClient: any;
  private clientSelected: any;

  clientsRegistereds: Client[] = [];

  formGroup: FormGroup;

  isVisibleCliente: boolean = true;
  isVisibleEquipment: boolean = true;
  isVisibleServiceOrder: boolean = true;

  foods: any[] = [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'},
  ];

  constructor(
    private service: ServiceOrderService,
    private clientService: ClientService,
    private cepService: CepService,
    private dialog: MatDialog,
    private fb: FormBuilder
  ) {
  }

  ngOnInit() {
    this.buildForm();
   
    this.service.numberNextOS().subscribe(number => console.log(number));
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

    console.log(this.formGroup.controls['billings'].value);
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
    const cepValue = this.formGroup.value.cep;
    if(cepValue.length<8)
      return;
    
    this.cepService.findCep(cepValue).subscribe(data => { 
      if(data.erro) {
        console.log("cep não encontrado")
        return;
      }

      this.formGroup.patchValue({
        city: data.localidade,
        logradouro: data.logradouro,
        uf: data.uf,
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
}
