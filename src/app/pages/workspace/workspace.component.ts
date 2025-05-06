import { Component } from '@angular/core';
import { ModalComponent } from "../../shared/components/modal/modal.component";
import {CdkDrag} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-workspace',
  imports: [ModalComponent,CdkDrag],
  templateUrl: './workspace.component.html',
  styleUrl: './workspace.component.scss'
})
export class WorkspaceComponent {

  elements: { id: number; content: string }[] = [];
  counter = 0;
  showModal = false;

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  crearElemento(valor: string) {
    this.closeModal();
    this.elements.push({
      id: this.counter++,
      content: valor,
    });
  }



}
