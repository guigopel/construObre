import { HomeComponent } from './../home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClienteComponent } from '../cliente/cliente.component';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'registro', component: RegisterComponent},
  { path: 'cadCliente', component: ClienteComponent},
  { path: 'home', component: HomeComponent},
  { path: '', component: HomeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
