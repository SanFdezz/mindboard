import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
})
export class ModalComponent {
  @Output() cerrar = new EventEmitter<void>();
  @Output() guardar = new EventEmitter<string[]>();

  onGuardar(text: string, color:string) {
    const data:string[] = [text,color];
    this.guardar.emit(data);
  }
}

