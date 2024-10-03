import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResultadosAhorcadoComponent } from './resultados-ahorcado.component';

const routes: Routes = [{ path: '', component: ResultadosAhorcadoComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResultadosAhorcadoRoutingModule { }
