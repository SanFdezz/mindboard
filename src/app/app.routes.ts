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
      import('./pages/workspace/workspace.component').then(
        (m) => m.WorkspaceComponent
      ),
    ...canActivate(redirectUnauthorizedToStart),
  },
  {
    path: 'terms',
    loadComponent: () =>
      import('./pages/terms/terms.component').then((m) => m.TermsComponent),
  },
  {
    path: 'contact',
    loadComponent: () =>
      import('./pages/contact/contact.component').then((m) => m.ContactComponent),
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
