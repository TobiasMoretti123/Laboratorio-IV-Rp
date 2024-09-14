import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FireLoginComponent } from './fire-login.component';

const routes: Routes = [{ path: '', component: FireLoginComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FireLoginRoutingModule { }
