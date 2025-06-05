import {
  canActivate,
  redirectLoggedInTo,
  redirectUnauthorizedTo,
} from '@angular/fire/auth-guard';
import { Routes } from '@angular/router';

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
    path: 'home',
    loadComponent: () =>
      import('./pages/home/home.component').then((m) => m.HomeComponent),
    ...canActivate(redirectUnauthorizedToStart),
  },
  {
    path: 'workspace/:id',
    loadComponent: () =>
      import('./pages/workspace/workspace.component').then((m) => m.WorkspaceComponent),
    ...canActivate(redirectUnauthorizedToStart)
  },
  {
    path: '',
    redirectTo: 'start',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'start',
  },
];
