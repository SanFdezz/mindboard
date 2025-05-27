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
  // postitService = inject(PostitService);
  counter = 0;
  showModal:string|null = null;
  elements = this.postitService.elements;
  route = inject(ActivatedRoute);
  boardID = this.route.snapshot.paramMap.get('id')!;

  openModal(type:string) {
    this.showModal = type;
  }

  closeModal() {
    this.showModal = null;
  }

  createElement(data: string[], type: string) {
    this.closeModal();
    switch (type) {
      case 'postit':
        this.postitService.saveNewPostit(data[0], data[1], this.boardID);
        break;
      case 'list':
        // this.listService.saveNewList(data[0], data[1], this.boardID);
        break;
      case 'calendar':
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
      case 'calendar':
        this.postitService.deletePostit(this.boardID, key);
        break;
    }
    this.elements.update((elements) => elements.filter((content) => content.key !== key));
  }
}
