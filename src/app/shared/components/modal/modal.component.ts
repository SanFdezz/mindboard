import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
})
export class ModalComponent {
  @Input() type!: string;
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<string[]>();

  onGuardar(text: string, color:string) {
    const data:string[] = [text,color];
    this.save.emit(data);
  }
}

