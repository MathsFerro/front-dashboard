import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfirmDialogComponent } from './confirm-dialog.component';
import { AngularMaterialModule } from '../../modules/angular-material.module';


@NgModule({
  declarations: [
    ConfirmDialogComponent
  ],
  imports: [
    AngularMaterialModule,
    CommonModule
  ],
  exports: [
    ConfirmDialogComponent
  ]
})
export class ConfirmDialogModule { }
