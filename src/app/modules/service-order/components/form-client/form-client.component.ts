import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CepService } from 'src/app/shared/services/cep.service';
import { MaskUtils } from 'src/app/shared/utils/MaskUtils';

@Component({
  selector: 'app-form-client',
  templateUrl: './form-client.component.html',
  styleUrls: ['./form-client.component.scss']
})
export class FormClientComponent implements OnInit {
  @Output() changes = new EventEmitter();

  public cepMask = MaskUtils.cepMask;
  public formGroup: FormGroup;

  constructor(
    private toastr: ToastrService,
    private cepService: CepService,
    private fb: FormBuilder
  ) { 
    this.buildForm();
  }

  ngOnInit(): void {
  }

  public sendChanges() {
    console.log("Sending Changes Client Form: ", this.formGroup)
    this.changes.emit(this.formGroup);
  }

  public findCep() {
    const cepValue = this.formGroup.value.client.address.cep;
    if(cepValue===null || cepValue.length<8)
      return;
  
    this.cepService.findCep(cepValue).subscribe(data => { 
      if(data.erro) {
        this.toastr.info("CEP não econtrado");
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

  private buildForm(): void {
    this.formGroup = this.fb.group({
      'client': this.fb.group({
        'name': '',
        'phoneNumber': '',
        'email': ['', Validators.required],
        'cpfCnpj': '',
        'address': this.fb.group({
          'cep': '',
          'city': '',
          'uf': '',
          'logradouro': '',
          'complement': '',
        })
      })
    })
  }
}
