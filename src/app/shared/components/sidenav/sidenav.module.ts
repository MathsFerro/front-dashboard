import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SidenavRoutingModule } from './sidenav-routing.module';

import { SidenavComponent } from './sidenav.component';
import { ItemMenuComponent } from './item-menu/item-menu.component';

import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularMaterialModule } from '../../modules/angular-material.module';

@NgModule({
  declarations: [
    SidenavComponent,
    ItemMenuComponent,
  ],
  imports: [
    CommonModule,
    SidenavRoutingModule,
    NgbTooltipModule,
    AngularMaterialModule
  ],
  exports: [SidenavComponent, ItemMenuComponent]
})
export class SidenavModule { }
