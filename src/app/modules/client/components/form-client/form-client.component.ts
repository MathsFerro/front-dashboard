import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Client } from 'src/app/shared/models/Client';
import { CepService } from 'src/app/shared/services/cep.service';
import { MaskUtils } from 'src/app/shared/utils/MaskUtils';
import { ClientService } from '../../services/client.service';

@Component({
  selector: 'app-form-client',
  templateUrl: './form-client.component.html',
  styleUrls: ['./form-client.component.scss']
})
export class FormClientComponent implements OnInit {

  public cepMask = MaskUtils["cepMask"];
  public timeoutSearchClient: any;
  private clientSelected: any;

  formGroup: FormGroup;
  clientsRegistereds: Client[] = [];
  
  constructor(
    private clientService: ClientService,
    private cepService: CepService,
    public matDialog: MatDialog,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.findAllUfs();
    this.buildForm();
  }

  findAllUfs() {

  }

  buildForm() {
    //this.clientEdit.emit(null);
    this.formGroup = this.fb.group({
      'id': null,
      'name': ['', Validators.required],
      'phoneNumber': ['', Validators.required],
      'email': ['', Validators.required],
      'cpfCnpj': ['', Validators.required],
      'address': this.fb.group({
        'cep': [''],
        'city': [''],
        'uf': [''],
        'logradouro': ['', Validators.required],
        'complement': ['', Validators.required]
      })
    });

    console.log(this.formGroup.value);
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

  changeClient(value: Client) {
    //this.clientEdit.emit(value);
    this.clientSelected = value;

    this.formGroup.patchValue({
      'id': value.id,
      'name': value.name,
      'phoneNumber': value.phoneNumber,
      'email': value.email,
      'cpfCnpj': value.cpfCnpj,
      'cep': value.address.cep,
      'city': value.address.city,
      'uf': value.address.uf,
      'logradouro': value.address.logradouro,
      'complement': value.address.complement
    });
  }

  submitForm() {
    // subir alerta quando tiver invalido
    if(this.formGroup.invalid)
      return;

    const client = this.buildClientBasedForm();

    /*this.clientService.add(client).subscribe(data => {
      console.log("adicionado com sucesso!");
    }, erro => console.log(erro));
*/
    console.log(this.formGroup.value);
  }

  clearForm() {
    /*this.matDialog.open(ClearFormDialogComponent)
      .afterClosed().subscribe(clear => {
        if(clear)
          this.buildForm()
      });*/
  }

  private buildClientBasedForm(): Client {
    const formValue = this.formGroup.value;
    return {
      id: formValue.id,
      name: formValue.name,
      phoneNumber: formValue.phoneNumber,
      email: formValue.email,
      cpfCnpj: formValue.cpfCnpj,
      address: {
        cep: formValue.cep,
        city: formValue.city,
        uf: formValue.uf,
        logradouro: formValue.logradouro,
        complement: formValue.complement
      }
    }
  }

}
