import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgbAlertModule, NgbModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './shared/modules/shared.module';
import { AngularMaterialModule } from './shared/modules/angular-material.module';
import { PaginationTableComponent } from './shared/components/pagination-table/pagination-table.component';
import { ToastrModule } from 'ngx-toastr';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthGuardService } from './core/services/auth-guard.service';
import { AuthenticationService } from './core/services/authentication.service';
import { TokenInterceptorService } from './core/services/token-interceptor.service';
import { NavigationModule } from './core/navigation.module';
import { NavigationRoutingModule } from './core/navigation-routing.module';
import { NavigationCancel, RouterModule } from '@angular/router';
import { NavigationComponent } from './core/navigation.component';
import { AppRoutingModule } from './app-routing.module';
import { EquipmentComponent } from './modules/equipment/equipment.component';

@NgModule({
  declarations: [
    AppComponent,
    EquipmentComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NavigationModule,
    NgbModule,
    NgbPaginationModule, 
    NgbAlertModule,
    HttpClientModule,
    ReactiveFormsModule,
    SharedModule,
    AngularMaterialModule,
    AppRoutingModule,
    ToastrModule.forRoot(),
  ],
  providers: [
    AuthGuardService,
    AuthenticationService,
    JwtHelperService,
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
