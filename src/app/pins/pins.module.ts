import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddPinComponent } from './add-pin/add-pin.component';
import { ListPinComponent } from './list-pin/list-pin.component';
import { PinsComponent } from './pins.component';

import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxSelectModule } from 'ngx-select-ex';
import { FileUploadModule } from 'ng2-file-upload';

const routes: Routes = [
  { 
    path: '', component: PinsComponent, 
    children: [
      { path: 'list' , component: ListPinComponent} 
    ]
  },
  
];


@NgModule({
  declarations: [
    AddPinComponent,
    ListPinComponent,
    PinsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    ReactiveFormsModule,
    NgxSelectModule,
    FileUploadModule
  ]
})
export class PinsModule { }
  