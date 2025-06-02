import { Injectable } from '@angular/core';

const TOKEN = 'token-key';
const USER = 'user-key';

@Injectable({
  providedIn: 'root',
})
export class UserStorageService {
  constructor() {}

  public saveToken(token: string) {
    localStorage.removeItem(TOKEN);
    localStorage.setItem(TOKEN, token);
  }

  public saveUser(user: any) {
    localStorage.removeItem(USER);
    localStorage.setItem(USER, JSON.stringify(user));
  }

  static getToken(): string {
    return localStorage.getItem(TOKEN)!;
  }

  static getUser(): any {
    return JSON.parse(localStorage.getItem(USER)!);
  }

  static getUserId(): string {
    const user = this.getUser();
    return user ? user.userId : '';
  }
  static getUserRole(): string {
    const user = this.getUser();
    return user ? user.role : '';
  }

  static isAdminLoggedIn(): boolean {
    if (this.getToken() === null) return false;
    return this.getUserRole() == 'ADMIN';
  }

  static isUserLoggedIn(): boolean {
    if (this.getToken() === null) return false;
    return this.getUserRole() == 'CUSTOMER';
  }

  static signOut() {
    localStorage.removeItem(USER);
    localStorage.removeItem(TOKEN);
  }
}
