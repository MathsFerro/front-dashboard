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
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder  
  ) { }

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      'annotations': this.fb.array([])
    });

    this.getAnnotations();
  }

  get annotations(): FormArray {
    return this.formGroup.controls['annotations'] as FormArray;
  }

  getAnnotations() {
    this.data.map((value: any) => {
      this.addAnnotation(value.description);
    });
  }

  addAnnotation(value?: any) {
    const annotation = this.fb.group({
      'description': value ? value : ['']
    });

    this.annotations.push(annotation);
  }

  removeAnnotation(idx: number) {
    this.annotations.removeAt(idx);
  }

}
