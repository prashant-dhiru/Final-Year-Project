import { Routes } from '@angular/router';

import { ExamComponent } from './exam.component';
import { ExamAttempComponent } from './exam-attemp/exam-attemp.component';
import { ExamQuickResultComponent } from './exam-attemp/exam-quick-result.component';
import { ExamResultComponent } from './exam-result/exam-result.component';
import { ExamListComponent } from './exam-list/exam-list.component';

export const EXAM_ROUTES: Routes = [
  { path: ':id', component: ExamAttempComponent },
  { path: 'submit/:id', component: ExamQuickResultComponent },
  { path: 'result/:id', component: ExamResultComponent },
  { path: '', component: ExamListComponent },
];
