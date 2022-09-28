import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NavigationRoutingModule } from './navigation-routing.module';
import { LoginComponent } from './login/login.component';
import { NavigationComponent } from './navigation.component';
import { SharedModule } from '../shared/modules/shared.module';
import { AngularMaterialModule } from '../shared/modules/angular-material.module';
import { ItemMenu } from '../shared/components/item-menu/models/ItemMenu';
import { RouterModule } from '@angular/router';
import { AuthenticationService } from './services/authentication.service';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { AuthGuardService } from './services/auth-guard.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { ReactiveFormsModule } from '@angular/forms';
import { ItemMenuComponent } from '../shared/components/item-menu/item-menu.component';

@NgModule({
  declarations: [LoginComponent, NavigationComponent, ItemMenuComponent],
  imports: [
    CommonModule,
    RouterModule,
    AngularMaterialModule,
    NavigationRoutingModule,
    ReactiveFormsModule
  ],
  exports: [
    RouterModule,
    NavigationComponent,
    LoginComponent
  ]
})
export class NavigationModule { }
