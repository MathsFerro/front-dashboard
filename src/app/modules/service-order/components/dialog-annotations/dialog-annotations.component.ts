import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-annotations',
  templateUrl: './dialog-annotations.component.html',
  styleUrls: ['./dialog-annotations.component.scss']
})
export class DialogAnnotationsComponent implements OnInit {

  formGroup: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: FormArray,
    private fb: FormBuilder  
  ) { }

  ngOnInit(): void {
    console.log(this.data);

    this.formGroup = this.fb.group({
      'annotations': this.data
    });
  
  }

  get annotations(): FormArray {
    return this.formGroup.controls['annotations'] as FormArray;
  }

  get annotation(): FormGroup {
    return this.fb.group({
      'description': ['']
    });
  }

  addAnnotation() {
    const annotation = this.annotation;
    this.annotations.push(annotation);
  }

  removeAnnotation(idx: number) {
    this.annotations.removeAt(idx);
  }

}
