import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddPinComponent } from './add-pin/add-pin.component';
import { ListPinComponent } from './list-pin/list-pin.component';
import { PinsComponent } from './pins.component';

import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: ListPinComponent }
];


@NgModule({
  declarations: [
    AddPinComponent,
    ListPinComponent,
    PinsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class PinsModule { }
