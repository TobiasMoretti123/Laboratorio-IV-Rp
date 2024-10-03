import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResultadosPreguntadosComponent } from './resultados-preguntados.component';

const routes: Routes = [{ path: '', component: ResultadosPreguntadosComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResultadosPreguntadosRoutingModule { }
