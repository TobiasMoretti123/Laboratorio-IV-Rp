import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MayorMenorRoutingModule } from './mayor-menor-routing.module';
import { MayorMenorComponent } from './mayor-menor.component';
import { HttpClientModule } from '@angular/common/http';
import { MayorMenorAPIService } from '../../Servicios/mayor-menor-api.service';
import { MatButtonModule } from '@angular/material/button';



@NgModule({
  declarations: [
    MayorMenorComponent
  ],
  imports: [
    CommonModule,
    MayorMenorRoutingModule,
    HttpClientModule,
    MatButtonModule
  ],
  providers:[
    MayorMenorAPIService
  ]
})
export class MayorMenorModule { }
