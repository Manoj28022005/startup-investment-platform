import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./components/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'register',
    loadComponent: () => import('./components/register/register.component').then(m => m.RegisterComponent)
  },
  {
    path: 'investor-dashboard',
    canActivate: [AuthGuard],
    loadComponent: () => import('./components/investor-dashboard/investor-dashboard.component').then(m => m.InvestorDashboardComponent)
  },
  {
    path: 'founder-dashboard',
    canActivate: [AuthGuard],
    loadComponent: () => import('./components/founder-dashboard/founder-dashboard.component').then(m => m.FounderDashboardComponent)
  },
  {
    path: 'startup-profile',
    canActivate: [AuthGuard],
    loadComponent: () => import('./components/startup-profile/startup-profile.component').then(m => m.StartupProfileComponent)
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  }
];
