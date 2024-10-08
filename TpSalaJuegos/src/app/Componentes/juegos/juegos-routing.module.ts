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
    loadChildren: () => import('./../ahorcado/ahorcado.module').then(m => m.AhorcadoModule)
    , canActivate: [AuthGuard]
  },
  {
    path: 'preguntados',
    loadChildren: () => import('./../preguntados/preguntados.module').then(m => m.PreguntadosModule)
    , canActivate: [AuthGuard]
  },
  {
    path: 'mayor-menor',
    loadChildren: () => import('./../mayor-menor/mayor-menor.module').then(m => m.MayorMenorModule)
    , canActivate: [AuthGuard]
  },
  {
    path: 'dado',
    loadChildren: () => import('./../dado/dado.module').then(m => m.DadoModule)
    , canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JuegosRoutingModule { }
