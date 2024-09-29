import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JuegosComponent } from './juegos.component';

const routes: Routes = [
  {
  path: '',
    children: [
      {
        path: 'ahorcado',
        loadChildren: () => import('./../ahorcado/ahorcado.module')
          .then(m => m.AhorcadoModule)
      },
      {
        path: 'preguntados',
        loadChildren: () => import('./../preguntados/preguntados.module')
          .then(m => m.PreguntadosModule)
      },
      {
        path: 'mayor-menor',
        loadChildren: () => import('./../mayor-menor/mayor-menor.module')
          .then(m => m.MayorMenorModule)
      },
      {
        path: 'dado',
        loadChildren: () => import('./../dado/dado.module')
          .then(m => m.DadoModule)
      },
      { path: '', redirectTo: 'juegos', pathMatch: 'full' } 
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JuegosRoutingModule { }
