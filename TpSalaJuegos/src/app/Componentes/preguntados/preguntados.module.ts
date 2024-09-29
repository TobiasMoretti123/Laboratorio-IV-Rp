import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PreguntadosRoutingModule } from './preguntados-routing.module';
import { PreguntadosComponent } from './preguntados.component';
import { HttpClientModule } from '@angular/common/http';
import { PaisesService } from '../../Servicios/paises.service';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [
    PreguntadosComponent
  ],
  imports: [
    CommonModule,
    PreguntadosRoutingModule,
    HttpClientModule,
    MatButtonModule
  ],
  providers:[PaisesService]
})
export class PreguntadosModule { }
