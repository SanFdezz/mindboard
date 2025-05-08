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

@Injectable({
  providedIn: 'root'
})
export class BoardsService {
  auth = getAuth();
  currentUser = this.auth.currentUser;
  currentUid = this.currentUser!.uid;
  db = getDatabase();
  boardListRef = ref(this.db, 'tableros');
  boards: WritableSignal<Board[]> = signal([]);

  saveNewBoard(title: string): void {
    const date = new Date().toString();
    const newBoardRef = push(this.boardListRef);
    const boardID = newBoardRef.key!;
    const board: Board = {
      uid:this.currentUid,
      boardID:boardID,
      title:title,
      date: date,
    };
    set(newBoardRef, board);
    this.boards.update((_boards) => [..._boards, board]);
  }

  loadBoards(): void {
    let elementsQuery = query(ref(this.db, 'tableros'), orderByChild('date'));

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

}
