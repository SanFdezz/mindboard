import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Color } from '../../../core/interfaces/palette';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
})
export class ModalComponent {
  @Input() type!: string;
  @Input() colors: Color[] = [];
  @Output() colorSeleccionado = new EventEmitter<Color>();
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<string[]>();

  stickers: { name: string; url: string }[] = [
    { name: 'smile', url: '/assets/images/smiling.png' },
    { name: 'cry', url: '/assets/images/crying.png' },
    { name: 'angry', url: '/assets/images/angry.png' },
    { name: 'like', url: '/assets/images/like.png' },
    { name: 'dislike', url: '/assets/images/dislike.png' },
    { name: 'heart', url: '/assets/images/heart.png' },
    { name: 'question mark', url: '/assets/images/interrogacion.png' },
    { name: 'admiration mark', url: '/assets/images/exclamacion.png' },
    { name: 'star', url: '/assets/images/star.png' },
    { name: 'highlight', url: '/assets/images/hightlights.png' },
  ];

  onGuardar(var1: string, var2: string) {
    const data: string[] = [var1, var2];
    this.save.emit(data);
  }
}
