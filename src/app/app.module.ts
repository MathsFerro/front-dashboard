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
import { ToastrModule } from 'ngx-toastr';
import { LoginComponent } from './modules/login/login.component';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { AuthenticationService } from './shared/services/authentication.service';
import { AuthGuardService } from './shared/services/auth-guard.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptorService } from './shared/services/token-interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
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
    AngularMaterialModule,
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
