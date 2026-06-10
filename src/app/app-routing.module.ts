import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { authGuard } from './auth/guards/auth.guard';
import { LoginComponent } from './auth/login/login.component';
import { ClienteFormComponent } from './cliente-form/cliente-form.component';
import { ClienteListComponent } from './cliente-list/cliente-list.component';

// área de gestão das rotas
const routes: Routes = [
  // rota de login (livre)
  { path: 'login', component: LoginComponent },

  // rota de clientes (protegida pelo guard)
  {
    path: 'clientes',
    component: ClienteListComponent,
    // trava de segurança
    canActivate: [authGuard]
  },

  // cadastro de novo cliente
  { path: 'clientes/novo', component: ClienteFormComponent, canActivate: [authGuard] },

  // editar cliente existente
  { path: 'clientes/editar/:id', component: ClienteFormComponent, canActivate: [authGuard] },

  // redirecionamento inicial acessando 'root', vai para clientes que vai exigir login
  { path: '', redirectTo: '/clientes', pathMatch: 'full' },

  // para paginas inexistentes
  { path: '**', redirectTo: '/clientes' }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
