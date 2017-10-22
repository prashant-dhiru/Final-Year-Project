import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Rx';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { AdminService } from '../../admin.service';
import { Exam } from '../../../Classes/exam';

@Component({
  selector: 'fyp-display-exam',
  templateUrl: './display-exam.component.html',
  styleUrls: ['./display-exam.component.css']
})
export class DisplayExamComponent implements OnInit {

  id = '0';
  subscription: Subscription;
  submissionError = -1;

  /* exam = {
    name: 'Exam 1',
    description: 'this is the exam escription',
    allowedTime: 180,
    subject: 'Computer System Architecture',
    questions: [
      {
        body: 'question body',
        answerOptionOne: 'option 1',
        answerOptionTwo: 'option 2',
        answerOptionThree: 'option 3',
        answerOptionFour: 'option 4',
        correctAnswer: 'option 1',
        marksForCorrectAnswer: 4,
        negativeMark: 1,
        difficulty: '3'
      }, {
        body: 'question body',
        answerOptionOne: 'option 1',
        answerOptionTwo: 'option 2',
        answerOptionThree: 'option 3',
        answerOptionFour: 'option 4',
        correctAnswer: 'option 1',
        marksForCorrectAnswer: 4,
        negativeMark: 1,
        difficulty: '3'
      }, {
        body: 'question body',
        answerOptionOne: 'option 1',
        answerOptionTwo: 'option 2',
        answerOptionThree: 'option 3',
        answerOptionFour: 'option 4',
        correctAnswer: 'option 1',
        marksForCorrectAnswer: 4,
        negativeMark: 1,
        difficulty: '3'
      }, {
        body: 'question body',
        answerOptionOne: 'option 1',
        answerOptionTwo: 'option 2',
        answerOptionThree: 'option 3',
        answerOptionFour: 'option 4',
        correctAnswer: 'option 1',
        marksForCorrectAnswer: 4,
        negativeMark: 1,
        difficulty: '3'
      }
    ]
  }; */
  exam: Exam;

  constructor(private adminService: AdminService, private activatedRoute: ActivatedRoute) {
    this.id = this.activatedRoute.snapshot.params['id'];
    // if (!ObjectID.isValid(this.id)) {
      // do something here, object id invalid
    // }
  }

  ngOnInit() {
    if (!this.isAdminAuthenticated()) {
      return this.submissionError = 1;
    }
    this.subscription = this.adminService.checkExam(this.id).subscribe((response: Response) => {
      this.submissionError = 0;
      this.exam = response.json();
    }, (error: any) => {
      if (error.status === 401) {
        this.submissionError = 1;
        // 401 unauthorised
      } else if (error.status === 400) {
        this.submissionError = 2;
        // 400 invalid exam id
      } else if (error.status === 404) {
        this.submissionError = 3;
        // 404 exam not found
      } else {
        this.submissionError = 4;
        // 500 any internal error
      }
    }, () => {
      this.subscription.unsubscribe();
    });
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

  resetSubmissionError () {
    this.submissionError = -1;
  }

}
