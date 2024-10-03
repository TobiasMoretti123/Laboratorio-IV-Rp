import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../Guards/auth.guard';

const routes: Routes = [
  {
    path: '', 
    redirectTo: 'Home', 
    pathMatch: 'full'
  },
  {
    path: 'Home', loadChildren: () => import('./../home/home.module')
    .then(m => m.HomeModule), canActivate: [AuthGuard]
  },
  {
    path: 'ahorcado',
    loadChildren: () => import('./../resultados-ahorcado/resultados-ahorcado.module').then(m => m.ResultadosAhorcadoModule)
    , canActivate: [AuthGuard]
  },
  {
    path: 'preguntados',
    loadChildren: () => import('./../resultados-preguntados/resultados-preguntados.module').then(m => m.ResultadosPreguntadosModule)
    , canActivate: [AuthGuard]
  },
  {
    path: 'mayor-menor',
    loadChildren: () => import('./../resultados-mayor-menor/resultados-mayor-menor.module').then(m => m.ResultadosMayorMenorModule)
    , canActivate: [AuthGuard]
  },
  {
    path: 'dado',
    loadChildren: () => import('./../resultados-dado/resultados-dado.module').then(m => m.ResultadosDadoModule)
    , canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResultadosRoutingModule { }
