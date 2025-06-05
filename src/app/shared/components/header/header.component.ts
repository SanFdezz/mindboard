import { Component } from '@angular/core';
import { AuthButtonsComponent } from "../auth-buttons/auth-buttons.component";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [AuthButtonsComponent,RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

}
