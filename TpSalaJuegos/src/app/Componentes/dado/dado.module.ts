import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DadoRoutingModule } from './dado-routing.module';
import { DadoComponent } from './dado.component';
import { HttpClientModule } from '@angular/common/http';
import { DadosService } from '../../Servicios/dados.service';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    DadoComponent
  ],
  imports: [
    CommonModule,
    DadoRoutingModule,
    HttpClientModule,
    MatButtonModule,
    FormsModule
  ],
  providers:[ DadosService]
})
export class DadoModule { }
