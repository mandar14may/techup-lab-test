import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddCustomerComponent } from './add-customer/add-customer.component';
import { CustomersComponent } from './customers.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { DataService } from '../services/data.service';
import { HttpClientModule } from '@angular/common/http';
import { LocalStorageService } from '../services/local-storage.service';

const routes: Routes = [
  { path: '', component: CustomersComponent }
];

@NgModule({
  declarations: [
    AddCustomerComponent,
    CustomersComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    DataService,
    LocalStorageService
  ]
})
export class CustomersModule { }
