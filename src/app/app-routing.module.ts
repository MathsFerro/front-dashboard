import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './modules/login/login.component';
import { AuthGuardService } from './shared/services/auth-guard.service';

const routes: Routes = [
  { 
    path: '', 
    loadChildren: () => import('./shared/components/sidenav/sidenav-routing.module').then(m => m.SidenavRoutingModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'login',
    component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
