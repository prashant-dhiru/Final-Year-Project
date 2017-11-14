import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ADMIN_ROUTES } from './admin/admin-routing.module';
import { USER_ROUTES } from './user/user-routing.module';
import { EXAM_ROUTES } from './exam/exam-routing.module';

import { AboutComponent } from './about/about.component';
import { RouteNotFoundComponent } from './route-not-found/route-not-found.component';
import { ExamComponent } from './exam/exam.component';
import { AdminComponent } from './admin/admin.component';
import { UserComponent } from './user/user.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'user', component: UserComponent, children: USER_ROUTES },
  { path: 'exam', component: ExamComponent, children: EXAM_ROUTES },
  { path: 'admin', component: AdminComponent, children: ADMIN_ROUTES },
  { path: 'about', component: AboutComponent },
  { path: '**', component: RouteNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
