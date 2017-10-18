import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ADMIN_ROUTES } from './admin/admin-routing.module';
import { USER_ROUTES } from './user/user-routing.module';

import { RouteNotFoundComponent } from './route-not-found/route-not-found.component';
import { ExamComponent } from './exam/exam.component';
import { AdminComponent } from './admin/admin.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  { path: '', children: [] },
  { path: 'user', component: UserComponent, children: USER_ROUTES },
  { path: 'exam', component: ExamComponent },
  { path: 'admin', component: AdminComponent, children: ADMIN_ROUTES },
  { path: '**', component: RouteNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
