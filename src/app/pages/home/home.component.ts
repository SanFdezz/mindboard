import { Component, inject } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  authService = inject(AuthService);
  username = this.authService.getStoredUsername();
}
