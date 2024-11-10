import { Component } from '@angular/core';
import { AppService } from './app.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'techup-lab-test';

  constructor(private appService: AppService,
    private router: Router,
  ) {}

  openDialog(){
    this.appService.onAddCustomerClicked(true)
    this.router.navigate(['/customers']);
  }

  openPinDialog(){
    this.appService.onAddPinClicked(true)
    this.router.navigate(['/pins']);
  }
}
