import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { User } from '../../core/models/user.model';
import { HeaderComponent } from '../../layout/header/header.component';
import { TabNavigationComponent, TabItem } from '../../layout/tab-navigation/tab-navigation.component';
import { UserStorageService } from '../../core/services/auth/user-storage.service';
import { EmptyStateComponent } from '../tasks/empty-state/empty-state.component';
import { TaskListComponent } from '../tasks/task-list/task-list.component';
import { UserListComponent } from '../users/user-list/user-list.component';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    HeaderComponent,
    EmptyStateComponent,
    TabNavigationComponent,
    TaskListComponent,
    UserListComponent
  ],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss'],
})
export class AdminDashboardComponent implements OnInit {


  currentUser:User = UserStorageService.getUser();

  activeTab = 'dashboard';

  dashboardStats = {
    totalTasks: 24,
    pendingTasks: 8,
    inProgressTasks: 12,
    completedTasks: 4,
  };

  tabs: TabItem[] = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: 'fas fa-chart-pie',
    },
    {
      id: 'my-tasks',
      label: 'My Tasks',
      icon: 'fas fa-tasks',
      count: 5,
    },
    {
      id: 'all-tasks',
      label: 'All Tasks',
      icon: 'fas fa-project-diagram',
      count: 24,
      adminOnly: true,
    },
    {
      id: 'users',
      label: 'Users',
      icon: 'fas fa-users',
      count: 12,
      adminOnly: true,
    },
  ];

  ngOnInit(): void {

  }

  onTabChange(tabId: string): void {
    this.activeTab = tabId;
  }
}
