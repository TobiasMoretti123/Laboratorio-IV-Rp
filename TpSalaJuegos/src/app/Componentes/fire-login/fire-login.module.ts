import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FireLoginRoutingModule } from './fire-login-routing.module';
import { FireLoginComponent } from './fire-login.component';


@NgModule({
  declarations: [
    FireLoginComponent
  ],
  imports: [
    CommonModule,
    FireLoginRoutingModule
  ]
})
export class FireLoginModule { }
