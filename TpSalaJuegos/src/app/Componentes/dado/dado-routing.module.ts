import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DadoComponent } from './dado.component';

const routes: Routes = [{ path: '', component: DadoComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DadoRoutingModule { }
