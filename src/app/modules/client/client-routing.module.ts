import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientComponent } from './client.component';
import { FormClientComponent } from './components/form-client/form-client.component';

const routes: Routes = [
  { path: '', component: ClientComponent },
  { path: 'add-client', component: FormClientComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
