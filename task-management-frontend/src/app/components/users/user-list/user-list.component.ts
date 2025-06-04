import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbPagination, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PAGIGNATION } from '../../../core/models/pagignation';
import { User } from '../../../core/models/user.model';
import { UserService } from '../../../core/services/user.service';
import { UserFormComponent } from '../user-form/user-form.component';


@Component({
  selector: 'app-user-list',
  imports: [CommonModule, RouterModule, NgbPagination,FormsModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss',
})
export class UserListComponent {
  state = PAGIGNATION;

  users: User[] = [];
  loading = false;

  constructor(
    private userService: UserService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.loading = true;
    this.userService.searchUsers(this.state).subscribe(
      (users: any) => {
        this.users = users.content;this.state.totalRecords = users.totalElements;
        this.loadPage();
        console.log('users = ', users);
        this.loading = false;
      },
      (error: any) => {
        this.loading = false;
        console.error('Error loading users:', error);
      }
    );
  }
  /**
   * Pagination
   */
  loadPage() {
    this.state.startIndex =
      (this.state.pageNumber - 1) * this.state.pageSize + 1;
    this.state.endIndex =
      (this.state.pageNumber - 1) * this.state.pageSize + this.state.pageSize;
    if (this.state.endIndex > this.state.totalRecords) {
      this.state.endIndex = this.state.totalRecords;
    }
  }
  onSort(column: string) {
    if (column === this.state.sortColumn) {
      // Reverse the direction if clicking on the same column
      this.state.sortDirection =
        this.state.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      // Set the new sorting column and direction
      this.state.sortColumn = column;
      this.state.sortDirection = 'asc';
    }
    // reload data
    this.loadUsers();
  }
  deleteUser(userId: string): void {
    if (confirm('Are you sure you want to delete this user?')) {
      this.userService.deleteUser(userId).subscribe(
        () => {
          this.users = this.users.filter((user) => user.id !== userId);
        },
        (error: any) => {
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
    modalRef.result.then(() => {
      this.loadUsers();
    });
  }
}
