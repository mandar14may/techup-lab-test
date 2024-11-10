import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent {
  @Input() title: string = 'Default Title';
  @Input() isVisible: boolean = false;
  @Output() closeModal: EventEmitter<boolean> = new EventEmitter();

  close() {
    this.isVisible = false;
    this.closeModal.emit(this.isVisible);
  }
}
