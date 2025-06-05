import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {
  NgbModal,
  NgbPagination,
  NgbDropdownModule,
} from '@ng-bootstrap/ng-bootstrap'; // Add NgbDropdownModule
import { TaskStatusBadgeComponent } from '../task-status-badge/task-status-badge.component';
import { PAGIGNATION } from '../../../core/models/pagignation';
import { Task } from '../../../core/models/task.model';
import { TaskService } from '../../../core/services/task.service';
import { taskFormComponent } from '../task-from/task-form.component';
import { EmptyStateComponent } from '../empty-state/empty-state.component';
import { UserStorageService } from '../../../core/services/auth/user-storage.service';

@Component({
  selector: 'app-my-task',
  imports: [
    CommonModule,
    RouterModule,
    NgbPagination,
    FormsModule,
    TaskStatusBadgeComponent,
    NgbDropdownModule,
    EmptyStateComponent,
  ], // Add NgbDropdownModule here
  templateUrl: './my-task.component.html',
  styleUrl: './my-task.component.scss',
})
export class MyTaskComponent implements OnInit {
  state = {...PAGIGNATION};

  tasks: Task[] = [];
  isLoading = false;

  constructor(
    private taskService: TaskService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.isLoading = true;
    this.taskService.getAssignedTask(this.state).subscribe(
      (tasks: any) => {
        this.tasks = tasks.content;
        this.state.totalRecords = tasks.totalElements;
        this.loadPage();
        console.log('tasks = ', tasks);
        this.isLoading = false;
      },
      (error: any) => {
        this.isLoading = false;
        console.error('Error isLoading tasks:', error);
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
    this.loadTasks();
  }

  openModal(task?: Task) {
    const modalRef = this.modalService.open(taskFormComponent, {
      size: 'md',
      centered: true,
    });
    if (task) {
      modalRef.componentInstance.task = task;
    }
    modalRef.result.then(() => {
      this.loadTasks();
    });
  }

  updateTaskStatus(task: Task, status: any): void {
    if (!task) {
      console.error('Task ID is undefined. Cannot update status.');
      return;
    }

    this.taskService.updateTaskStatus(task.id,status).subscribe(
      () => {
        this.loadTasks(); // Reload tasks to reflect the change
      },
      (error: any) => {
        console.error('Error updating task status:', error);
      }
    );
  }
}
