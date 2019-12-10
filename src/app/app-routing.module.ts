import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { UserListComponent } from './user-list/user-list.component';
import { AuthGaurd } from './auth/auth.gaurd';


const routes: Routes = [
  {path: '', pathMatch: 'full', component: AuthComponent},
  {path: 'users', component: UserListComponent, canActivate: [AuthGaurd]},
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
