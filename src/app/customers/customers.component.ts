import { Component } from '@angular/core';
import { AppService } from '../app.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.scss'
})
export class CustomersComponent {
  isCustomerModal = false;

  private eventSubscription: Subscription | undefined;

  constructor( private appService: AppService ,
    private router: Router,
  ){}

  ngOnInit() {
    this.eventSubscription = this.appService.addCustomerEvent$.subscribe(data => {
      this.isCustomerModal = data;
    });
  }

  openModal() {
      this.isCustomerModal = true;
  }

  closeModal() {
    this.isCustomerModal = false; 
    this.appService.onAddCustomerClicked(false)
    this.appService.onAddPinClicked(false)
    this.router.navigate(['/pins']);
  }
}
