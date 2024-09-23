import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{
  path: '', loadChildren: () => import('./Componentes/home/home.module')
    .then(m => m.HomeModule) }, 
  { path: 'Home', loadChildren: () => import('./Componentes/home/home.module')
  .then(m => m.HomeModule) }, 
  { path: 'Registrarse', loadChildren: () => import('./Componentes/registrarse/registrarse.module')
    .then(m => m.RegistrarseModule) }, 
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'QuienSoy', loadChildren: () => import('./Componentes/quien-soy/quien-soy.module')
    .then(m => m.QuienSoyModule) },
  { path: 'Juegos', loadChildren: () => import('./Componentes/juegos/juegos.module')
    .then(m => m.JuegosModule) },
  { path: 'Chat', loadChildren: () => import('./Componentes/chat/chat.module')
    .then(m => m.ChatModule) },
  { path: '**', loadChildren: () => import('./Componentes/error/error.module')
    .then(m => m.ErrorModule) },];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
