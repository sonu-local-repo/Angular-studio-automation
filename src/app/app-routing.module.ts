import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from '@core/services/auth-guard.service';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: './feature/auth/auth.module#AuthModule'
  },
  {
    path: '',
    loadChildren: './feature/inner/inner.module#InnerModule',
    canActivate: [AuthGuardService],
    canActivateChild: [AuthGuardService],
    data: { breadcrumb: 'Home' }
  },

  {
    path: '**',
    redirectTo: 'auth/login'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
