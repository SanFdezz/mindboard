import { Component, inject, OnInit } from '@angular/core';
import { CdkDrag } from '@angular/cdk/drag-drop';
import { PostitService } from '../../shared/services/postit.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CalendarComponent } from '../../shared/components/calendar/calendar.component';
import { ButtonModule } from '@coreui/angular';
import {
  ButtonCloseDirective,
  ButtonDirective,
  OffcanvasBodyComponent,
  OffcanvasComponent,
  OffcanvasHeaderComponent,
  OffcanvasTitleDirective,
  OffcanvasToggleDirective,
} from '@coreui/angular';
import { ModalComponent } from '../../shared/components/modal/modal.component';
import { ListsService } from '../../shared/services/lists.service';
import { StickersService } from '../../shared/services/stickers.service';

@Component({
  selector: 'app-workspace',
  imports: [
    CdkDrag,
    RouterLink,
    CalendarComponent,
    ButtonModule,
    ButtonDirective,
    OffcanvasToggleDirective,
    OffcanvasComponent,
    OffcanvasHeaderComponent,
    OffcanvasTitleDirective,
    ButtonCloseDirective,
    OffcanvasBodyComponent,
    ModalComponent,
  ],
  templateUrl: './workspace.component.html',
  styleUrl: './workspace.component.scss',
})
export class WorkspaceComponent implements OnInit {
  postitService = inject(PostitService);
  listService = inject(ListsService);
  stickerService = inject(StickersService);
  counter = 0;
  showModal: string | null = null;
  postits = this.postitService.elements;
  lists = this.listService.elements;
  stickers = this.stickerService.elements;
  route = inject(ActivatedRoute);
  boardID = this.route.snapshot.paramMap.get('id')!;

  deleteMode:boolean = false;

  openModal(type: string) {
    this.showModal = type;
  }

  closeModal() {
    this.showModal = null;
  }

  createElement(data: string[], type: string) {
    const textList = data[0].split('\n').filter((line) => line.trim() !== '');
    this.closeModal();
    switch (type) {
      case 'postit':
        this.postitService.saveNewPostit(data[0], data[1], this.boardID);
        break;
      case 'list':
        this.listService.saveNewList(textList, data[1], this.boardID);
        break;
      case 'sticker':
        this.stickerService.saveNewSticker(data[0], data[1], this.boardID);
        break;
    }
  }

  ngOnInit(): void {
    this.postitService.loadPostits(this.boardID);
    this.listService.loadLists(this.boardID);
  }

  delete(key: string, type: string): void {
    switch (type) {
      case 'postit':
        this.postitService.deletePostit(this.boardID, key);
        break;
      case 'list':
        this.listService.deleteList(this.boardID, key);
        break;
      case 'sticker':
        this.stickerService.deleteSticker(this.boardID, key);
        break;
    }
    this.postits.update((elements) =>
      elements.filter((content) => content.key !== key)
    );
    this.lists.update((elements) =>
      elements.filter((content) => content.key !== key)
    );
    this.stickers.update((elements) =>
      elements.filter((content) => content.key !== key)
    );
  }
}
