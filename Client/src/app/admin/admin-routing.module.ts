import { Routes } from '@angular/router';

import { ExamInputComponent } from './exam-input/exam-input.component';
import { ViewExamComponent } from './view-exam/view-exam.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';

export const ADMIN_ROUTES: Routes = [
  { path: '', component: AdminLoginComponent },
  { path: 'create-exam', component: ExamInputComponent },
  { path: 'exam/:id/insertque', component: ExamInputComponent },
  { path: 'exam/:id', component: ViewExamComponent }
];
