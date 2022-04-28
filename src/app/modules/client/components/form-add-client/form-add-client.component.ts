import { Component, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { timeout } from 'rxjs';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { Client } from 'src/app/shared/models/Client';
import { CepService } from 'src/app/shared/services/cep.service';
import { MaskUtils } from 'src/app/shared/utils/MaskUtils';
import { ClientService } from '../../services/client.service';

@Component({
  selector: 'app-form-add-client',
  templateUrl: './form-add-client.component.html',
  styleUrls: ['./form-add-client.component.scss']
})
export class FormAddClientComponent implements OnInit {

  public cepMask = MaskUtils["cepMask"];
  public formGroup: FormGroup;
  public timeoutSearchClient: any;

  constructor(
    private formBuilder: FormBuilder,
    private cepService: CepService,
    private clientService: ClientService,
    private confirmDialog: MatDialog
  ) {
    this.buildFormGroup();
  }

  ngOnInit(): void {
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

  findClientWithTimeoutAfterTyping() {
    clearTimeout(this.timeoutSearchClient);
    this.timeoutSearchClient = setTimeout(() => {
      
    }, 1500);
  }

  submitForm() {
    if(this.formGroup.invalid)
      return;

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
