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
import { List } from '../../core/interfaces/content';
import { update } from 'firebase/database';

@Injectable({
  providedIn: 'root',
})
export class ListsService {
  auth = getAuth();
  currentUser = this.auth.currentUser;
  currentUid = this.currentUser!.uid;
  db = getDatabase();
  elements: WritableSignal<List[]> = signal([]);

  saveNewList(text: string[], color: string, board: string): void {
    const date = new Date().toString();
    const boardListsRef = ref(this.db, `boards/${board}/lists`);
    const newListRef = push(boardListsRef);
    const key = newListRef.key!;
    const element: List = {
      type: 'list',
      uid: this.currentUid,
      text: text,
      date: date,
      position: null,
      color: color,
      key: key,
    };

    set(newListRef, element);
    this.elements.update((_elements) => [..._elements, element]);
  }

  loadLists(board: string): void {
    let elementsQuery = query(
      ref(this.db, `boards/${board}/lists`),
      orderByChild('date')
    );

    get(elementsQuery).then((snapshot) => {
      if (snapshot.exists()) {
        const allElements: List[] = [];
        snapshot.forEach((childSnapshot) => {
          const element = childSnapshot.val();
          if (element.uid == this.currentUid) {
            element.key = childSnapshot.key;
            allElements.push(element);
          }
        });
        this.elements.set(allElements);
        return;
      }
      this.elements.set([]);
    });
  }

  editList(key: string, newText: string[], color: string, board: string): void {
    const updatedData = {
      text: newText,
      color: color,
      date: new Date().toString(),
    };

    const boardRef = ref(this.db, `boards/${board}/lists/${key}`);
    update(boardRef, updatedData);

    this.elements.update((lists) =>
      lists.map((l) => {
        if (l.key === key) {
          return {
            ...l,
            text: newText,
            color: color,
            date: new Date().toString(),
          };
        }
        return l;
      })
    );
  }

  deleteList(board: string, list: string): void {
    remove(ref(this.db, `boards/${board}/lists/${list}`));
  }
}
