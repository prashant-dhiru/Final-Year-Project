import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormGroup, FormControl, Validators } from '@angular/forms';
import { Response } from '@angular/http';
import { Subscription, Observable } from 'rxjs/Rx';

import { Exam, Question } from '../../Classes';
import { ExamService } from '../exam.service';

@Component({
  selector: 'fyp-exam-attemp',
  templateUrl: './exam-attemp.component.html',
  styleUrls: ['./exam-attemp.component.css']
})
export class ExamAttempComponent implements OnInit {

  examForm: FormGroup;
  timeNow = 0;
  timeNowInMinutes: number;
  lastSprintTime = 0;
  timer: Observable<any> = Observable.timer(0, 990);
  timerSubscription: Subscription;
  subscription: Subscription;
  id: string;
  exam: Exam;
  examTimeLimit: number;
  examLoadSuccess = -1;

  examData = {
    questionAnswers: [],
    totalTimeTaken: this.timeNow,
    exam: ''
  };

  constructor(private examService: ExamService, private activatedRoute: ActivatedRoute, private router: Router) {
    this.id = this.activatedRoute.snapshot.params['id'];
  }

  submitAnswer(questionId: string, questionIndex: number) {

    // if radio button has no value selected
    if (!this.examForm.value.questionAnswers[questionIndex]) {
      return;
    }

    // if answer has already been submitted once
    if (this.examData.questionAnswers.find((element) => element.question === questionId)) {
      return console.error('Answer for this question has already been submitted, not submitting this attemp');
    }

    // creating value to push in final data
    const someval = {
      question: questionId,
      // lapping time here
      timeTaken: (this.timeNow - this.lastSprintTime),
      answerSubmitted: this.examForm.value.questionAnswers[questionIndex]
    };

    // pushing data in final dataset
    this.examData.questionAnswers.push(someval);

    // sprinting value becuase it is needed to spring value on every lap
    // sprinting has to be done after lap
    this.lastSprintTime = this.timeNow;

    // adjusting the frontend
    document.getElementById('btn' + questionId).setAttribute('disabled', 'true');
    document.getElementById('sb' + questionId).setAttribute('class', ' btn btn-large listButton btn-success');

  }

  ngOnInit() {

    // getting exam from backend
    this.subscription = this.examService.getExam(this.id).subscribe((response: Response) => {

      this.exam = response.json();

      // converting time limit from minutes to seconds
      this.examTimeLimit = this.exam.allowedTime * 60;

      // creating the form and adding controls to the form
      this.examForm = new FormGroup({
        'questionAnswers': new FormArray([])
      });
      (<Question[]>this.exam.questions).forEach((question, index) => {
        (<FormArray>this.examForm.controls.questionAnswers).push(new FormControl());
      });

      // setting flag to render the markup
      this.examLoadSuccess = 1;

      // starting the timer to tick
      this.timerSubscription = this.timer.subscribe((value) => {

        // tickering function
        this.timeNow++;

        // converting current time to minutes
        this.timeNowInMinutes = Math.floor(this.timeNow / 60);

        // checking if time limit has exceeded,and if the condition, finishing the exam
        if (this.timeNow >= this.examTimeLimit) {
          this.finishExam();
        }

        // tickering ends here
      });

    }, (error: any) => {
      console.error(error);
      window.alert('Error Occured while fetching exam: ' + error.message);
      setTimeout(() => this.router.navigate(['../']), 1500);
      this.examLoadSuccess = 0;
      // setting flag to mark the fetching failure
    }, () => {
      this.subscription.unsubscribe();
    });
  }

  finishExam () {
    // stopping the timer
    this.timerSubscription.unsubscribe();

    // setting value fo these two data fields in here
    this.examData.totalTimeTaken = this.timeNow;
    this.examData.exam = this.exam._id;

    // sending response data back to server
    this.subscription = this.examService.submitExam(this.id, this.examData).subscribe((response: Response) => {
      // on successfull submission of exam, redirecting to exam quick result
      this.router.navigate(['exam', 'submit', this.id]);
    }, (error: any) => {
      console.error(error);
      if (error.status === 401) {
        // 401 unauthenticated
      } else if (error.status === 501) {
        // 501 error while fetching student detail
      } else if (error.status === 400) {
        // 400 invalid id
      } else {
        // 500 internal server error
      }
    }, () => {
      this.subscription.unsubscribe();
    });
  }

  canDeactivateComponent (): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.timerSubscription.closed) {
      return window.confirm('An Exam is underway, are you sure want to leave?');
    } else {
      return true;
    }
  }

}
