import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  // Save customer data to local storage
  saveCustomer(data: any): void {
    const currentData = this.getCustomers();
    currentData.push(data);
    localStorage.setItem('customers', JSON.stringify(currentData));
  }

  savePin(data:any): void {
    const currentData = this.getPinList();
    currentData.push(data);
    localStorage.setItem('pin', JSON.stringify(currentData));
  }

  // Retrieve all customers from local storage
  getCustomers(): any[] {
    const data = localStorage.getItem('customers');
    return data ? JSON.parse(data) : [];
  }

  getPinList(): any[] {
    const data = localStorage.getItem('pin');
    return data ? JSON.parse(data) : [];
  }

}
