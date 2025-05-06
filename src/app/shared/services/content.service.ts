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
  db = getDatabase();
  contentListRef = ref(this.db, 'messages');
  user = getAuth();
  elements: WritableSignal<Content[]> = signal([]);

  saveNewElement(text: string, color: string): void {
    const date = new Date().toString();
    const element: Content = {
      text: text,
      date: date,
      position: null,
      color: color,
    };

    const newContentRef = push(this.contentListRef);
    set(newContentRef, element);
    this.elements.update((_elements) => [..._elements, element]);
  }

  loadMessages(): void {
    let messagesQuery = query(ref(this.db, 'messages'), orderByChild('date'));

    get(messagesQuery).then((snapshot) => {
      if (snapshot.exists()) {
        const allElements: Content[] = [];
        snapshot.forEach((childSnapshot) => {
          const element = childSnapshot.val();
          allElements.push(element);
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
}
