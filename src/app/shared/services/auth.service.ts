import { inject, Injectable, signal } from '@angular/core';
import {
  Auth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
} from '@angular/fire/auth';
import { User } from 'firebase/auth';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  auth = inject(Auth);
  user = signal<User | null>(null);
  // esta línea es para poder registrar y/o iniciar sesión con un nuevo usuario gracias a una cuenta de google
  // cambiar lo de firebase
  login() {
    signInWithPopup(this.auth, new GoogleAuthProvider())
      .then((result) => {
        console.log('Usuario autenticado con Google:', result.user);
        window.location.reload();
      })
      .catch((error) => {
        console.error('Error al iniciar sesión con Google:', error);
      });
  }

  logout() {
    this.auth.signOut().then(() => window.location.reload());
  }

  constructor() {
    onAuthStateChanged(this.auth, (user) => {
      this.user.set(user);

      if (user !== null) {
        localStorage.setItem('username', user.displayName ?? '');
      } else {
        localStorage.removeItem('username');
      }
    });
  }

  getStoredUsername(): string | null {
    return localStorage.getItem('username');
  }
}
