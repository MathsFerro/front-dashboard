import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationTableComponent } from './pagination-table.component';
import { AngularMaterialModule } from '../../modules/angular-material.module';



@NgModule({
  declarations: [PaginationTableComponent],
  imports: [
    AngularMaterialModule,
    CommonModule
  ],
  exports: [PaginationTableComponent]
})
export class PaginationTableModule { }
