import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { Client } from 'src/app/shared/models/Client';
import { CepService } from 'src/app/shared/services/cep.service';
import { MaskUtils } from 'src/app/shared/utils/MaskUtils';
import { ClientService } from '../../services/client.service';

@Component({
  selector: 'app-dialog-form-client',
  templateUrl: './dialog-form-client.component.html',
  styleUrls: ['./dialog-form-client.component.scss']
})
export class DialogFormClientComponent implements OnInit {

  public cepMask = MaskUtils["cepMask"];
  public formGroup: FormGroup;
  public timeoutSearchClient: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: Client, 
    private formBuilder: FormBuilder,
    private cepService: CepService,
    private clientService: ClientService,
    private confirmDialog: MatDialog,
    private toastr: ToastrService  
  ) {
  }

  ngOnInit(): void {
    this.buildFormGroup();
    if(this.data)
      this.getValues();
  }

  private buildFormGroup() {
    this.formGroup = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      cep: ['', Validators.required],
      city: ['', Validators.required],
      logradouro: ['', Validators.required],
      uf: ['', Validators.required]
    });
  }

  private getValues() {
    this.formGroup.patchValue({
      name: this.data.name,
      email: this.data.email,
      phoneNumber: this.data.phoneNumber,
      cep: this.data.address.cep,
      city: this.data.address.city,
      logradouro: this.data.address.logradouro,
      uf: this.data.address.uf
    });
  }

  findCep() {
    const cepValue = this.formGroup.value.cep;
    if(cepValue.length<8)
      return;
    
    this.cepService.findCep(cepValue).subscribe(data => { 
      if(data.erro)
        this.toastr.error("CEP não encontrado!", "Erro");        

      this.formGroup.patchValue({
        city: data.localidade,
        logradouro: data.logradouro,
        uf: data.uf,
      });
    });
  }

  findClientWithTimeoutAfterTyping() {
    clearTimeout(this.timeoutSearchClient);
    this.timeoutSearchClient = setTimeout(() => {
      
    }, 1500);
  }

  submitForm() {
    if(this.formGroup.invalid)
      return;

    console.log(this.formGroup.value)

    const {
      name,
      email,
      phoneNumber,
      cep,
      city,
      logradouro,
      uf
    } = this.formGroup.value;

    this.clientService.add({
      name,
      email,
      phoneNumber,
      address: {
        cep,
        city,
        logradouro,
        uf
      }
    } as Client).subscribe(data => console.log(data));

    // Redirecionar para Clientes
  }

  verifyIfCanClearForm() {
    this.confirmDialog
      .open(ConfirmDialogComponent, { data: "Deseja limpar todos os campos?" })
      .afterClosed()
      .subscribe(data => {
        if(data) 
          this.buildFormGroup()
      });
  }

}
