import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../models/task.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private apiUrl = `${environment.apiKey}/tasks`;

  constructor(private http: HttpClient) {}

  // Get all tasks (admin only)
  getAllTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl);
  }

  // Get tasks assigned to a specific user
  getUserTasks(userId: string): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.apiUrl}/user/${userId}`);
  }

  // Get a specific task by ID
  getTaskById(taskId: string): Observable<Task> {
    return this.http.get<Task>(`${this.apiUrl}/${taskId}`);
  }

  // Create a new task (admin only)
  createTask(task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>): Observable<Task> {
    return this.http.post<Task>(this.apiUrl, task);
  }

  // Update a task (admin only)
  updateTask(taskId: string, task: Partial<Task>): Observable<Task> {
    return this.http.put<Task>(`${this.apiUrl}/${taskId}`, task);
  }

  // Update task status (user can update their own tasks)
  updateTaskStatus(taskId: string, status: 'TODO' | 'IN_PROGRESS' | 'COMPLETED'): Observable<Task> {
    return this.http.patch<Task>(`${this.apiUrl}/${taskId}/status`, { status });
  }

  // Assign task to user (admin only)
  assignTask(taskId: string, userId: string): Observable<Task> {
    return this.http.patch<Task>(`${this.apiUrl}/${taskId}/assign`, { userId });
  }

  // Delete a task (admin only)
  deleteTask(taskId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${taskId}`);
  }
}
