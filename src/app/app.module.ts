import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ClientModule } from './modules/client/client.module';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { NgbAlertModule, NgbModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './shared/modules/shared.module';
import { AngularMaterialModule } from './shared/modules/angular-material.module';
import { PaginationTableComponent } from './shared/components/pagination-table/pagination-table.component';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ClientModule,
    DashboardModule,
    NgbModule,
    NgbPaginationModule, 
    NgbAlertModule,
    ReactiveFormsModule,
    SharedModule,
    AngularMaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
