import { Routes } from '@angular/router';

import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminMeComponent } from './admin-me/admin-me.component';
import { DisplayExamComponent } from './view-exam/display-exam.component';
import { ExamInputComponent } from './exam-input/exam-input.component';
import { QuestionInputComponent } from './question-input/question-input.component';
import { ViewExamComponent } from './view-exam/view-exam.component';

export const ADMIN_ROUTES: Routes = [
  { path: '', component: AdminMeComponent },
  { path: 'login', component: AdminLoginComponent },
  { path: 'create-exam', component: ExamInputComponent },
  { path: 'exam', component: ViewExamComponent },
  { path: 'exam/:id/insertque', component: QuestionInputComponent },
  { path: 'exam/:id', component: DisplayExamComponent }
];
