import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbPagination, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PAGIGNATION } from '../../../core/models/pagignation';
import { Task } from '../../../core/models/task.model';
import { TaskService } from '../../../core/services/task.service';
import { taskFormComponent } from '../task-from/task-form.component';
import { TaskStatusBadgeComponent } from '../task-status-badge/task-status-badge.component';
import { confirmDelete, errorAlert, successAlert } from '../../../core/models/sweet-alert.model';

@Component({
  selector: 'app-task-list',
  imports: [
    CommonModule,
    RouterModule,
    NgbPagination,
    FormsModule,
    TaskStatusBadgeComponent,
  ],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss',
})
export class TaskListComponent {
  state = { ...PAGIGNATION };

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
    this.taskService.searchTasks(this.state).subscribe(
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
  deleteTask(task: Task) {
    confirmDelete(task.title).then(confirmed=>{
      if(confirmed){
        this.taskService.deleteTask(task.id).subscribe({
          next: (res) => {
            successAlert('Success', 'Delete successfull');
            this.loadTasks()
          },
          error: (err) => {
            errorAlert('Error', err);
          },
        });
      }
    })
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
}
