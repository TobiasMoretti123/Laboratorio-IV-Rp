import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { LoginComponent } from '../login/login.component';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatInputModule, MatLabel } from '@angular/material/input';
import { JuegosComponent } from '../juegos/juegos.component';
import { RegistrarseComponent } from '../registrarse/registrarse.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@NgModule({
  declarations: [
    HomeComponent,
    LoginComponent,
    JuegosComponent,
    RegistrarseComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MatButtonModule,
    FormsModule,
    MatInputModule,
    MatLabel,
    MatProgressSpinnerModule
  ]
})
export class HomeModule { }
