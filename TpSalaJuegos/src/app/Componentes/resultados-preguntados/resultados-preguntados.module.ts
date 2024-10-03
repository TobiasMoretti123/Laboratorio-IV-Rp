import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResultadosPreguntadosRoutingModule } from './resultados-preguntados-routing.module';
import { ResultadosPreguntadosComponent } from './resultados-preguntados.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [
    ResultadosPreguntadosComponent
  ],
  imports: [
    CommonModule,
    ResultadosPreguntadosRoutingModule,
    MatButtonModule,
    MatIconModule
  ]
})
export class ResultadosPreguntadosModule { }
