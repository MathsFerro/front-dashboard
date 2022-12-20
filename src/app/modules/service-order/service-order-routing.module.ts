import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from 'src/app/core/services/auth-guard.service';
import { FormServiceOrderComponent } from './components/form-service-order/form-service-order.component';
import { EditServiceOrderComponent } from './pages/edit-service-order/edit-service-order.component';
import { NewServiceOrderComponent } from './pages/new-service-order/new-service-order.component';
import { ServiceOrderComponent } from './service-order.component';

const routes: Routes = [
  { path: '', component: ServiceOrderComponent}, //, canActivate: [AuthGuardService] 
  // { path: 'add-service-order', component: FormServiceOrderComponent, canActivate: [AuthGuardService] },
  { path: 'add-service-order', component: NewServiceOrderComponent, canActivate: [AuthGuardService] },
  { path: 'edit-service-order', component: EditServiceOrderComponent, canActivate: [AuthGuardService] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServiceOrderRoutingModule { }
