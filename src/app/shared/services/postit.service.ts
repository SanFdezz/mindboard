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
import { Postit } from '../../core/interfaces/content';

@Injectable({
  providedIn: 'root',
})
export class PostitService {
  auth = getAuth();
  currentUser = this.auth.currentUser;
  currentUid = this.currentUser!.uid;
  db = getDatabase();
  elements: WritableSignal<Postit[]> = signal([]);

  saveNewPostit(text: string, color: string, board: string): void {
    const date = new Date().toString();
    const boardPostitsRef = ref(this.db, `boards/${board}/postits`);
    const newPostitRef = push(boardPostitsRef);
    const key = newPostitRef.key!;
    const element: Postit = {
      type:'postit',
      uid: this.currentUid,
      text: text,
      date: date,
      position: null,
      color: color,
      key: key,
    };

    set(newPostitRef, element);
    this.elements.update((_elements) => [..._elements, element]);
  }

  loadPostits(board: string): void {
    let elementsQuery = query(
      ref(this.db, `boards/${board}/postits`),
      orderByChild('date')
    );

    get(elementsQuery).then((snapshot) => {
      if (snapshot.exists()) {
        const allElements: Postit[] = [];
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

  deletePostit(board: string, postit: string): void {
    remove(ref(this.db, `boards/${board}/postits/${postit}`));
  }
}
