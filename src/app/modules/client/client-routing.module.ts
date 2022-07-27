import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from 'src/app/shared/services/auth-guard.service';
import { ClientComponent } from './client.component';
import { FormClientComponent } from './components/form-client/form-client.component';

const routes: Routes = [
  { path: '', component: ClientComponent, canActivate: [AuthGuardService] },
  { path: 'add-client', component: FormClientComponent, canActivate: [AuthGuardService] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
