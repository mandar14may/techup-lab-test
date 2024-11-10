import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  private addCustomer = new BehaviorSubject<boolean>(false);
  addCustomerEvent$ = this.addCustomer.asObservable();

  private addPin = new BehaviorSubject<boolean>(false);
  addPinEvent$ = this.addPin.asObservable();

  private pinListRefresh = new Subject;
  pinListRefreshEvent$ = this.pinListRefresh.asObservable();

  constructor() { }

  onAddCustomerClicked(value: boolean){
    this.addCustomer.next(value);
  }

  onAddPinClicked(value: boolean){
    this.addPin.next(value);
  }

  onPinListrefresh(){
    this.pinListRefresh.next(true)
  }
}
