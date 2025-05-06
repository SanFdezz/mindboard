import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal.component.html',
})
export class ModalComponent {
  @Output() cerrar = new EventEmitter<void>();
  @Output() guardar = new EventEmitter<string>();

  onGuardar(valor: string) {
    this.guardar.emit(valor);
  }
}

