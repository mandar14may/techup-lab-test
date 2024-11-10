import { Component } from '@angular/core';
import { LocalStorageService } from '../../services/local-storage.service';
import { AppService } from '../../app.service';

@Component({
  selector: 'app-list-pin',
  templateUrl: './list-pin.component.html',
  styleUrl: './list-pin.component.scss'
})
export class ListPinComponent {
  pins: any[] = [];
  constructor(private localStorageService: LocalStorageService, private appService: AppService) {}
  ngOnInit(): void {
    // Fetch pins from localStorage
    this.loadPins();

    this.appService.pinListRefreshEvent$.subscribe(res=>{
      this.loadPins();
    })    
  }
  loadPins(): void {
    const storedPins = this.localStorageService.getPinList();  // Assuming 'getPins' fetches the pins from localStorage
    if (storedPins) {
      this.pins = storedPins;
    }
  }

}
