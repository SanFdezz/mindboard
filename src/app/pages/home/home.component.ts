import { Component, inject } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { RouterLink } from '@angular/router';
import { BoardsService } from '../../shared/services/boards.service';
import { Board } from '../../core/interfaces/board';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  authService = inject(AuthService);
  username = this.authService.getStoredUsername();
  boardService = inject(BoardsService);
  boards = this.boardService.boards;
  editingBoardID = '';
  boardTitle = '';
  active: 'create' | 'erase' | 'edit' | null = null;

  ngOnInit(): void {
    this.boardService.loadBoards();
  }

  createBoard(title: string) {
    this.boardService.saveNewBoard(title);
  }

  deleteBoard(board: string) {
    this.boardService.deleteBoard(board);
    this.boards.update((boards) =>
      boards.filter((content) => content.boardID !== board)
    );
  }

  startEditing(boardID: string, title: string) {
  this.editingBoardID = boardID;
  this.boardTitle = title;
}

  editBoard(board: string,title:string) {
    this.boardService.editBoard(board,title);
  }
}
