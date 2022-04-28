import { Component, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MaskUtils } from '../../../../shared/utils/MaskUtils';

@Component({
  selector: 'app-search-client',
  templateUrl: './search-client.component.html',
  styleUrls: ['./search-client.component.scss']
})
export class SearchClientComponent implements OnInit {

  public phoneMask = MaskUtils["phoneMask"];
  public formGroup: FormGroup;
  public expanded: boolean = false;

  constructor(
    private fb: FormBuilder
  ) { 
    this.buildFormGroup();
  }

  ngOnInit(): void {
    
  }

  buildFormGroup(): void {
    this.formGroup = this.fb.group({
      name: [''],
      phoneNumber: ['', Validators.minLength(11)],
      email: ['', Validators.email]
    });
  }

  submitForm() {
    if(!this.formGroup.valid)
      return;

    this.expanded = false;
    console.log("submit")
  }
}
