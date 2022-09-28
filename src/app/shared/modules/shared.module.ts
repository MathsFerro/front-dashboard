import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SidenavModule } from '../components/sidenav/sidenav.module';
import { ConfirmDialogModule } from '../components/confirm-dialog/confirm-dialog.module';
import { TableEquipmentModule } from '../components/table-equipment/table-equipment.module';
import { PaginationTableModule } from '../components/pagination-table/pagination-table.module';

@NgModule({
  imports: [
    CommonModule,
    SidenavModule,
    ConfirmDialogModule,
    TableEquipmentModule,
    PaginationTableModule
  ], 
  exports: [
    SidenavModule,
    ConfirmDialogModule,
    TableEquipmentModule,
    PaginationTableModule
  ]
})
export class SharedModule { }
