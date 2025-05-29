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
import { Sticker } from '../../core/interfaces/content';

@Injectable({
  providedIn: 'root',
})
export class StickersService {
  auth = getAuth();
  currentUser = this.auth.currentUser;
  currentUid = this.currentUser!.uid;
  db = getDatabase();
  elements: WritableSignal<Sticker[]> = signal([]);

  saveNewSticker(url:string,name:string, board: string): void {
    const boardStickersRef = ref(this.db, `boards/${board}/stickers`);
    const newStickerRef = push(boardStickersRef);
    const key = newStickerRef.key!;
    const element: Sticker = {
      type: 'sticker',
      url:url,
      name:name,
      uid: this.currentUid,
      position: null,
      key: key,
    };

    set(newStickerRef, element);
    this.elements.update((_elements) => [..._elements, element]);
  }

  loadStickers(board: string): void {
    let elementsQuery = query(
      ref(this.db, `boards/${board}/stickers`),
      orderByChild('date')
    );

    get(elementsQuery).then((snapshot) => {
      if (snapshot.exists()) {
        const allElements: Sticker[] = [];
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

  deleteSticker(board: string, sticker: string): void {
    remove(ref(this.db, `boards/${board}/stickers/${sticker}`));
  }
}
