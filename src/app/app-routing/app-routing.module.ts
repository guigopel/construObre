import { HomeComponent } from './../home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClienteComponent } from '../cliente/cliente.component';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';
import { CadProductComponent } from '../product/cadProduct.component';
import { ListProductComponent } from '../product/listProduct/listProduct.component';
import { VisualizarProfissionalComponent } from '../visualizarProfissional/visualizarProfissional.component';
import { ListProfessionalComponent } from '../visualizarProfissional/list/listProfessional.component';
import { RelacaoLojaComponent } from '../loja/relacao/relacaoLoja.component';
import { LojaComponent } from '../loja/loja.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'registro', component: RegisterComponent},
  { path: 'cadCliente', component: ClienteComponent},
  { path: 'cadProduto', component: CadProductComponent},
  { path: 'produtos', component: ListProductComponent},
  { path: 'lojas', component: RelacaoLojaComponent},
  { path: 'lojas/:id', component: LojaComponent},
  { path: 'profissional/:id', component: VisualizarProfissionalComponent},
  { path: 'profissional', component: ListProfessionalComponent},
  { path: 'home', component: HomeComponent},
  { path: '', component: HomeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
