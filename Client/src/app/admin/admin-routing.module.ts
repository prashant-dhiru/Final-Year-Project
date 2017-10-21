import { Routes } from '@angular/router';

import { ExamInputComponent } from './exam-input/exam-input.component';
import { ViewExamComponent } from './view-exam/view-exam.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminMeComponent } from './admin-me/admin-me.component';
import { QuestionInputComponent } from './question-input/question-input.component';

export const ADMIN_ROUTES: Routes = [
  { path: '', component: AdminLoginComponent },
  { path: 'me', component: AdminMeComponent },
  { path: 'create-exam', component: ExamInputComponent },
  { path: 'exam', component: ViewExamComponent },
  { path: 'exam/:id/insertque', component: ViewExamComponent },
  { path: 'exam/:id', component: ViewExamComponent }
];
