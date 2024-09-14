import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuienSoyRoutingModule } from './quien-soy-routing.module';
import { QuienSoyComponent } from './quien-soy.component';
import { MatInputModule, MatLabel } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [
    QuienSoyComponent
  ],
  imports: [
    CommonModule,
    QuienSoyRoutingModule,
    MatInputModule,
    MatLabel,
    MatButtonModule
  ]
})
export class QuienSoyModule { }
