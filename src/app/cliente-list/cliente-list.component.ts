import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../auth/services/auth.service';
import { Cliente } from '../cliente.model';
import { ClienteService } from '../cliente.service';

@Component({
  selector: 'app-cliente-list',
  templateUrl: './cliente-list.component.html',
  styleUrl: './cliente-list.component.scss'
})

export class ClienteListComponent implements OnInit {
  // array da tabela
  clientes: Cliente[] = [];

  // controla o estado do TEMA
  isDarkMode: boolean = false;

  // colunas da tabela
  colunasTabela: string[] = ['nome', 'email', 'telefone', 'cpf_cnpj', 'dataAlteracao', 'acoes'];

  constructor(
    private clienteService: ClienteService,
    private authService: AuthService,
    private router: Router,
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document
  ) { }

  ngOnInit(): void {
    // receber lista
    this.clienteService.clientes$.subscribe(dados => {
      this.clientes = dados;
    });
  }

  toogleTheme(): void {
    this.isDarkMode = !this.isDarkMode;

    if (this.isDarkMode) {
      this.renderer.addClass(this.document.body, 'dark-theme');
    } else {
      this.renderer.removeClass(this.document.body, 'dark-theme')
    }

  }

  novoCliente(): void {
    console.log('Novo cliente');
    this.router.navigate(['/clientes/novo']);
  }

  editar(id: number): void {
    console.log('Editar cliente', id);
    this.router.navigate(['/clientes/editar', id]);
  }

  deletar(id: number): void {
    if (confirm('Deseja excluir este cliente?')) {
      this.clienteService.deleteCliente(id);
    }
  }

  deslogar(): void {
    this.authService.logout();
  }
}
