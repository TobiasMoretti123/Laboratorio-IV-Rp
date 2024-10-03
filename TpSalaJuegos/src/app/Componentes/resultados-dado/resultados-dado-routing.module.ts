import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResultadosDadoComponent } from './resultados-dado.component';

const routes: Routes = [{ path: '', component: ResultadosDadoComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResultadosDadoRoutingModule { }
