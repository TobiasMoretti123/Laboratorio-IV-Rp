import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResultadosAhorcadoRoutingModule } from './resultados-ahorcado-routing.module';
import { ResultadosAhorcadoComponent } from './resultados-ahorcado.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [
    ResultadosAhorcadoComponent
  ],
  imports: [
    CommonModule,
    ResultadosAhorcadoRoutingModule,
    MatButtonModule,
    MatIconModule,
  ]
})
export class ResultadosAhorcadoModule { }
