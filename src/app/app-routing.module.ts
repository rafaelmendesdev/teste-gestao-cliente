import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { ClienteListComponent } from './cliente-list/cliente-list.component';
import { authGuard } from './auth/guards/auth.guard';

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
