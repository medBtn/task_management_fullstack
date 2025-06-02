import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserStorageService } from '../../services/auth/user-storage.service';

export const userGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  if (UserStorageService.isUserLoggedIn()) {
    return true;
  } else {
    // Redirect to login page if not user
    router.navigate(['/login']);
    return false;
  }
};
