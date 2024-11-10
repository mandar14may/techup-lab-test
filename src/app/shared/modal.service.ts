import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor() { }

  private modalVisibilitySource = new Subject<boolean>();
  modalVisibility$ = this.modalVisibilitySource.asObservable();

  openModal() {
    this.modalVisibilitySource.next(true);
  }

  closeModal() {
    this.modalVisibilitySource.next(false);
  }

}
