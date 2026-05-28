import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'teste-gestao-clientes';
  
  // estado de exibicao SE listagem ou formulario
  telaExibicao: 'listaClientes' | 'formularioClientes' = 'listaClientes';

  // guarda ID se clique em EDITAR
  idSelecionado: number | null = null;

  abrirFormularioCadastro(): void {
    this.idSelecionado = null;
    this.telaExibicao = 'formularioClientes'
  }

  abrirFormularioEdicao(id: number): void {
    this.idSelecionado = id;
    this.telaExibicao = 'formularioClientes';
  }

  voltarLista(): void {
    this.telaExibicao = 'listaClientes';
    this.idSelecionado = null;
  }
}
