import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { LoginDataService } from '../../public-api';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(LoginDataService);
  const router = inject(Router);

  if (authService.authToken) {
    return true;
  }
  // Redirect to the login page
  return router.parseUrl('/login');  
};
