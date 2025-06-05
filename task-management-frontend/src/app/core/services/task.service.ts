import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../models/task.model';
import { environment } from '../../../environments/environment';
import { UserStorageService } from './auth/user-storage.service';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private apiUrl = `${environment.apiKey}`;

  constructor(private http: HttpClient) {}

  // Search tasks (admin only)
  searchTasks(state: any): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.apiUrl}/tasks` +
        `?page=${state.pageNumber - 1}` +
        `&size=${state.pageSize}` +
        `&sort=${state.sortColumn},${state.sortDirection}` +
        (state.searchTerm ? `&searchTerm=${state.searchTerm}` : ``)
    );
  }

  getAssignedTask(state: any): Observable<any[]> {
    const userId = UserStorageService.getUserId();
    console.log('assignedtaskuserid:', userId);

    return this.http.get<any[]>(
      `${this.apiUrl}/assigned/${userId}` +
        `?page=${state.pageNumber - 1}` +
        `&size=${state.pageSize}` +
        `&sort=${state.sortColumn},${state.sortDirection}` +
        (state.searchTerm ? `&searchTerm=${state.searchTerm}` : ``)
    );
  }

  // Get task by ID
  getTaskById(taskId: string): Observable<Task> {
    return this.http.get<Task>(`${this.apiUrl}/task/${taskId}`);
  }

  // Create a new task (admin only)
  createTask(task: Task): Observable<Task> {
    return this.http.post<Task>(`${this.apiUrl}/task`, task);
  }

  // Update a task
  updateTask(task: Task): Observable<Task> {
    return this.http.put<Task>(`${this.apiUrl}/task`, task);
  }

  // Delete a task (admin only)
  deleteTask(taskId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/task/${taskId}`);
  }
}
