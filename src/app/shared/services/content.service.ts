import { inject, Injectable, signal, WritableSignal } from '@angular/core';
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
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class ContentService {
  auth = getAuth();
  currentUser = this.auth.currentUser;
  currentUid = this.currentUser!.uid;
  db = getDatabase();
  contentListRef = ref(this.db, 'postits');
  elements: WritableSignal<Content[]> = signal([]);

  saveNewElement(text: string, color: string): void {
    const date = new Date().toString();
    const element: Content = {
      uid:this.currentUid,
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
    let elementsQuery = query(ref(this.db, 'postits'), orderByChild('date'));

    get(elementsQuery).then((snapshot) => {
      if (snapshot.exists()) {
        const allElements: Content[] = [];
        snapshot.forEach((childSnapshot) => {
          const element = childSnapshot.val();
          if (element.uid == this.currentUid) {
            allElements.push(element);
            console.log('elemento cargado')
          }
        });

        this.elements.set(allElements);
        console.log('Listo!')
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
