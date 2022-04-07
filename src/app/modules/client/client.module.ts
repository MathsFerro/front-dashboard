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
import { TableClientComponent } from './components/table-client/table-client.component'

@NgModule({
  declarations: [ClientComponent, SearchClientComponent, AddClientComponent, TableClientComponent],
  imports: [
    CommonModule,
    ClientRoutingModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    NgxMaskModule.forRoot(),
  ],
  providers: [ClientService],
  exports: [ClientComponent]
})
export class ClientModule { }
