import { AuthService } from './../services/auth.service';
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map, take } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.isLoggedIn().pipe(
    take(1),
    map(isLogged => {
      if (isLogged) {
        // permitir acesso
        return true;
      } else {
        // retorna login e não permite acesso
        router.navigate(['/login']);
        return false;
      }
    })
  )
};
