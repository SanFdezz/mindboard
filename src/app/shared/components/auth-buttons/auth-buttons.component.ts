import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'auth-buttons',
  templateUrl: './auth-buttons.component.html',
  styleUrls: ['./auth-buttons.component.scss'],
})
export class AuthButtonsComponent {
  auth = inject(AuthService);

  login() {
    this.auth.login();
  }

  logout() {
    this.auth.logout();
  }
}
