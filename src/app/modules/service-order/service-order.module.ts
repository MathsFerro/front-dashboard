import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServiceOrderRoutingModule } from './service-order-routing.module';
import { AngularMaterialModule } from 'src/app/shared/modules/angular-material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ServiceOrderComponent } from './service-order.component';


@NgModule({
  declarations: [ServiceOrderComponent],
  imports: [
    CommonModule,
    ServiceOrderRoutingModule,
    ReactiveFormsModule,
    AngularMaterialModule
  ]
})
export class ServiceOrderModule { }
