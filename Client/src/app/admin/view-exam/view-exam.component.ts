import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Rx';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { AdminService } from '../admin.service';

@Component({
  selector: 'fyp-view-exam',
  templateUrl: './view-exam.component.html',
  styleUrls: ['./view-exam.component.css']
})
export class ViewExamComponent implements OnInit, OnDestroy {

  id = '0';
  subscription: Subscription;

  exam = {
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
  };
  constructor(private adminService: AdminService, private activatedRoute: ActivatedRoute) {
    this.id = this.activatedRoute.snapshot.params['id'];
    //if (!ObjectID.isValid(this.id)) {
      // do something here, object id invalid
    //}
  }

  ngOnInit() {
    this.subscription = this.adminService.checkExam(this.id).subscribe((response: Response) => {
      console.log(response);
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }


}
