import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { User } from '../../../../core/models/user.model';
import { UserService } from '../../../../core/services/user.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserFormComponent } from '../user-form/user-form.component';

@Component({
  selector: 'app-user-list',
  imports: [CommonModule, RouterModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss',
})
export class UserListComponent {
  users: User[] = [];
  loading = false;
  error = '';

  constructor(
    private userService: UserService,
    private modalService: NgbModal
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
      (error: any) => {
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
        (error: any) => {
          this.error = 'Failed to delete user';
          console.error('Error deleting user:', error);
        }
      );
    }
  }

  openModal(user?: User) {
    const modalRef = this.modalService.open(UserFormComponent, {
      size: 'md',
      centered: true,
    });
    if (user) {
      modalRef.componentInstance.user = user;
    }
    modalRef.result.then((user: User) => {
      this.loadUsers();
    });
  }
}
