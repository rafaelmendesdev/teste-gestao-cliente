import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Router } from '@angular/router'
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // verifica estado do usário autenticado ou não
  private loggedIn$ = new BehaviorSubject<boolean>(false);

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.loggedIn$.next(this.hasToken());
  }

  // blindagem para SSR
  private hasToken(): boolean {
    // se estiver no NAVEGADOR, leia o localStorage
    if (isPlatformBrowser(this.platformId)) {
      return !!localStorage.getItem('token_acesso_gestao');
    }
    // se estiver rodando apenas no NODE, nção setar nenhum token
    return false;
  }

  // mostra o estado como Observable para aplicação escutar
  isLoggedIn(): Observable<boolean> {
    return this.loggedIn$.asObservable();
  }

  // simulação de Login
  login(usuario: string, senha: string): Observable<boolean> {

    //validação simples
    if (usuario === 'admin' && senha === 'admin1') {
      const tokenEmu = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.ey'

      // validando apenas no NAVEGADOR
      if (isPlatformBrowser(this.platformId)) {
        localStorage.setItem('token_acesso_gestao', tokenEmu);
      }

      this.loggedIn$.next(true);
      return of(true);
    }
    return of(false);
  }

  // logout
  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('token_acesso_gestao');
    }
    this.loggedIn$.next(false);
    this.router.navigate(['/login']);
  }
}
