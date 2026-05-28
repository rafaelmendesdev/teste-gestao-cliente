import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ClienteService } from '../cliente.service';
import { Cliente } from '../cliente.model';

@Component({
  selector: 'app-cliente-list',
  templateUrl: './cliente-list.component.html',
  styleUrl: './cliente-list.component.scss'
})

export class ClienteListComponent implements OnInit{
  // array da tabela
  clientes: Cliente[] = [];

  // colunas da tabela
  colunasTabela: string[] = ['nome', 'email', 'telefone', 'cpf_cnpj', 'dataAlteracao', 'acoes'];

  @Output() cliqueNovoCliente = new EventEmitter<void>();
  @Output() cliqueEditarCliente = new EventEmitter<number>();

  constructor(private clienteService: ClienteService) { }

  ngOnInit(): void {
    // receber lista
    this.clienteService.clientes$.subscribe(dados => {
      this.clientes = dados;
    });
  }

  novoCliente(): void {
    this.cliqueNovoCliente.emit()
  }

  editar(id: number): void {
    this.cliqueEditarCliente.emit(id);
  }

  deletar(id: number): void {
    if (confirm('Deseja excluir este cliente?')) {
      this.clienteService.deleteCliente(id);
    }
  }
}
