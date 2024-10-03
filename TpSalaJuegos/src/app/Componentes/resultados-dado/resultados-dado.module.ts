import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResultadosDadoRoutingModule } from './resultados-dado-routing.module';
import { ResultadosDadoComponent } from './resultados-dado.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [
    ResultadosDadoComponent
  ],
  imports: [
    CommonModule,
    ResultadosDadoRoutingModule,
    MatButtonModule,
    MatIconModule
  ]
})
export class ResultadosDadoModule { }
