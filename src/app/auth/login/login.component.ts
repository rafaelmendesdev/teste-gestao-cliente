import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  formularioLogin!: FormGroup;
  mensagemErro: string = '';
  carregando: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.criarFormulario();
  }

  private criarFormulario() {
    this.formularioLogin = this.fb.group({
      usuario: ['', [Validators.required]],
      senha: ['', [Validators.required]]
    });
  }

  efetuarLogin(): void {
    if (this.formularioLogin.invalid) {
      return;
    }
    this.carregando == true;
    this.mensagemErro = '';
    const { usuario, senha } = this.formularioLogin.value;

    // consumir serviço de autenticação reativo
    this.authService.login(usuario, senha).subscribe({
      next: (sucesso) => {
        if (sucesso) {
          // redirecionar para rota protegida formulário de clientes
          this.router.navigate(['/clientes']);
        } else {
          this.mensagemErro = 'Usuário ou senha inválidos. Tente novamente.'
          this.carregando = false;
        }
      },
      error: () => {
        this.mensagemErro = 'Ocorreu um erro inesperado no sistema';
        this.carregando = false;
      }
    });
  }
}
