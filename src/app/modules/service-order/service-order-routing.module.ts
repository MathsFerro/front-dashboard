import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormServiceOrderComponent } from './components/form-service-order/form-service-order.component';
import { ServiceOrderComponent } from './service-order.component';

const routes: Routes = [
  { path: '', component: ServiceOrderComponent },
  { path: 'add-service-order', component: FormServiceOrderComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServiceOrderRoutingModule { }
