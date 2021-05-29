import { HomeComponent } from './../home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClienteComponent } from '../cliente/cliente.component';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';
import { RelacaoLojaComponent } from '../loja/relacao/relacaoLoja.component';
import { LojaComponent } from '../loja/loja.component';
import { CadProdutoComponent } from '../produto/cadProduto.component';
import { ListProdutoComponent } from '../produto/listProduto/listProduto.component';
import { ListProfissionalComponent } from '../profissional/list/listProfissional.component';
import { ProfissionalComponent } from '../profissional/profissional.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'registro', component: RegisterComponent},
  { path: 'cadCliente', component: ClienteComponent},
  { path: 'cadProduto', component: CadProdutoComponent},
  { path: 'produtos', component: ListProdutoComponent},
  { path: 'lojas', component: RelacaoLojaComponent},
  { path: 'lojas/:id', component: LojaComponent},
  { path: 'profissional/:id', component: ProfissionalComponent},
  { path: 'profissional', component: ListProfissionalComponent},
  { path: 'home', component: HomeComponent},
  { path: '', component: HomeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
