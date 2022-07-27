import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SidenavComponent } from './sidenav.component';

const routes: Routes = [
  { path: 'dashboard', loadChildren: () => import(`../../../modules/dashboard/dashboard.module`).then(m => m.DashboardModule) },
  { path: 'client', loadChildren: () => import(`../../../modules/client/client-routing.module`).then(m => m.ClientRoutingModule) },
  { path: 'service-order', loadChildren: () => import(`../../../modules/service-order/service-order.module`).then(m => m.ServiceOrderModule) }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SidenavRoutingModule { }
