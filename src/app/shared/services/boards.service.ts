import { Injectable, signal, WritableSignal } from '@angular/core';
import { getAuth } from '@angular/fire/auth';
import {
  get,
  getDatabase,
  orderByChild,
  push,
  query,
  ref,
  remove,
  set,
} from '@angular/fire/database';
import { Board } from '../../core/interfaces/board';
import { update } from 'firebase/database';

@Injectable({
  providedIn: 'root',
})
export class BoardsService {
  auth = getAuth();
  currentUser = this.auth.currentUser;
  currentUid = this.currentUser!.uid;
  db = getDatabase();
  boardListRef = ref(this.db, 'boards');
  boards: WritableSignal<Board[]> = signal([]);

  saveNewBoard(title: string): void {
    const date = new Date().toString();
    const newBoardRef = push(this.boardListRef);
    const boardID = newBoardRef.key!;
    const board: Board = {
      uid: this.currentUid,
      boardID: boardID,
      title: title,
      date: date,
    };
    set(newBoardRef, board);
    this.boards.update((_boards) => [..._boards, board]);
  }

  loadBoards(): void {
    let elementsQuery = query(ref(this.db, 'boards'), orderByChild('date'));

    get(elementsQuery).then((snapshot) => {
      if (snapshot.exists()) {
        const allBoards: Board[] = [];
        snapshot.forEach((childSnapshot) => {
          const element = childSnapshot.val();
          if (element.uid == this.currentUid) {
            allBoards.push(element);
          }
        });

        this.boards.set(allBoards);
        return;
      }
      this.boards.set([]);
    });
  }

  editBoard(boardID: string, newTitle: string): void {
    const updatedData = {
      title: newTitle,
      date: new Date().toString(),
    };

    const boardRef = ref(this.db, `boards/${boardID}`);
    update(boardRef, updatedData);

    this.boards.update((boards) =>
      boards.map((b) => {
        if (b.boardID === boardID) {
          return { ...b, title: newTitle, date: new Date().toString() };
        }
        return b;
      })
    );
  }

  deleteBoard(board: string): void {
    remove(ref(this.db, `boards/${board}`));
  }
}
