import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClienteService } from '../cliente.service';
import { Cliente } from '../cliente.model';

@Component({
  selector: 'app-cliente-form',
  templateUrl: './cliente-form.component.html',
  styleUrl: './cliente-form.component.scss'
})

export class ClienteFormComponent {
  // formulário se prepara para EDITAR ou CRIAR
  @Input() clienteId: number | null = null;

  // evento para salvar e voltar a lista
  @Output() clienteSalvo = new EventEmitter<void>();
  formularioPrincipal!: FormGroup;

  constructor(private formBuilder: FormBuilder, private clienteService: ClienteService) { }

  ngOnInit(): void {
    // criacão formulario reativo + validações
    this.formularioPrincipal = this.formBuilder.group({
      id: [null],
      nome: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      telefone: ['', [Validators.required]],
      cpf_cnpj:['',[Validators.required]]
    });

    // edição, buscar/carregar dados dos clientes
    if (this.clienteId) {
      const clienteCadastrado = this.clienteService.getClienteById(this.clienteId);
      
      if (clienteCadastrado) {
        this.formularioPrincipal.patchValue(clienteCadastrado);
      }
    }
  }

  salvar(): void {
    // validação para formulario preenchido
    if (this.formularioPrincipal.invalid){
      return;
    }
    const dadosCliente: Cliente = this.formularioPrincipal.value;

    if (dadosCliente.id) {
      // id existe, atualiza
      this.clienteService.updateCliente(dadosCliente);
    } else {
      // id não existe, criar cliente
      this.clienteService.createCliente(dadosCliente);
    }

    // cliente cadastrado, fechar formulario
    this.clienteSalvo.emit();
  }

  cancelar(): void {
    // sem cadastro, fechar formulario
    this.clienteSalvo.emit();
  }

  formatarCpfAoDigitar(event: any): void {
    let valor = event.target.value.replace(/\D/g, ''); // Remove letras

    // Se passar de 14 dígitos (tamanho máximo do CNPJ), limita o tamanho
    if (valor.length > 14) {
      valor = valor.slice(0, 14);
    }
    
    // Aplica a máscara dinamicamente baseado no tamanho do que foi digitado
    if (valor.length <= 11) {
      // Máscara de CPF: 000.000.000-00
      valor = valor.replace(/(\d{3})(\d)/, '$1.$2');
      valor = valor.replace(/(\d{3})(\d)/, '$1.$2');
      valor = valor.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    } else {
      // Máscara de CNPJ: 00.000.000/0001-00
      valor = valor.replace(/^(\d{2})(\d)/, '$1.$2');
      valor = valor.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3');
      valor = valor.replace(/\.(\d{3})(\d)/, '.$1/$2');
      valor = valor.replace(/(\d{4})(\d{1,2})$/, '$1-$2');
    }

    this.formularioPrincipal.patchValue({ cpf_cnpj: valor }, { emitEvent: false });
  }

  formatarTelefoneAoDigitar(event: any): void {
    let valor = event.target.value.replace(/\D/g, '');
    if (valor.length > 11) valor = valor.slice(0, 11);

    valor = valor.replace(/^(\d{2})(\d)/g, '($1) $2');
    valor = valor.replace(/(\d)(\d{4})$/, '$1-$2');

    this.formularioPrincipal.patchValue({ telefone: valor }, { emitEvent: false });
  }
}
