import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EncuestaRoutingModule } from './encuesta-routing.module';
import { EncuestaComponent } from './encuesta.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';


@NgModule({
  declarations: [
    EncuestaComponent
  ],
  imports: [
    EncuestaRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatRadioModule,
    MatCheckboxModule,
    MatCardModule
  ]
})
export class EncuestaModule { }
