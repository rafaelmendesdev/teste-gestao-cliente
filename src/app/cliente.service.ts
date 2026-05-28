import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Cliente } from './cliente.model';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  // para iniciar lista com dados
  private dadosClientes: Cliente[] = [
    { id: 1, nome: 'Silva Sauro', email: 'silva@email.com', telefone: '11999998888', cpf_cnpj: '12345678901', dataAlteracao: new Date().toLocaleDateString() },
    { id: 2, nome: 'Maria Souza', email: 'maria@email.com', telefone: '11988887777', cpf_cnpj: '98765432100', dataAlteracao: new Date().toLocaleDateString() }
  ];

  // para controlar estado dos clientes na memória
  private clientesSubject = new BehaviorSubject<Cliente[]>(this.dadosClientes)

  // Observable para listar dados
  clientes$: Observable<Cliente[]> = this.clientesSubject.asObservable();

  constructor() { }

  private get listaClientes(): Cliente[] {
    return this.clientesSubject.value;
  }

  // buscar/editar cliente por ID
  getClienteById(id: number): Cliente | undefined {
    return this.listaClientes.find(cliente => cliente.id === id);
  }

  // NOVO cliente
  createCliente(cliente: Cliente): void {
    const novoCliente = {
      ...cliente,
      id: Date.now(), // é um id temporário
      dataAlteracao: new Date().toLocaleDateString()
    };
    this.clientesSubject.next([...this.listaClientes, novoCliente]);
  }

  // EDITAR
  updateCliente(atualizacaoCliente: Cliente): void {
    const listar = this.listaClientes.map(cliente => {
      
      if (cliente.id === atualizacaoCliente.id) {
        return {...atualizacaoCliente, dataAlteracao: new Date().toLocaleDateString() };
      }

      return cliente;
    });
    this.clientesSubject.next(listar);
  }

  // EXCLUIR
  deleteCliente(id: number): void {
    const listar = this.listaClientes.filter(cliente => cliente.id !== id)
    this.clientesSubject.next(listar);
  }
}
