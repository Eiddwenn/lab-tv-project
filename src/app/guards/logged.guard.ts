import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { inject } from '@angular/core';

export const loggedGuard: CanActivateFn = () => {

  const router: Router = inject(Router);
  const token = localStorage.getItem('user')

  if(token) {
    return true;
  } else {
    localStorage.removeItem('token')
    router.navigateByUrl('unauthorized');
    return false;
  }

};
