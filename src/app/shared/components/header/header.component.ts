import { Component } from '@angular/core';
import { AuthButtonsComponent } from "../auth-buttons/auth-buttons.component";

@Component({
  selector: 'app-header',
  imports: [AuthButtonsComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

}
