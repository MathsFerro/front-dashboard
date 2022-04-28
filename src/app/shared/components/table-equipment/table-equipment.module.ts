import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableEquipmentComponent } from './table-equipment.component';
import { AngularMaterialModule } from '../../modules/angular-material.module';



@NgModule({
  declarations: [TableEquipmentComponent],
  imports: [
    AngularMaterialModule,
    CommonModule
  ],
  exports: [
    TableEquipmentComponent
  ]
})
export class TableEquipmentModule { }
