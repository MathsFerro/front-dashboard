import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfirmDialogModule } from '../components/confirm-dialog/confirm-dialog.module';
import { PaginationTableModule } from '../components/pagination-table/pagination-table.module';
import { ItemMenu } from '../components/item-menu/models/ItemMenu';
import { ItemMenuComponent } from '../components/item-menu/item-menu.component';

@NgModule({
  imports: [
    CommonModule,
    ConfirmDialogModule,
    PaginationTableModule
  ], 
  exports: [
    ConfirmDialogModule,
    PaginationTableModule,
  ]
})
export class SharedModule { }
