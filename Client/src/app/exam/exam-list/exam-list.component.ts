import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Rx';
import { Response } from '@angular/http';
import { Router } from '@angular/router';

import { ExamService } from '../exam.service';
import { Exam } from '../../Classes/exam';

@Component({
  selector: 'fyp-exam-list',
  templateUrl: './exam-list.component.html',
  styles: []
})
export class ExamListComponent implements OnInit {

  examList: Exam[];
  subscription: Subscription;
  isexamFetchingFailure = -1;

  constructor(private examService: ExamService, private router: Router) { }

  ngOnInit() {
    if (!this.isUserAuthenticated()) {
      return this.isexamFetchingFailure = 1;
    }
    this.subscription = this.examService.getExamList().subscribe((response: Response) => {
      this.examList = response.json();
      this.isexamFetchingFailure = 0;
    }, (error: any) => {
      if (error.status === 401) {
        this.isexamFetchingFailure = 1;
        // 401 unauthorised
      } else if (error.status === 501) {
        this.isexamFetchingFailure = 2;
        // 501 internal server eror unable to fetch user
      } else if (error.status === 500) {
        this.isexamFetchingFailure = 3;
        // 500  eror while fetching exam
      } else {
        this.isexamFetchingFailure = 4;
        // 404 no exam found
      }
    }, () => {
      this.subscription.unsubscribe();
    });
  }

  // 'name', 'description', 'allowedTime', 'subject', 'createdAt', '_id'

  redirecttoExam(examId: string) {
    this.router.navigate(['exam', examId]);
  }

  redirectToResult(examId: string) {
    this.router.navigate(['exam', 'result', examId]);
  }

  isUserAuthenticated () {
    if (window.sessionStorage.getItem('isAuthenticated')) {
      if (window.sessionStorage.getItem('userLevel') === '1') {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

}
