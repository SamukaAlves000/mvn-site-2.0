import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home').then(m => m.Home)
  },
  {
    path: 'servicos',
    loadComponent: () => import('./pages/auxiliary').then(m => m.Services)
  },
  {
    path: 'sobre',
    loadComponent: () => import('./pages/auxiliary').then(m => m.About)
  },
  {
    path: 'diagnostico',
    loadComponent: () => import('./pages/diagnostic').then(m => m.Diagnostic)
  },
  {
    path: 'contato',
    loadComponent: () => import('./pages/auxiliary').then(m => m.Contact)
  },
  {
    path: 'admin',
    loadComponent: () => import('./pages/admin').then(m => m.Admin)
  }
];
