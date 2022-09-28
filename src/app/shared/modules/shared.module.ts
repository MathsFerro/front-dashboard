import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfirmDialogModule } from '../components/confirm-dialog/confirm-dialog.module';
import { PaginationTableModule } from '../components/pagination-table/pagination-table.module';
import { ItemMenuModule } from '../components/item-menu/item-menu.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ConfirmDialogModule,
    PaginationTableModule,
    ItemMenuModule
  ], 
  exports: [
    ConfirmDialogModule,
    PaginationTableModule,
    ItemMenuModule
  ]
})
export class SharedModule { }
