import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = `${environment.apiKey}`;

  constructor(private http: HttpClient) {}

  // Search users (admin only)
  searchUsers(state:any): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.apiUrl}/users` +
        `?page=${state.pageNumber - 1}` +
        `&size=${state.pageSize}` +
        `&sort=${state.sortColumn},${state.sortDirection}` +
        (state.searchTerm ? `&searchTerm=${state.searchTerm}` : ``)
    );
  }

  // Get user by ID
  getUserById(userId: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/user/${userId}`);
  }

  // Create a new user (admin only)
  createUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/user`, user);
  }

  // Update a user
  updateUser(user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/user`, user);
  }

  // Delete a user (admin only)
  deleteUser(userId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/user/${userId}`);
  }
}
