import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResultadosMayorMenorRoutingModule } from './resultados-mayor-menor-routing.module';
import { ResultadosMayorMenorComponent } from './resultados-mayor-menor.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [
    ResultadosMayorMenorComponent
  ],
  imports: [
    CommonModule,
    ResultadosMayorMenorRoutingModule,
    MatButtonModule,
    MatIconModule
  ]
})
export class ResultadosMayorMenorModule { }
