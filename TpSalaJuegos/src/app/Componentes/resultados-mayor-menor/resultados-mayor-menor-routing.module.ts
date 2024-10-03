import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResultadosMayorMenorComponent } from './resultados-mayor-menor.component';

const routes: Routes = [{ path: '', component: ResultadosMayorMenorComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResultadosMayorMenorRoutingModule { }
