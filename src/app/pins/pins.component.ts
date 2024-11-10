import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { AppService } from '../app.service';

@Component({
  selector: 'app-pins',
  templateUrl: './pins.component.html',
  styleUrl: './pins.component.scss'
})
export class PinsComponent {
  isPinModal = false;

  private eventSubscription: Subscription | undefined;

  constructor( private appService: AppService ){}

  ngOnInit() {
    this.eventSubscription = this.appService.addPinEvent$.subscribe(data => {
      this.isPinModal = data;
    });
  }

  openModal() {
      this.isPinModal = true;
  }

  closeModal() {
    this.isPinModal = false; 
    this.appService.onPinListrefresh()
  }
}
