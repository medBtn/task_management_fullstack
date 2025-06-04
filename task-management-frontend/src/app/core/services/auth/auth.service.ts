import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { UserStorageService } from './user-storage.service';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  // Headers are now managed by the auth interceptor

  constructor(
    private http: HttpClient,
    private userStorage: UserStorageService
  ) {}

  register(signupRequest: any) {
    return this.http.post(`${environment.apiKey}/sign-up`, signupRequest);
  }

  login(username: string, password: string) {
    const body = { username, password };

    return this.http
      .post(`${environment.apiKey}/authenticate`, body, {
        observe: 'response',
      })
      .pipe(
        map((res) => {
          const token = res.headers.get('Authorization')?.substring(7);
          const user = res.body;
          if (token && user) {
            this.userStorage.saveToken(token);
            this.userStorage.saveUser(user);
            return true;
          }
          return false;
        })
      );
  }
}
