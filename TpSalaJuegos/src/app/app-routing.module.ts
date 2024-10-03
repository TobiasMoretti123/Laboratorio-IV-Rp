import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './Guards/auth.guard';

const routes: Routes = [{
  path: '', loadChildren: () => import('./Componentes/home/home.module')
    .then(m => m.HomeModule) }, 
  { path: 'Home', loadChildren: () => import('./Componentes/home/home.module')
  .then(m => m.HomeModule) }, 
  { path: 'Registrarse', loadChildren: () => import('./Componentes/registrarse/registrarse.module')
    .then(m => m.RegistrarseModule) }, 
  { path: '', redirectTo: 'Home', pathMatch: 'full' },
  { path: 'QuienSoy', loadChildren: () => import('./Componentes/quien-soy/quien-soy.module')
    .then(m => m.QuienSoyModule), canActivate: [AuthGuard] },
  { 
    path: 'Juegos', 
    loadChildren: () => import('./Componentes/juegos/juegos.module').then(m => m.JuegosModule),
    pathMatch: 'prefix', 
  },
  { path: 'Chat', loadChildren: () => import('./Componentes/chat/chat.module')
    .then(m => m.ChatModule), canActivate: [AuthGuard]},
  { 
    path: 'Resultados', loadChildren: () => import('./Componentes/resultados/resultados.module')
    .then(m => m.ResultadosModule),
    pathMatch: 'prefix', 
  },
  { path: 'Encuesta', loadChildren: () => import('./Componentes/encuesta/encuesta.module')
    .then(m => m.EncuestaModule),canActivate: [AuthGuard] },
  { path: '**', loadChildren: () => import('./Componentes/error/error.module')
    .then(m => m.ErrorModule) },];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
