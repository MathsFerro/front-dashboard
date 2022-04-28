import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientRoutingModule } from './client-routing.module';
import { ClientComponent } from './client.component';
import { SearchClientComponent } from './components/search-client/search-client.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ClientService } from './services/client.service';
import { AngularMaterialModule } from 'src/app/shared/modules/angular-material.module';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { AddClientComponent } from './components/add-client/add-client.component';
import { TableClientComponent } from './components/table-client/table-client.component';
import { FormAddClientComponent } from './components/form-add-client/form-add-client.component'
import { HttpClientModule } from '@angular/common/http';
import { DialogClientShowEquipmentComponent } from './components/dialog-client-show-equipment/dialog-client-show-equipment.component';
import { TableEquipmentComponent } from 'src/app/shared/components/table-equipment/table-equipment.component';
import { TableEquipmentModule } from 'src/app/shared/components/table-equipment/table-equipment.module';
import { PaginationTableModule } from 'src/app/shared/components/pagination-table/pagination-table.module';

@NgModule({
  declarations: [
    ClientComponent, 
    SearchClientComponent, 
    AddClientComponent, 
    TableClientComponent, 
    FormAddClientComponent, 
    DialogClientShowEquipmentComponent
  ],
  imports: [
    CommonModule,
    ClientRoutingModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    TableEquipmentModule,
    PaginationTableModule,
    HttpClientModule,
    NgxMaskModule.forRoot(),
  ],
  providers: [ClientService],
  exports: [ClientComponent]
})
export class ClientModule { }
