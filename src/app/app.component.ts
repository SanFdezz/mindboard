import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./shared/components/header/header.component";
import { NavComponent } from "./shared/components/nav/nav.component";
import { FooterComponent } from "./shared/components/footer/footer.component";
import { BoardComponent } from "./shared/components/board/board.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, NavComponent, FooterComponent, BoardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'mindboard';
}
