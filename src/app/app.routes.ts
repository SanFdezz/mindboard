import {
  canActivate,
  redirectLoggedInTo,
  redirectUnauthorizedTo,
} from '@angular/fire/compat/auth-guard';
import { Routes } from '@angular/router';

// guards de firebase
const redirectUnauthorizedToStart = () => redirectUnauthorizedTo(['start']);
const redirectLoggedToHome = () => redirectLoggedInTo(['home']);

export const routes: Routes = [
  {
    path: 'start',
    loadComponent: () =>
      import('./pages/start/start.component').then((m) => m.StartComponent),
    ...canActivate(redirectLoggedToHome),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./pages/home/home.component').then((m) => m.HomeComponent),
    ...canActivate(redirectUnauthorizedToStart),
  },
  {
    path: 'board',
    loadComponent: () =>
      import('./pages/board/board.component').then((m) => m.BoardComponent),
  },
  {
    path: '**',
    redirectTo: 'start',
  },
];
