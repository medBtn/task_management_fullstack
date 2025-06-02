import { Routes } from '@angular/router';
import { adminGuard } from './core/guards/admin.guard';
import { userGuard } from './core/guards/user.guard';

export const routes: Routes = [
  // Public routes
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadComponent: () => import('./components/auth/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'signup',
    loadComponent: () => import('./components/auth/signup/signup.component').then(m => m.SignupComponent)
  },

  // Admin routes
  {
    path: 'admin',
    canActivate: [adminGuard],
    children: [
      {
        path: '',
        loadComponent: () => import('./components/admin/dashboard/admin-dashboard.component').then(m => m.AdminDashboardComponent)
      },
      {
        path: 'tasks/new',
        loadComponent: () => import('./components/admin/tasks/task-form/task-form.component').then(m => m.TaskFormComponent)
      },
      {
        path: 'tasks/edit/:id',
        loadComponent: () => import('./components/admin/tasks/task-form/task-form.component').then(m => m.TaskFormComponent)
      },
      {
        path: 'users/new',
        loadComponent: () => import('./components/admin/users/user-form/user-form.component').then(m => m.UserFormComponent)
      },
      {
        path: 'users/edit/:id',
        loadComponent: () => import('./components/admin/users/user-form/user-form.component').then(m => m.UserFormComponent)
      }
    ]
  },

  // User routes
  {
    path: 'user',
    canActivate: [userGuard],
    children: [
      {
        path: '',
        loadComponent: () => import('./components/user/dashboard/user-dashboard.component').then(m => m.UserDashboardComponent)
      }
    ]
  },

  // Fallback route
  {
    path: '**',
    redirectTo: 'login'
  }
];
