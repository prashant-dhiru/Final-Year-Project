import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { Response } from '@angular/http';

import { ExamService } from '../../exam/exam.service';
import { Exam } from '../../Classes/exam';

@Component({
  selector: 'fyp-view-exam',
  templateUrl: './view-exam.component.html'
})
export class ViewExamComponent implements OnInit {

  examList: Exam[];
  subscription: Subscription;
  isexamFetchingFailure = -1;

  constructor(private examService: ExamService, private router: Router) { }

  ngOnInit() {
    if (!this.isAdminAuthenticated()) {
      return this.isexamFetchingFailure = 1;
    }
    this.subscription = this.examService.getExamList().subscribe((response: Response) => {
      this.examList = response.json();
      this.isexamFetchingFailure = 0;
    }, (error: any) => {
      if (error.status === 401) {
        this.isexamFetchingFailure = 1;
        // 401 unauthorised
      } else if (error.status === 501 || error.status === 500) {
        this.isexamFetchingFailure = 2;
        // 501 internal server eror unable to fetch user
      } else {
        this.isexamFetchingFailure = 3;
        // 404 no exam found
      }
    }, () => {
      this.subscription.unsubscribe();
    });
  }
 
  redirectToViewExam(examId: string) {
    this.router.navigate(['admin', 'exam', examId]);
  }

  redirectToInsertQuestion(examId: string) {
    this.router.navigate(['admin', 'exam', examId, 'insertque']);
  }

  isAdminAuthenticated () {
    if (window.sessionStorage.getItem('isAuthenticated')) {
      if (window.sessionStorage.getItem('userLevel') === '0') {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }


}