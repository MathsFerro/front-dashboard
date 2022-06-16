import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ClientService } from 'src/app/modules/client/services/client.service';
import { Client } from 'src/app/shared/models/Client';
import { AssuranceType } from 'src/app/shared/models/enums/AssuranceType';
import { EquipmentType } from 'src/app/shared/models/enums/EquipmentType';
import { Equipment } from 'src/app/shared/models/Equipment';
import { ServiceOrder } from 'src/app/shared/models/ServiceOrder';
import { CepService } from 'src/app/shared/services/cep.service';
import { EquipmentService } from 'src/app/shared/services/equipment.service';
import { MaskUtils } from 'src/app/shared/utils/MaskUtils';
import { ServiceOrderService } from '../../services/service-order.service';
import { DialogAnnotationsComponent } from '../dialog-annotations/dialog-annotations.component';
import { Billing } from '../../types/Billing';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Annotation } from 'src/app/shared/models/Annotation';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { MESSAGE_CONFIRM_DIALOG } from 'src/app/shared/utils/Messages';

@Component({
  selector: 'app-form-service-order',
  templateUrl: './form-service-order.component.html',
  styleUrls: ['./form-service-order.component.scss']
})
export class FormServiceOrderComponent implements OnInit {

  public osNumber: number;

  // Expansion Panels
  public clientExpanded: boolean = true;
  public equipmentExpanded: boolean = true;

  // Mat Select
  public assuranceTypeList: any[] = [];
  public equipmentTypeList: any[] = [];

  // Buttons
  public disableSaveButton: boolean = false;
  
  public clientsRegistereds: Client[] = [];
  public formGroup: FormGroup;

  public equipmentClientList: Equipment[] = [];
  public cepMask = MaskUtils["cepMask"];
  public timeoutSearchClient: any;

  constructor(
    private service: ServiceOrderService,
    private clientService: ClientService,
    private equipmentService: EquipmentService,
    private cepService: CepService,
    private dialog: MatDialog,
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService
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

  get annotations(): FormArray {
    return this.formGroup.controls['annotations'] as FormArray;
  }

  get valueBillings() {
    const billing = this.billings.value as Billing[];

    if(billing.length===0)
      return 0;

    const numberArray = billing.map(item => item.value);  
    return numberArray.reduce((acc, currentValue) => Number(acc) + Number(currentValue));
  }

  get annotationsList() {
    return this.formGroup.value.annotations;
  }

  get billingList() {
    return this.formGroup.value.billings;
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
      .subscribe(number => this.osNumber = number);
  }

  openModalAnnotations() {
    this.dialog.open(DialogAnnotationsComponent, { 
      data: this.formGroup.value.annotations,
      disableClose: true
    }).afterClosed().subscribe((resp: Annotation[]) => {
      if(!resp)
        return;
      const form = this.annotations;
      form.clear();
      resp.map((value: Annotation) => {
        if(value.description.trim()==='')
          return;

        form.push(this.fb.group({
          'description': value.description
        }));
      });
    });
  }

  onSubmit() {
    if(this.formGroup.invalid) {
      this.toastr.info(`Preencha todos os campos obrigatórios`);
      return;  
    }

    this.disableSaveButton = true;

    this.clearEmptyFields();

    this.service.add(this.formGroup.value as ServiceOrder)
      .subscribe(resp => {
        console.log("sucesso ", resp)
        this.toastr.success(`OS [${this.osNumber}] - Criada com Sucesso`,'',{ timeOut: 2500 });   
        //this.router.navigate(['/service-order']);
      }, err => {
        this.toastr.error(`Ocorreu um erro ao registrar a OS`, '', { timeOut: 2500 });
        console.error(err);
        this.disableSaveButton = false
      });

    // this.service.add(this.formGroup.value as ServiceOrder)
    //   .subscribe({
    //     next: (v) => console.log("v", v),
    //     error: (e) => console.error("e", e),
    //     complete: () => console.info('complete') 
    //   })
  }

  clearEmptyFields() {
    this.formGroup.value.billings = this.billingList
      .filter((billing:Billing) => billing.description.trim()!=='')

    this.formGroup.value.annotations = this.annotationsList
      .filter((annotation: Annotation) => annotation.description.trim()!=='')
  }

  buildForm() {
    this.formGroup = this.fb.group({
      'client': this.buildFormClient(),
      'equipment': this.buildFormEquipment(),
      'id': null,
      'accessory': null,
      'defect': null,
      'diagnostic': null,
      'assurance': null,
      'annotations': this.fb.array([
        this.fb.group({
          'description': ['']
        }),
      ]),
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

  buildFormClient(): FormGroup {
    return this.fb.group({
      'id': null,
      'name': ['', Validators.required],
      'phoneNumber': null,
      'email': null,
      'cpfCnpj': null,
      'address': this.fb.group({
        'cep': [''],
        'city': [''],
        'uf': [''],
        'logradouro': [''],
        'complement': ['']
      })
    });
  }

  buildFormEquipment(): FormGroup {
    return this.fb.group({
      'id': null,
      'description': ['', Validators.required],
      'serialNumber': [''],
      'equipmentType': ['']
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
    setTimeout(() => {
      const cepValue = this.formGroup.value.client.address.cep;
      if(cepValue===null || cepValue.length<8)
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
    }, 100);
  }

  clearClientFields() {
    this.formGroup.patchValue({
      'client': {
        'id': null,
        'name': null,
        'phoneNumber': null,
        'email': null,
        'cpfCnpj': null,
        'address': {
          'cep': null,
          'city': null,
          'uf': null,
          'logradouro': null,
          'complement': null
        }
      },
      'equipment': {
        'id': null,
        'description': null,
        'serialNumber': null,
        'equipmentType': null
      }
    });

    this.clientExpanded = true;
    this.equipmentExpanded = true;

    this.resetLists();
  }

  resetLists() {
    this.equipmentClientList = [];
    this.clientsRegistereds = [];
  }

  findClientsByName(name: string) {
    clearTimeout(this.timeoutSearchClient);
    if(name && name.length<2) {
      this.clientsRegistereds = [];
      return;
    }
    
    this.timeoutSearchClient = setTimeout(() => { 
      this.clientService
        .findClientsByName(name)
        .subscribe(data => this.clientsRegistereds = data);
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

  handleEquipmentChange(description: string) {
    const equipmentDescriptions = this.equipmentClientList.map(equipment => equipment.description);
    if(equipmentDescriptions.filter(itemDescription => itemDescription===description).length>0) {
      this.equipmentClientList.map(item => {
        if(item.description===description) {
          this.formGroup.patchValue({
            'equipment': {
              'id': item.id,
              'equipmentType': item.equipmentType,
              'serialNumber': item.serialNumber
            }
          });
        }
      });

      return;
    }

    // this.formGroup.patchValue({
    //   'equipment': {
    //     'id': null,
    //     'equipmentType': [''],
    //     'serialNumber': ['']
    //   }
    // });
  }
  
  openModalConfirmClearForm() {
    this.dialog.open(ConfirmDialogComponent, { 
        data: MESSAGE_CONFIRM_DIALOG,
        disableClose: true 
      })
      .afterClosed().subscribe((resp:boolean) => {
        if(resp) {
          this.buildForm();
          this.openAllExpansioPanels();
        }
      });
  }

  openAllExpansioPanels() {
    this.clientExpanded = true;
    this.equipmentExpanded = true;
  }

}
