import { Routes } from '@angular/router';
import { LoginComponent } from '@pages/login/login.component';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('@pages/login/login.component').then(m => m.LoginComponent),
    title: 'Login'
  },
  {
    path: 'login',
    loadComponent: () => import('@pages/login/login.component').then(m => m.LoginComponent),
    title: 'Login'
  },
  {
    path: 'register',
    loadComponent: () => import('@pages/register/register.component').then(m => m.RegisterComponent),
    title: 'Register'
  },
  {
    path: 'home',
    loadComponent: () => import('@pages/home/home.component').then(m => m.HomeComponent),
    title: 'Home'
  },
];
