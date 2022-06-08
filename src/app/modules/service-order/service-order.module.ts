import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServiceOrderRoutingModule } from './service-order-routing.module';
import { AngularMaterialModule } from 'src/app/shared/modules/angular-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ServiceOrderComponent } from './service-order.component';
import { FormServiceOrderComponent } from './components/form-service-order/form-service-order.component';
import { ServiceOrderService } from './services/service-order.service';
import { CepService } from 'src/app/shared/services/cep.service';
import { DialogAnnotationsComponent } from './components/dialog-annotations/dialog-annotations.component';
import { NgxMaskModule } from 'ngx-mask';
import { ClientService } from '../client/services/client.service';
import { EquipmentService } from 'src/app/shared/services/equipment.service';


@NgModule({
  declarations: [ServiceOrderComponent, FormServiceOrderComponent, DialogAnnotationsComponent],
  imports: [
    CommonModule,
    ServiceOrderRoutingModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    FormsModule,
    NgxMaskModule.forRoot()
  ],
  providers: [
    ServiceOrderService, 
    CepService,
    ClientService,
    EquipmentService
  ],
  exports: [ServiceOrderComponent]
})
export class ServiceOrderModule { }
