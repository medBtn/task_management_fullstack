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
  // {
  //   path: 'signup',
  //   loadComponent: () => import('./components/auth/signup/signup.component').then(m => m.SignupComponent)
  // },

  // Admin routes
  {
    path: 'admin',
    canActivate: [adminGuard],
    children: [
      {
        path: '',
        loadComponent: () => import('./components/dashboard/admin-dashboard.component').then(m => m.AdminDashboardComponent)
      },
    ]
  },
  // User routes
  {
    path: 'user',
    canActivate: [userGuard],
    children: [
      {
        path: '',
        loadComponent: () => import('./components/dashboard/admin-dashboard.component').then(m => m.AdminDashboardComponent)
      },
    ]
  },


  // Fallback route
  {
    path: '**',
    redirectTo: 'login'
  }
];
