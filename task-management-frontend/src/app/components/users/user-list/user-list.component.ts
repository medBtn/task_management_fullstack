import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbPagination, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PAGIGNATION } from '../../../core/models/pagignation';
import { User } from '../../../core/models/user.model';
import { UserService } from '../../../core/services/user.service';
import { UserFormComponent } from '../user-form/user-form.component';
import {
  confirmDelete,
  errorAlert,
  successAlert,
} from '../../../core/models/sweet-alert.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-list',
  imports: [CommonModule, RouterModule, NgbPagination, FormsModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss',
})
export class UserListComponent {
  state = { ...PAGIGNATION };

  users: User[] = [];
  isLoading = false;

  constructor(
    private userService: UserService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.isLoading = true;
    this.userService.searchUsers(this.state).subscribe(
      (users: any) => {
        this.users = users.content;
        this.state.totalRecords = users.totalElements;
        this.loadPage();
        console.log('users = ', users);
        this.isLoading = false;
      },
      (error: any) => {
        this.isLoading = false;
        console.error('Error isLoading users:', error);
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

  deleteUser(user: User) {
    confirmDelete(user.username).then((confirmed) => {
      if (confirmed) {
        this.userService.deleteUser(user.id!).subscribe({
          next: (res) => {
            successAlert('Success', 'Delete successfull');
            this.loadUsers();
          },
          error: (err) => {
            errorAlert('Error', err);
          },
        });
      }
    });
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
