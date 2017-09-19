import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RouteNotFoundComponent } from './Components/route-not-found/route-not-found.component';

const routes: Routes = [
  { path: '', children: [] },
  { path: '**', component: RouteNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
