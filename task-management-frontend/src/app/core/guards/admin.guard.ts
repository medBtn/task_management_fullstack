import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserStorageService } from '../../services/auth/user-storage.service';

export const adminGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  if (UserStorageService.isAdminLoggedIn()) {
    return true;
  } else {
    // Redirect to login page if not admin
    router.navigate(['/login']);
    return false;
  }
};
