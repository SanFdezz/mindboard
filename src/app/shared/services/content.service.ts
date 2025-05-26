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
import { Content } from '../../core/interfaces/content';

@Injectable({
  providedIn: 'root',
})
export class ContentService {
  auth = getAuth();
  currentUser = this.auth.currentUser;
  currentUid = this.currentUser!.uid;
  db = getDatabase();
  elements: WritableSignal<Content[]> = signal([]);

  saveNewElement(text: string, color: string, board: string): void {
    const date = new Date().toString();
    const boardPostitsRef = ref(this.db, `boards/${board}/postits`);
    const newContentRef = push(boardPostitsRef);
    const key = newContentRef.key!;
    const element: Content = {
      uid: this.currentUid,
      text: text,
      date: date,
      position: null,
      color: color,
      key: key,
    };

    set(newContentRef, element);
    this.elements.update((_elements) => [..._elements, element]);
  }

  loadContents(board: string): void {
    let elementsQuery = query(
      ref(this.db, `boards/${board}/postits`),
      orderByChild('date')
    );

    get(elementsQuery).then((snapshot) => {
      if (snapshot.exists()) {
        const allElements: Content[] = [];
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

  deleteMessages(): void {
    remove(ref(this.db, '/'))
      .then(() => console.log('eliminada'))
      .catch((error) => console.error(error));
  }

  deleteMessage(board: string, postit: string): void {
    remove(ref(this.db, `boards/${board}/postits/${postit}`));
  }
}
