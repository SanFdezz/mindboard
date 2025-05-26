import { Component, inject, OnInit } from '@angular/core';
import { ModalComponent } from '../../shared/components/modal/modal.component';
import { CdkDrag } from '@angular/cdk/drag-drop';
import { ContentService } from '../../shared/services/content.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CalendarComponent } from '../../shared/components/calendar/calendar.component';
import { ButtonModule } from '@coreui/angular';

@Component({
  selector: 'app-workspace',
  imports: [
    ModalComponent,
    CdkDrag,
    RouterLink,
    CalendarComponent,
    ButtonModule,
  ],
  templateUrl: './workspace.component.html',
  styleUrl: './workspace.component.scss',
})
export class WorkspaceComponent implements OnInit {
  contentService = inject(ContentService);
  counter = 0;
  showModal = false;
  elements = this.contentService.elements;
  route = inject(ActivatedRoute);
  boardID = this.route.snapshot.paramMap.get('id')!;

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  createElement(data: string[]) {
    this.closeModal();
    this.contentService.saveNewElement(data[0], data[1], this.boardID);
  }

  ngOnInit(): void {
    this.contentService.loadContents(this.boardID);
  }

  delete(key: string): void {
    this.contentService.deleteMessage(this.boardID, key);
    this.elements.update((elements) => elements.filter((el) => el.key !== key));
  }
}
