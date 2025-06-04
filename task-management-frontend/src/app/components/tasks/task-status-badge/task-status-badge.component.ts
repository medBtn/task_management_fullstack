import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-task-status-badge',
  imports: [CommonModule],
  templateUrl: './task-status-badge.component.html',
  styleUrl: './task-status-badge.component.scss',
})
export class TaskStatusBadgeComponent {
  @Input() status: 'TODO' | 'IN_PROGRESS' | 'COMPLETED' = 'TODO';

  getBadgeClass(): string {
    switch (this.status) {
      case 'TODO':
        return 'bg-light text-teal-dark border-teal-light';
      case 'IN_PROGRESS':
        return 'bg-teal-light text-white';
      case 'COMPLETED':
        return 'bg-success text-white';
      default:
        return 'bg-secondary text-white';
    }
  }

  getIconClass(): string {
    switch (this.status) {
      case 'TODO':
        return 'fas fa-clock';
      case 'IN_PROGRESS':
        return 'fas fa-spinner fa-spin';
      case 'COMPLETED':
        return 'fas fa-check-circle';
      default:
        return 'fas fa-question-circle';
    }
  }

  getStatusLabel(): string {
    switch (this.status) {
      case 'TODO':
        return 'To Do';
      case 'IN_PROGRESS':
        return 'In Progress';
      case 'COMPLETED':
        return 'Completed';
      default:
        return 'Unknown';
    }
  }
}
