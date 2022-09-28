import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EquipmentComponent } from '../modules/equipment/equipment.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: 'service-order', loadChildren: () => import(`../modules/service-order/service-order.module`).then(m => m.ServiceOrderModule) },
  { path: 'equipment', loadChildren: () => import(`../modules/equipment/equipment-routing.module`).then(m => m.EquipmentRoutingModule)}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NavigationRoutingModule { }
