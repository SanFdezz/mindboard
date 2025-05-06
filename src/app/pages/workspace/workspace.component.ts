import { Component, inject, OnInit } from '@angular/core';
import { ModalComponent } from "../../shared/components/modal/modal.component";
import {CdkDrag} from '@angular/cdk/drag-drop';
import { ContentService } from '../../shared/services/content.service';

@Component({
  selector: 'app-workspace',
  imports: [ModalComponent,CdkDrag],
  templateUrl: './workspace.component.html',
  styleUrl: './workspace.component.scss'
})
export class WorkspaceComponent implements OnInit {

  contentService = inject(ContentService);
  counter = 0;
  showModal = false;
  elements = this.contentService.elements;

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  createElement(text: string) {
    this.closeModal();
    this.contentService.saveNewElement(text,'pink')
  }

  ngOnInit(): void {
    this.contentService.loadMessages();
  }

}



