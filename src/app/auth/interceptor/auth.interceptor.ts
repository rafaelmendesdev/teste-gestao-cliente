import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  // busca token no AuthService guardado no navegador
  const token = localStorage.getItem('token_acesso_gestao');

  // SE token exite, a requisição é clona e injetada no header de Authorization
  if(token) {
    const cloneRequest = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next(cloneRequest);
  }
   // caso não exista token, seguir fluxo natural com requisição original
    return next(req);
};