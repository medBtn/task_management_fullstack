import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-empty-state',
  imports: [],
  templateUrl: './empty-state.component.html',
  styleUrl: './empty-state.component.scss'
})
export class EmptyStateComponent {
  @Input() title = 'No items found';
  @Input() message = 'Get started by creating your first item';
  @Input() iconClass = 'fas fa-inbox';
  @Input() showAction = true;
  @Input() actionText = 'Create New';
  @Input() actionIcon = 'fas fa-plus';

  @Output() action = new EventEmitter<void>();
}
