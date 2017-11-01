import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Rx';
import { Response } from '@angular/http';
import { Router } from '@angular/router';

import { ExamService } from '../exam.service';
import { Exam } from '../../Classes/exam';
import { IsAuthenticatedService } from '../../Shared/is-authenticated.service';

@Component({
  selector: 'fyp-exam-list',
  templateUrl: './exam-list.component.html',
  styles: []
})
export class ExamListComponent implements OnInit {

  examList: Exam[];
  subscription: Subscription;
  isexamFetchingFailure = -1;

  constructor(private examService: ExamService, private router: Router, private isAuthenticatedService: IsAuthenticatedService) { }

  ngOnInit() {
    if (!this.isAuthenticatedService.isUserAuthenticated()) {
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

  // 'name', 'description', 'allowedTime', 'subject', 'createdAt', '_id'

  redirecttoExam(examId: string) {

    const elem = document.documentElement; // Make the body go full screen.
    this.requestFullScreen(elem);

    this.router.navigate(['exam', examId]);
  }

  redirectToResult(examId: string) {
    this.router.navigate(['exam', 'result', examId]);
  }

  requestFullScreen (element: any) {

    // Supports most browsers and their versions.
    if (element.requestFullScreen) {
      element.requestFullScreen();
    } else if (element.webkitRequestFullScreen) {
      element.webkitRequestFullScreen();
    } else if (element.mozRequestFullScreen) {
      element.mozRequestFullScreen();
    } else if (element.msRequestFullScreen) {
      element.msRequestFullScreen();
    }
  }




}
