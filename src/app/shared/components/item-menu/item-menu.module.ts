import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemMenuComponent } from './item-menu.component';
import { AngularMaterialModule } from '../../modules/angular-material.module';

@NgModule({
  declarations: [
    ItemMenuComponent
  ],
  imports: [
    AngularMaterialModule,
    CommonModule
  ],
  exports: [
    ItemMenuComponent
  ]
})
export class ItemMenuModule { }
