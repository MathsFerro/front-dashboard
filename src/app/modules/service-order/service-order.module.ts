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
import { SearchServiceOrderComponent } from './components/search-service-order/search-service-order.component';
import { TableServiceOrderComponent } from './components/table-service-order/table-service-order.component';
import { PaginationTableModule } from 'src/app/shared/components/pagination-table/pagination-table.module';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { EquipmentService } from '../equipment/services/equipment.service';


@NgModule({
  declarations: [ServiceOrderComponent, FormServiceOrderComponent, DialogAnnotationsComponent, SearchServiceOrderComponent, TableServiceOrderComponent],
  imports: [
    CommonModule,
    ServiceOrderRoutingModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    FormsModule,
    PaginationTableModule,
    NgxMaskModule.forRoot()
  ],
  providers: [
    ServiceOrderService, 
    CepService,
    EquipmentService
  ],
  exports: [ServiceOrderComponent]
})
export class ServiceOrderModule { }
