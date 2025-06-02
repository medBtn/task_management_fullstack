import { HttpInterceptorFn } from '@angular/common/http';
import { UserStorageService } from '../../services/auth/user-storage.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // Start with default headers
  let headers = req.headers.set('Content-Type', 'application/json');

  // Get the auth token from UserStorageService
  const authToken = UserStorageService.getToken();

  // Add authorization header if token exists
  if (authToken) {
    headers = headers.set('Authorization', `Bearer ${authToken}`);
  }

  // Clone the request with the updated headers
  const modifiedReq = req.clone({ headers });

  // Proceed with the modified request
  return next(modifiedReq);
};
