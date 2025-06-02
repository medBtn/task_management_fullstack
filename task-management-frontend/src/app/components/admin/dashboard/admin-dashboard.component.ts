import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TaskService } from '../../../core/services/task.service';
import { UserService } from '../../../core/services/user.service';
import { Task } from '../../../core/models/task.model';
import { User } from '../../../core/models/user.model';
import { UserListComponent } from '../users/user-list/user-list.component';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, UserListComponent],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss'],
})
export class AdminDashboardComponent implements OnInit {
  tasks: Task[] = [];
  users: User[] = [];
  loading = false;
  error = '';

  constructor(
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.loading = true;
    this.userService.getAllUsers().subscribe(
      (users: any) => {
        this.users = users.content;
        console.log('users = ', users);
        this.loading = false;
      },
      (error) => {
        this.error = 'Failed to load users';
        this.loading = false;
        console.error('Error loading users:', error);
      }
    );
  }

  deleteUser(userId: string): void {
    if (confirm('Are you sure you want to delete this user?')) {
      this.userService.deleteUser(userId).subscribe(
        () => {
          this.users = this.users.filter((user) => user.id !== userId);
        },
        (error) => {
          this.error = 'Failed to delete user';
          console.error('Error deleting user:', error);
        }
      );
    }
  }
}
