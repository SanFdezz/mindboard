import { Component } from '@angular/core';
import { BoardComponent } from "../../shared/components/board/board.component";

@Component({
  selector: 'app-workspace',
  imports: [BoardComponent],
  templateUrl: './workspace.component.html',
  styleUrl: './workspace.component.scss'
})
export class WorkspaceComponent {

}
